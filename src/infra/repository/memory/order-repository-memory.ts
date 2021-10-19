import { Order } from '../../../domain/entity/order';
import OrderRepository from '../../../domain/repository/order-repository';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }

  getNextUniqueSequentialId(): Promise<number> {
    return Promise.resolve(this.orders.length + 1);
  }
}
