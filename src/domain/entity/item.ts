import ItemDimensions from './item-dimensions';

class Item {
  public constructor(readonly id: string, readonly description: string, readonly price: number, readonly dimensions: ItemDimensions, readonly weight: number) {
  }

  public getDensity(): number {
    return Math.trunc(this.weight / this.dimensions.getVolume());
  }

}

export default Item;
