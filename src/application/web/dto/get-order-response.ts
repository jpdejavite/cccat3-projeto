export default class GetOrderResponse {

  constructor(readonly code: string, readonly cpf: string, readonly items: { description: string; quantity: number; price: number; }[], readonly shippingCost: number, readonly total: number) {
  }
}
