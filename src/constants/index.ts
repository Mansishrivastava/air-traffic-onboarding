export const APP_NAME = 'Air Traffic Onboarding';

export const ROUTES = {
  HOME: '/',
  WELCOME: '/welcome',
  VERIFY_IDENTITY: '/verify-identity',
  VERIFY_URL: '/verify-url',
  CREATE_ACCOUNT: '/create-account',
  LANDING: '/landing',
} as const;

export const API_ENDPOINTS = {
  VERIFY_IDENTITY: '/api/verify-identity',
  CREATE_ACCOUNT: '/api/create-account',
  VERIFY_URL: '/api/verify-url',
} as const;