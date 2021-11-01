import axios from 'axios';
import HttpStatus from 'http-status-codes';

import constants from './constants';


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

  const output = await axios.post(`${constants.API_URL}/order/`, input);

  expect(output.status).toBe(HttpStatus.CREATED);
  expect(output.data.total).toBe(6090);
  expect(output.data.orderCode).toBeDefined();
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
  try {
    await axios.post(`${constants.API_URL}/order/`, input);
  } catch (err) {
    expect(err).toHaveProperty('response');
    const response = (err as any).response;
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.data).toBe('Item not found');
  }
});
