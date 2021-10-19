class ItemDimensions {
  // all dimensions are in m3
  public readonly height: number;
  public readonly width: number;
  public readonly depth: number;

  public constructor(height: number, width: number, depth: number) {
    this.height = height;
    this.width = width;
    this.depth = depth;
  }

  public getVolume(): number {
    return this.width * this.height * this.depth;
  }
}

export default ItemDimensions;
