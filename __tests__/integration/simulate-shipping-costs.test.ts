import axios from 'axios';
import HttpStatus from 'http-status-codes';

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
  const output = await axios.get(`${constants.API_URL}/shipping/simulate`, { data: input });

  expect(output.status).toBe(HttpStatus.OK);
  expect(output.data.shippingCost).toBe(499.98);
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
  try {
    await axios.get(`${constants.API_URL}/shipping/simulate`, { data: input });
  } catch (err) {
    expect(err).toHaveProperty('response');
    const response = (err as any).response;
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.data).toBe('Item not found');
  }
});

