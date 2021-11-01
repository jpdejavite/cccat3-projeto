import OrderDAO from '../dao/order.dao';
import GetOrderOutput from '../dto/output/get-order-output';

export default class GetOrders {

  constructor(readonly orderDAO: OrderDAO) {
  }

  async execute(): Promise<GetOrderOutput[]> {
    const ordersData = await this.orderDAO.getOrders();
    const getOrdersOutput: GetOrderOutput[] = [];
    for (const orderData of ordersData) {
      const orderItemsData = await this.orderDAO.getOrderItems(orderData.id);
      const getOrderOutput = new GetOrderOutput(orderData.code, orderData.cpf, orderItemsData, orderData.shippingCost, orderData.total);
      getOrdersOutput.push(getOrderOutput);
    }
    return getOrdersOutput;
  }
}
