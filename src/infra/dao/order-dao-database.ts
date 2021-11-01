import OrderDAO from '../../application/dao/order.dao';
import OrderItemDTO from '../../application/dto/order-item.dto';
import OrderDTO from '../../application/dto/order.dto';
import DatabaseConnection from '../database/database-connection';

export default class OrderDAODatabase implements OrderDAO {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async getOrders(): Promise<OrderDTO[]> {
    const orders: OrderDTO[] = [];
    const ordersData = await this.databaseConnection.query('select id, code, client_cpf, shipping_cost::float, total::float from "order"', []);
    ordersData.forEach((orderData: any) => {
      orders.push(new OrderDTO(orderData.id, orderData.code, orderData.client_cpf, orderData.shipping_cost, orderData.total));
    });
    return orders;
  }


  async getOrder(code: string): Promise<OrderDTO | null> {
    const [orderData] = await this.databaseConnection.query('select id, code, client_cpf, shipping_cost::float, total::float from "order" where code = $1', [code]);
    if (orderData) {
      return new OrderDTO(orderData.id, orderData.code, orderData.client_cpf, orderData.shipping_cost, orderData.total);
    }
    return null;
  }

  async getOrderItems(idOrder: number): Promise<OrderItemDTO[]> {
    const orderItems: OrderItemDTO[] = [];
    const orderItemsData = await this.databaseConnection.query('select i.description, oi.quantity, oi.final_price::float from "order_item" oi join "item" i on (oi.item_id::integer = i.id) where order_id = $1', [idOrder]);
    orderItemsData.forEach((orderItemData: any) => {
      orderItems.push(new OrderItemDTO(orderItemData.description, orderItemData.quantity, orderItemData.final_price));
    });
    return orderItems;
  }

}
