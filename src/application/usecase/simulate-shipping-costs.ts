import { Order } from '../../domain/entity/order';
import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory';
import ItemRepository from '../../domain/repository/item-repository';
import SimulateShippingCostsInput from '../dto/input/simulate-shipping-costs-input';
import SimulateShippingCostsOutput from '../dto/output/simulate-shipping-costs-output';

export default class SimulateShippingCosts {
  readonly itemRepository: ItemRepository;

  constructor(abstractRepositoryFactory: AbstractRepositoryFactory) {
    this.itemRepository = abstractRepositoryFactory.createItemRepository();
  }

  async execute(input: SimulateShippingCostsInput): Promise<SimulateShippingCostsOutput> {
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
