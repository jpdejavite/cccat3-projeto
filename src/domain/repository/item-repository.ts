import Item from '../entity/item';

export default interface ItemRepository {
  findById(idItem: string): Promise<Item>;
}
