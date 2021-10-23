import { Order } from '../../../domain/entity/order';
import OrderItem from '../../../domain/entity/order-item';
import OrderRepository from '../../../domain/repository/order-repository';
import DatabaseConnection from '../../database/database-connection';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async save(order: Order): Promise<void> {
    await this.databaseConnection.query(`INSERT INTO "order" (code, client_cpf, total, created_at) VALUES ($1, $2, $3, $4)`,
      [order.getCode(), order.getClientCpf(), order.getTotal(), order.issueDate]);

    const [{ id }] = await this.databaseConnection.query('select id from "order" where code = $1', [order.getCode()]);

    for (const orderItem of order.getOrderItems()) {
      await this.databaseConnection.query(`INSERT INTO order_item (order_id, quantity, final_price, item_id) VALUES ($1, $2, $3, $4)`,
        [id, orderItem.quantity, orderItem.getFinalPrice(), orderItem.item.id]);
    }
  }

  async getNextUniqueSequentialId(): Promise<number> {
    const [{ count }] = await this.databaseConnection.query('select count(*) from "order"', []);
    return parseInt(count, 10) + 1;
  }
}
