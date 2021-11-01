import axios from 'axios';
import HttpStatus from 'http-status-codes';

import constants from './constants';


test('Must get an order', async () => {
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

  const outputGet = await axios.get(`${constants.API_URL}/order/${output.data.orderCode}`);

  expect(outputGet.status).toBe(HttpStatus.OK);
  expect(outputGet.data.total).toBe(6090);
  expect(outputGet.data.code).toBe(output.data.orderCode);
});


test('Must get an null order', async () => {

  const outputGet = await axios.get(`${constants.API_URL}/order/123`);

  expect(outputGet.status).toBe(HttpStatus.OK);
  expect(outputGet.data).toBeNull();
});
