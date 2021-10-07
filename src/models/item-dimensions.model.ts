class ItemDimensions {
  // all dimensions are in m3
  private readonly height: number;
  private readonly width: number;
  private readonly depth: number;

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
