import axios from 'axios';
import HttpStatus from 'http-status-codes';

import constants from './constants';


test('Must get all orders', async () => {
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

  const outputGet = await axios.get(`${constants.API_URL}/order/all`);

  expect(outputGet.status).toBe(HttpStatus.OK);
  expect(outputGet.data.length).toBeGreaterThanOrEqual(1);
});

