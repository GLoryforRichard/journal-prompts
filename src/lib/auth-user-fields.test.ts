import { parseUserInput } from 'better-auth/db';
import { describe, expect, it } from 'vitest';
import { authUserFields } from './auth-user-fields';

describe('Stripe customer identity in Better Auth', () => {
  const options = { user: { additionalFields: authUserFields } };

  it.each([
    'create',
    'update',
  ] as const)('rejects customerId supplied through %s input', (action) => {
    expect(() =>
      parseUserInput(options, { customerId: 'cus_other_user' }, action)
    ).toThrow('customerId is not allowed to be set');
  });

  it('still permits an ordinary profile update', () => {
    expect(() =>
      parseUserInput(options, { name: 'Updated name' }, 'update')
    ).not.toThrow();
  });
});
