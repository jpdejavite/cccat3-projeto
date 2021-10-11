import Item from '../../../domain/entity/item';
import ItemDimensions from '../../../domain/entity/item-dimensions';
import EmptyItems from '../../../domain/errors/empty-items.error';
import ItemRepository from '../../../domain/repository/item-repository';

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];

  constructor() {
    this.items = [
      new Item('1', 'Guitarra', 1000, new ItemDimensions(0.20, 0.15, 0.10), 1),
      new Item('2', 'Amplificador', 5000, new ItemDimensions(0.20, 0.15, 0.10), 40),
      new Item('3', 'Cabo', 30, new ItemDimensions(0.20, 0.15, 0.10), 3),
    ];
  }

  async findById(idItem: string): Promise<Item> {
    const item = this.items.find((item) => item.id === idItem);
    if (!item) {
      throw new Error('Item not found');
    }
    return Promise.resolve(item);
  }
}
