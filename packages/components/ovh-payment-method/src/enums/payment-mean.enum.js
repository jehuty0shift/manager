export const PAYMENT_MEAN_STATUS_ENUM = {
  BLOCKED_FOR_INCIDENTS: 'BLOCKED_FOR_INCIDENTS',
  PENDING_VALIDATION: 'PENDING_VALIDATION',
  VALID: 'VALID',
  EXPIRED: 'EXPIRED',
  TOO_MANY_FAILURES: 'TOO_MANY_FAILURES',
};

export const PAYMENT_MEAN_TYPE_ENUM = {
  BANK_ACCOUNT: 'bankAccount',
  CREDIT_CARD: 'creditCard',
  DEFERRED_PAYMENT_ACCOUNT: 'deferredPaymentAccount',
  PAYPAL: 'paypal',
  RUPAY: 'rupay',
};

export default {
  PAYMENT_MEAN_STATUS_ENUM,
  PAYMENT_MEAN_TYPE_ENUM,
};
