export default class PlaceOrderRequest {

  constructor(readonly cpf: string, readonly orderItems: any[]) {
  }
}
