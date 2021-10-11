import PlaceOrder from '../../src/application/usecase/place-order';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';

test('Must place an order', async () => {
  const input = {
    cpf: '847.903.332-05',
    orderItems: [
      {
        idItem: '1',
        quantity: 1,
      },
      {
        idItem: '2',
        quantity: 1,
      },
      {
        idItem: '3',
        quantity: 3,
      },
    ],
  };
  const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6090);
});


test('Must throw error when item is not foundplace an order', async () => {
  const input = {
    cpf: '847.903.332-05',
    orderItems: [
      {
        idItem: '1',
        quantity: 1,
      },
      {
        idItem: 'not-found',
        quantity: 1,
      },
      {
        idItem: '3',
        quantity: 3,
      },
    ],
  };
  const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());

  expect(placeOrder.execute(input)).rejects.toThrow(new Error('Item not found'));
});
