class Item {
  public readonly price: number;
  private readonly description: string;


  public constructor(description: string, price: number) {
    this.description = description;
    this.price = price;
  }
}

export default Item;
