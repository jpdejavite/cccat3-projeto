import Item from './item';

const DEFAULT_DISTANCE = 1000;

class OrderItem {
  public readonly item: Item;
  public readonly quantity: number;
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


  public getShippingCost(): number {
    return this.quantity * DEFAULT_DISTANCE * this.item.dimensions.getVolume() * this.item.getDensity() / 100;
  }
}

export default OrderItem;
