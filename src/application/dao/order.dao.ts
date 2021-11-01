import OrderItemDTO from '../dto/order-item.dto';
import OrderDTO from '../dto/order.dto';

export default interface OrderDAO {
  getOrders(): Promise<OrderDTO[]>;
  getOrder(code: string): Promise<OrderDTO | null>;
  getOrderItems(idOrder: number): Promise<OrderItemDTO[]>;
}
