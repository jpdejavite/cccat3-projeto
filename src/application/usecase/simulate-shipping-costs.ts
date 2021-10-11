import { Order } from '../../domain/entity/order';
import ItemRepository from '../../domain/repository/item-repository';
import OrderRepository from '../../domain/repository/order-repository';
import PlaceOrderInput from '../dto/input/place-order-input';
import SimulateShippingCostsOutput from '../dto/output/simulate-shipping-costs-output';

export default class SimulateShippingCosts {

  constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {
  }

  async execute(input: PlaceOrderInput): Promise<SimulateShippingCostsOutput> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    return new SimulateShippingCostsOutput(
      order.getShippingCost(),
    );
  }
}
