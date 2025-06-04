import { Router, Request, Response } from 'express';
import {
  Horizon,
  Keypair,
  TransactionBuilder,
  Operation,
  Asset,
  Memo,
} from '@stellar/stellar-sdk';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

const HORIZON_SERVER = process.env.HORIZON_SERVER || "https://api.mainnet.minepi.com";
const NETWORK_PASSPHRASE = 'Pi Network';
const BASE_FEE = 1000000;

router.post('/create', async (req: Request, res: Response) => {
  try {
    const { secretKey, destinationAddress, amount, memo } = req.body;

    if (!secretKey || !destinationAddress || !amount || !memo) {
      return res.status(400).json({
        error: 'Secret key, destination address, amount, and memo are required',
      });
    }

    // Create server instance with Horizon.Server
    const server = new Horizon.Server(HORIZON_SERVER);

    // Validate destination public key format
    try {
      Keypair.fromPublicKey(destinationAddress);
    } catch {
      return res
        .status(400)
        .json({ error: 'Invalid destination public key format' });
    }

    // Check if destination account exists
    try {
      await server.loadAccount(destinationAddress);
    } catch {
      return res
        .status(400)
        .json({ error: 'Destination account not found on the network' });
    }

    // Load source account
    const sourceKeypair = Keypair.fromSecret(secretKey);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    // Build transaction
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE.toString(),
      networkPassphrase: NETWORK_PASSPHRASE,
      memo: Memo.text(memo),
    })
      .addOperation(
        Operation.payment({
          destination: destinationAddress,
          asset: Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build();

    // Sign and submit transaction
    transaction.sign(sourceKeypair);
    const response = await server.submitTransaction(transaction);

    res.json({
      success: response.successful,
      transactionHash: response.hash,
      ledger: response.ledger,
      response: response,
    });
  } catch (error) {
    console.error('Error in payment creation:', error);
    res.status(500).json({
      error: 'Failed to create payment',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.get('/:paymentId', async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const server = new Horizon.Server(HORIZON_SERVER);

    const transaction = await server
      .transactions()
      .transaction(paymentId)
      .call();

    res.json({
      paymentId,
      status: transaction.successful ? 'completed' : 'failed',
      completedAt: transaction.created_at,
      details: transaction,
    });
  } catch (error) {
    console.error('Error in payment status check:', error);

    if (error instanceof Error && error.message.includes('404')) {
      return res.status(404).json({
        error: 'Payment not found',
        paymentId: req.params.paymentId,
      });
    }

    res.status(500).json({
      error: 'Failed to get payment status',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Additional route to check account balance
router.get('/account/:publicKey', async (req: Request, res: Response) => {
  try {
    const { publicKey } = req.params;
    const server = new Horizon.Server(HORIZON_SERVER);

    // Validate public key format
    try {
      Keypair.fromPublicKey(publicKey);
    } catch {
      return res.status(400).json({ error: 'Invalid public key format' });
    }

    const account = await server.loadAccount(publicKey);

    res.json({
      publicKey,
      balances: account.balances,
      sequence: account.sequence,
      accountId: account.account_id,
    });
  } catch (error) {
    console.error('Error checking account:', error);

    if (error instanceof Error && error.message.includes('404')) {
      return res.status(404).json({
        error: 'Account not found',
        publicKey: req.params.publicKey,
      });
    }

    res.status(500).json({
      error: 'Failed to check account',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
