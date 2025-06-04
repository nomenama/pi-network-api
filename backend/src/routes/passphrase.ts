//@ts-ignore
import { derivePath } from '@hawkingnetwork/ed25519-hd-key-rn';
import { Router, Request, Response } from 'express';
import { Keypair } from '@stellar/stellar-sdk';
import * as bip39 from 'bip39';

const router = Router();

router.post('/to-keys', async (req: Request, res: Response) => {
  try {
    const { passphrase } = req.body;

    if (!passphrase) {
      return res.status(400).json({ error: 'Passphrase is required' });
    }

    if (!bip39.validateMnemonic(passphrase)) {
      return res.status(400).json({ error: 'Invalid mnemonic passphrase' });
    }

    const seed = await bip39.mnemonicToSeed(passphrase);
    const derivedSeed = derivePath("m/44'/314159'/0'", seed);
    const keypair = Keypair.fromRawEd25519Seed(derivedSeed.key.slice(0, 32));

    res.json({
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret(),
    });
  } catch (error) {
    console.error('Error in passphrase to keys conversion:', error);
    res.status(500).json({ error: 'Failed to convert passphrase to keys' });
  }
});

export default router;
