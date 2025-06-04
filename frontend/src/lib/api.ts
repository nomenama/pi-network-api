import { PassphraseResponse, PaymentRequest, PaymentResponse, ApiError } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function convertPassphraseToKeys(passphrase: string): Promise<PassphraseResponse> {
  const response = await fetch(`${API_BASE_URL}/passphrase/to-keys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passphrase }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function createPayment(payment: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch(`${API_BASE_URL}/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export async function getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
  const response = await fetch(`${API_BASE_URL}/payment/${paymentId}`);

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error);
  }

  return response.json();
} 