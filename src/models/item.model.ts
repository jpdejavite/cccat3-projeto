class Item {
  private readonly description: string;
  private readonly price: number;
  private readonly quantity: number;
  private readonly basePrice: number;
  private finalPrice: number;


  public constructor(description: string, price: number, quantity: number) {
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.basePrice = this.price * this.quantity;
    this.finalPrice = this.basePrice;
  }

  public applyDiscount(discount: number): void {
    this.finalPrice = this.basePrice * discount;
  }

  public getFinalPrice(): number {
    return this.finalPrice;
  }
}

export default Item;
