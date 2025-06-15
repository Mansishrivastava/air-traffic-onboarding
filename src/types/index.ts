export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
}

export interface VerificationStatus {
  isVerified: boolean;
  verificationDate?: Date;
  verificationMethod?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
} 