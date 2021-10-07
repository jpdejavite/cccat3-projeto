import Item from '../../src/models/item.model';
import InvalidCpf from '../../src/errors/invalid-cpf.error';
import EmptyItems from '../../src/errors/empty-items.error';
import InvalidCoupon from '../../src/errors/invalid-coupon.error';
import OrderItem from '../../src/models/order-item.model';
import ExpiredCoupon from '../../src/errors/expired-coupon.error';
import ItemDimensions from '../../src/models/item-dimensions.model';
import { Order, MINIMUM_SHIPPING_COST } from '../../src/models/order.model';

const faketemDimension = new ItemDimensions(0.20, 0.15, 0.10);
const fakeWeight = 1;


test('Should not make order with invalid CPF', () => {
  const cpf = '111.111.111-11';
  const items: OrderItem[] = [];
  const couponId = 'coupon-id';
  expect(() => {
    Order.makeOrder(cpf, items, couponId);
  }).toThrow(new InvalidCpf());
});

test('Should not make order with empty item', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [];
  const couponId = 'coupon-id';
  expect(() => {
    Order.makeOrder(cpf, items, couponId);
  }).toThrow(new EmptyItems());
});

test('Should not make order with invalid coupon', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [
    new OrderItem(new Item('item 1', 10, faketemDimension, fakeWeight), 10),
    new OrderItem(new Item('item 2', 5, faketemDimension, fakeWeight), 10),
  ];
  const couponId = 'coupon-id';
  expect(() => {
    Order.makeOrder(cpf, items, couponId);
  }).toThrow(new InvalidCoupon());
});

test('Should not make order with expired coupon', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [
    new OrderItem(new Item('item 1', 10, faketemDimension, fakeWeight), 10),
    new OrderItem(new Item('item 2', 5, faketemDimension, fakeWeight), 10),
  ];
  const couponId = '50-expired-discount-coupon-id';
  expect(() => {
    Order.makeOrder(cpf, items, couponId);
  }).toThrow(new ExpiredCoupon());
});

test('Should make order with final price', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [
    new OrderItem(new Item('item 1', 10, faketemDimension, fakeWeight), 10),
    new OrderItem(new Item('item 2', 5, faketemDimension, fakeWeight), 10),
  ];

  const order = Order.makeOrder(cpf, items);
  expect(order.getFinalPrice()).toBe(150);
});

test('Should make order applying discount in final price', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [
    new OrderItem(new Item('item 1', 10, faketemDimension, fakeWeight), 10),
    new OrderItem(new Item('item 2', 5, faketemDimension, fakeWeight), 10),
  ];
  const couponId = '50-discount-coupon-id';

  const order = Order.makeOrder(cpf, items, couponId);
  expect(order.getFinalPrice()).toBe(75);
});


test('Should calulate order shipping cost', () => {
  const cpf = '93541134780';
  const item1Dimension = new ItemDimensions(0.20, 0.15, 0.10);
  const item2Dimension = new ItemDimensions(1, 0.3, 0.10);
  const items: OrderItem[] = [
    new OrderItem(new Item('item 1', 10, item1Dimension, 1), 1),
    new OrderItem(new Item('item 2', 5, item2Dimension, 3), 1),
  ];

  const order = Order.makeOrder(cpf, items);
  expect(order.getShippingCost()).toBe(39.99);
});

test('Should calulate order minimum shipping cost', () => {
  const cpf = '93541134780';
  const item1Dimension = new ItemDimensions(0.20, 0.15, 0.10);
  const item2Dimension = new ItemDimensions(1, 0.3, 0.10);
  const items: OrderItem[] = [
    new OrderItem(new Item('item 1', 10, item1Dimension, 1), 1),
  ];

  const order = Order.makeOrder(cpf, items);
  expect(order.getShippingCost()).toBe(MINIMUM_SHIPPING_COST);
});

