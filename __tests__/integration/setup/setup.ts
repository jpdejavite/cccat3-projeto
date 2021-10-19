import pgp from 'pg-promise';

import constants from '../constants';

import setupCouponData from './setup-coupon';
import setupItemData from './setup-item';

const setup = async (): Promise<void> => {
  const pg = pgp()(constants.POSTGRES_URL);

  // CREATE DATABASE
  await pg.query('DROP DATABASE IF EXISTS "cccate-it"');
  await pg.query('CREATE DATABASE "cccate-it"');

  await setupCouponData(pg);

  await setupItemData(pg);

  // END CONNECTION
  await pg.$pool.end();
};

export default setup;
