import Item from './item.model';

class OrderItem {
  private readonly quantity: number;
  private readonly item: Item;
  private finalPrice: number;


  public constructor(item: Item, quantity: number) {
    this.quantity = quantity;
    this.item = item;
    this.finalPrice = this.item.price * this.quantity;
  }

  public applyDiscount(discount: number): void {
    this.finalPrice = this.item.price * this.quantity * discount;
  }

  public getFinalPrice(): number {
    return this.finalPrice;
  }
}

export default OrderItem;
