import { Order } from '../../domain/entity/order';
import AbstractRepositoryFactory from '../../domain/factory/abstract-repository-factory';
import ItemRepository from '../../domain/repository/item-repository';
import OrderRepository from '../../domain/repository/order-repository';
import PlaceOrderInput from '../dto/input/place-order-input';
import PlaceOrderOutput from '../dto/output/place-order-output';

export default class PlaceOrder {

  readonly itemRepository: ItemRepository;
  readonly orderRepository: OrderRepository;

  constructor(abstractRepositoryFactory: AbstractRepositoryFactory) {
    this.itemRepository = abstractRepositoryFactory.createItemRepository();
    this.orderRepository = abstractRepositoryFactory.createOrderRepository();
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order(input.cpf);
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }
    const nextUniqueSequentialId = await this.orderRepository.getNextUniqueSequentialId();
    order.generateCode(nextUniqueSequentialId);
    await this.orderRepository.save(order);
    return new PlaceOrderOutput(
      order.getTotal(),
      order.getCode(),
    );
  }
}
