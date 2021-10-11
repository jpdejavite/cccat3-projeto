import Item from '../../../../src/domain/entity/item';
import InvalidCpf from '../../../../src/domain/errors/invalid-cpf.error';
import ExpiredCoupon from '../../../../src/domain/errors/expired-coupon.error';
import ItemDimensions from '../../../../src/domain/entity/item-dimensions';
import { Order, MINIMUM_SHIPPING_COST } from '../../../../src/domain/entity/order';
import Coupon from '../../../../src/domain/entity/coupon';

const faketemDimension = new ItemDimensions(0.20, 0.15, 0.10);
const fakeWeight = 1;


test('Should not create order with invalid CPF', () => {
  const cpf = '111.111.111-11';
  expect(() => {
    const order = new Order(cpf);
  }).toThrow(new InvalidCpf());
});

test('Should not add coupon to order with expired coupon', () => {
  const cpf = '93541134780';
  const couponId = '50-expired-discount-coupon-id';
  expect(() => {
    const order = new Order(cpf);
    order.addCoupon(new Coupon(couponId));
  }).toThrow(new ExpiredCoupon());
});

test('Should create order with final price', () => {
  const cpf = '93541134780';
  const order = new Order(cpf);
  order.addItem(new Item('1', 'item 1', 10, faketemDimension, fakeWeight), 10);
  order.addItem(new Item('1', 'item 2', 5, faketemDimension, fakeWeight), 10);
  expect(order.getTotal()).toBe(150);
});

test('Should create order applying discount in final price', () => {
  const cpf = '93541134780';
  const couponId = '50-discount-coupon-id';

  const order = new Order(cpf);
  order.addItem(new Item('1', 'item 1', 10, faketemDimension, fakeWeight), 10);
  order.addItem(new Item('1', 'item 2', 5, faketemDimension, fakeWeight), 10);
  order.addCoupon(new Coupon(couponId));
  expect(order.getTotal()).toBe(75);
});


test('Should calulate order shipping cost', () => {
  const cpf = '93541134780';
  const item1Dimension = new ItemDimensions(0.20, 0.15, 0.10);
  const item2Dimension = new ItemDimensions(1, 0.3, 0.10);

  const order = new Order(cpf);
  order.addItem(new Item('1', 'item 1', 10, item1Dimension, 1), 1);
  order.addItem(new Item('1', 'item 2', 5, item2Dimension, 3), 1);
  expect(order.getShippingCost()).toBe(39.99);
});

test('Should calulate order minimum shipping cost', () => {
  const cpf = '93541134780';
  const item1Dimension = new ItemDimensions(0.20, 0.15, 0.10);

  const order = new Order(cpf);
  order.addItem(new Item('1', 'item 1', 10, item1Dimension, 1), 1);
  expect(order.getShippingCost()).toBe(MINIMUM_SHIPPING_COST);
});

test('Should calulate order minimum shipping cost', () => {
  const cpf = '93541134780';
  const order = new Order(cpf, new Date('2021-10-11T01:46:18.592Z'));
  order.generateOrderCode(1);
  expect(order.getOrderCode()).toBe('202100000001');
});

