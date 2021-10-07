import Order from '../../src/models/order.model';
import Item from '../../src/models/item.model';
import InvalidCpf from '../../src/errors/invalid-cpf.error';
import EmptyItems from '../../src/errors/empty-items.error';
import InvalidCoupon from '../../src/errors/invalid-coupon.error';
import OrderItem from '../../src/models/order-item.model';

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
  const items: OrderItem[] = [new OrderItem(new Item('item 1', 10), 10), new OrderItem(new Item('item 2', 5), 10)];
  const couponId = 'coupon-id';
  expect(() => {
    Order.makeOrder(cpf, items, couponId);
  }).toThrow(new InvalidCoupon());
});

test('Should make order with final price', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [new OrderItem(new Item('item 1', 10), 10), new OrderItem(new Item('item 2', 5), 10)];

  const order = Order.makeOrder(cpf, items);
  expect(order.getFinalPrice()).toBe(150);
});

test('Should make order applying discount in final price', () => {
  const cpf = '93541134780';
  const items: OrderItem[] = [new OrderItem(new Item('item 1', 10), 10), new OrderItem(new Item('item 2', 5), 10)];
  const couponId = '50-discount-coupon-id';

  const order = Order.makeOrder(cpf, items, couponId);
  expect(order.getFinalPrice()).toBe(75);
});
