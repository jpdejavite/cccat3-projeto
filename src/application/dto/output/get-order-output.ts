export default class GetOrderOutput {

  constructor(readonly code: string, readonly cpf: string, readonly items: { description: string; quantity: number; price: number; }[], readonly shippingCost: number, readonly total: number) {
  }
}
