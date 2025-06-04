export interface PassphraseResponse {
  publicKey: string;
  secretKey: string;
}

export interface PaymentRequest {
  secretKey: string;
  destinationAddress: string;
  amount: string;
  memo: string;
}

export interface PaymentResponse {
  paymentId: string;
  status: 'completed' | 'failed';
  completedAt: string;
  details: any;
}

export interface ApiError {
  error: string;
  details?: any;
} 