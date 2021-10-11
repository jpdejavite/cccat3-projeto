import { NumberLiteralType } from 'typescript';

import { Order } from '../entity/order';

export default interface OrderRepository {
  save(order: Order): void;
  getNextUniqueSequentialId(): number;
}
