import SimulateShippingCostsOutput from '../../src/application/dto/output/simulate-shipping-costs-output';
import PlaceOrder from '../../src/application/usecase/place-order';
import SimulateShippingCosts from '../../src/application/usecase/simulate-shipping-costs';
import ItemRepositoryMemory from '../../src/infra/repository/memory/item-repository-memory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/order-repository-memory';

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
  const simulateShippingCosts = new SimulateShippingCosts(new ItemRepositoryMemory(), new OrderRepositoryMemory());
  const output = await simulateShippingCosts.execute(input);
  expect(output.shippingCost).toBe(499.98);
});

