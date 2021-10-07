import ItemDimensions from './item-dimensions.model';

class Item {
  public readonly price: number;
  public readonly description: string;
  public readonly dimensions: ItemDimensions;
  public readonly weight: number;


  public constructor(description: string, price: number, dimensions: ItemDimensions, weight: number) {
    this.description = description;
    this.price = price;
    this.dimensions = dimensions;
    this.weight = weight;
  }

  public getDensity(): number {
    return Math.trunc(this.weight / this.dimensions.getVolume());
  }

}

export default Item;
