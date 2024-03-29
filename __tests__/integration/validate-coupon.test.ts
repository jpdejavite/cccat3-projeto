import axios from 'axios';
import HttpStatus from 'http-status-codes';

import ExpiredCoupon from '../../src/domain/errors/expired-coupon.error';
import InvalidCoupon from '../../src/domain/errors/invalid-coupon.error';

import constants from './constants';


test('Must validate a valid coupon', async () => {
  const input = {
    couponId: '50-discount-coupon-id',
  };
  const output = await axios.get(`${constants.API_URL}/coupon/validate`, { data: input });

  expect(output.status).toBe(HttpStatus.OK);
  expect(output.data.id).toBe('50-discount-coupon-id');
  expect(output.data.expirationDate).toBeDefined();
  expect(output.data.discountPercentage).toBe(0.5);
});


test('Must throw error when coupon is not found', async () => {
  const input = {
    couponId: 'not-found-coupon-id',
  };

  try {
    await axios.get(`${constants.API_URL}/coupon/validate`, { data: input });
  } catch (err) {
    expect(err).toHaveProperty('response');
    const response = (err as any).response;
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.data).toBe(new InvalidCoupon().message);
  }
});

test('Must throw error when copoun is expired', async () => {
  const input = {
    couponId: '50-expired-discount-coupon-id',
  };

  try {
    await axios.get(`${constants.API_URL}/coupon/validate`, { data: input });
  } catch (err) {
    expect(err).toHaveProperty('response');
    const response = (err as any).response;
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.data).toBe(new ExpiredCoupon().message);
  }
});
