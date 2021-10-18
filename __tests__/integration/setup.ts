import pgp from 'pg-promise';

import Coupon from '../../src/domain/entity/coupon';

import constants from './constants';

const addCoupon = async (pg: any, coupon: Coupon): Promise<void> => {
  await pg.query(`INSERT INTO coupon (code, expiration_date, discount_percentage) VALUES ($1, $2, $3)`, [coupon.id, coupon.expirationDate, coupon.discountPercentage]);
};

const setupCouponData = async (pg: any): Promise<void> => {
  // COUPON TABLE
  await pg.query('DROP TABLE  IF EXISTS coupon');
  await pg.query('CREATE TABLE coupon (code TEXT PRIMARY KEY, expiration_date timestamp DEFAULT current_timestamp, discount_percentage NUMERIC(10,2))');

  // COUPON DATA
  await addCoupon(pg, new Coupon('50-discount-coupon-id', new Date(Date.now() + 1000000), 0.5));
  await addCoupon(pg, new Coupon('50-expired-discount-coupon-id', new Date(Date.now() - 1000000), 0.5));
};

const setup = async (): Promise<void> => {
  const pg = pgp()(constants.POSTGRES_URL);
  // CREATE DATABASE
  await pg.query('DROP DATABASE IF EXISTS "cccate-it"');
  await pg.query('CREATE DATABASE "cccate-it"');

  await setupCouponData(pg);

  // END CONNECTION
  await pg.$pool.end();
};

export default setup;
