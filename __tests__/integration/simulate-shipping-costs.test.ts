import SimulateShippingCosts from '../../src/application/usecase/simulate-shipping-costs';
import ItemRepository from '../../src/domain/repository/item-repository';
import DatabaseConnection from '../../src/infra/database/database-connection';
import DatabaseConnectionAdapter from '../../src/infra/database/database-connection-adapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/item-repository-database';

import constants from './constants';

let itemRepository: ItemRepository;
let databaseConnection: DatabaseConnection;

beforeAll(() => {
  databaseConnection = new DatabaseConnectionAdapter(constants.POSTGRES_URL);
  itemRepository = new ItemRepositoryDatabase(databaseConnection);
});

afterAll(async () => {
  await databaseConnection.close();
});

test('Must simulate a shipping cost', async () => {
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
  const simulateShippingCosts = new SimulateShippingCosts(itemRepository);
  const output = await simulateShippingCosts.execute(input);
  expect(output.shippingCost).toBe(499.98);
});


test('Must throw error when a shipping cost is calulated with a non existing item', async () => {
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
  const simulateShippingCosts = new SimulateShippingCosts(itemRepository);
  await expect(simulateShippingCosts.execute(input)).rejects.toThrow(new Error('Item not found'));
});

