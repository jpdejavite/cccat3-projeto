import PlaceOrder from '../../src/application/usecase/place-order';
import ItemRepository from '../../src/domain/repository/item-repository';
import OrderRepository from '../../src/domain/repository/order-repository';
import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/database-connection-adapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/item-repository-database';
import OrderRepositoryDatabase from '../../src/infra/repository/database/order-repository-database';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';

import constants from './constants';


let itemRepository: ItemRepository;
let databaseConnection: DatabaseConnection;
let orderRepository: OrderRepository;

beforeAll(() => {
  databaseConnection = new DatabaseConnectionAdapter(constants.POSTGRES_URL);
  itemRepository = new ItemRepositoryDatabase(databaseConnection);
  orderRepository = new OrderRepositoryDatabase(databaseConnection);
});

afterAll(async () => {
  await databaseConnection.close();
});

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
  const placeOrder = new PlaceOrder(itemRepository, orderRepository);
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6090);
  expect(output.orderCode).toBeDefined();
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
        idItem: '40',
        quantity: 1,
      },
      {
        idItem: '3',
        quantity: 3,
      },
    ],
  };
  const placeOrder = new PlaceOrder(itemRepository, orderRepository);

  await expect(placeOrder.execute(input)).rejects.toThrow(new Error('Item not found'));
});
