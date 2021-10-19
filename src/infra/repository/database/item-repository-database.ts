import Item from '../../../domain/entity/item';
import ItemDimensions from '../../../domain/entity/item-dimensions';
import ItemRepository from '../../../domain/repository/item-repository';
import DatabaseConnection from '../../database/database-connection';

export default class ItemRepositoryDatabase implements ItemRepository {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async findById(idItem: string): Promise<Item> {
    const [itemData] = await this.databaseConnection.query('select * from item where id = $1', [idItem]);

    if (!itemData) {
      throw new Error('Item not found');
    }

    const itemDimensions = new ItemDimensions(parseFloat(itemData.height), parseFloat(itemData.width), parseFloat(itemData.depth));

    const item = new Item(itemData.id, itemData.description, parseFloat(itemData.price), itemDimensions, parseFloat(itemData.weight));
    return item;
  }
}
