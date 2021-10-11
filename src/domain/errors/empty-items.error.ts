class EmptyItems extends Error {
  constructor() {
    super();
    this.message = 'Empty Item';
  }
}

export default EmptyItems;
