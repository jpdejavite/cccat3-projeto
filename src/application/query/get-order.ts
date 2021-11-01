import OrderDAO from '../dao/order.dao';
import GetOrderOutput from '../dto/output/get-order-output';

export default class GetOrder {

  constructor(readonly orderDAO: OrderDAO) {
  }

  async execute(code: string): Promise<GetOrderOutput | null> {
    const orderData = await this.orderDAO.getOrder(code);
    if (orderData) {
      const orderItemsData = await this.orderDAO.getOrderItems(orderData.id);
      const getOrderOutput = new GetOrderOutput(orderData.code, orderData.cpf, orderItemsData, orderData.shippingCost, orderData.total);
      return getOrderOutput;
    }

    return null;
  }
}
