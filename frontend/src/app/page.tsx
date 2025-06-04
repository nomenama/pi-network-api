'use client';

import {FormEvent, useState} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { convertPassphraseToKeys, createPayment } from '@/lib/api';
import { Eye, EyeOff, Loader2 } from 'lucide-react';



export default function Home() {
  const [passphrase, setPassphrase] = useState('');
  const [keys, setKeys] = useState<{ publicKey: string; secretKey: string } | null>(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    secretKey: '',
    destinationAddress: '',
    amount: '',
    memo: '',
  });

  const handlePassphraseSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await convertPassphraseToKeys(passphrase);
      setKeys(result);
      toast.success('Passphrase converted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to convert passphrase');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingPayment(true);
    try {
      const result = await createPayment(paymentDetails);
      toast.success('Payment created successfully');
      console.log('Payment result:', result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create payment');
    } finally {
      setIsCreatingPayment(false);
    }
  };

  return (
      <main className="container mx-auto p-4 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Pi Network Tools</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Convert Passphrase</CardTitle>
              <CardDescription>Convert your Pi Network passphrase to public and private keys</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePassphraseSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passphrase">Passphrase</Label>
                  <Input
                      id="passphrase"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder="Enter your passphrase"
                      required
                  />
                </div>
                <Button type="submit" className="w-full">Convert</Button>
              </form>

              {keys && (
                  <div className="mt-4 space-y-2">
                    <div>
                      <Label>Public Key</Label>
                      <Input value={keys.publicKey} readOnly />
                    </div>
                    <div className="relative">
                      <Label>Secret Key</Label>
                      <div className="relative">
                        <Input
                            value={keys.secretKey}
                            readOnly
                            type={showSecretKey ? "text" : "password"}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowSecretKey(!showSecretKey)}
                        >
                          {showSecretKey ? (
                              <EyeOff className="h-4 w-4" />
                          ) : (
                              <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Payment</CardTitle>
              <CardDescription>Create a new Pi Network payment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="secretKey">Secret Key</Label>
                  <Input
                      id="secretKey"
                      value={paymentDetails.secretKey}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, secretKey: e.target.value }))}
                      placeholder="Enter your secret key"
                      required
                      type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationAddress">Destination Address</Label>
                  <Input
                      id="destinationAddress"
                      value={paymentDetails.destinationAddress}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, destinationAddress: e.target.value }))}
                      placeholder="Enter destination address"
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                      id="amount"
                      value={paymentDetails.amount}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Enter amount"
                      required
                      type="number"
                      step="0.000001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memo">Memo</Label>
                  <Input
                      id="memo"
                      value={paymentDetails.memo}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, memo: e.target.value }))}
                      placeholder="Enter memo"
                      required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isCreatingPayment}>
                  {isCreatingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Payment...
                      </>
                  ) : (
                      'Create Payment'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
  );
}
