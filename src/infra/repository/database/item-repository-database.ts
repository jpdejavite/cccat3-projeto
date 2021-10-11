import Item from '../../../domain/entity/item';
import ItemDimensions from '../../../domain/entity/item-dimensions';
import ItemRepository from '../../../domain/repository/item-repository';
import DatabaseConnection from '../../database/database-connection';

export default class ItemRepositoryDatabase implements ItemRepository {

  constructor(readonly databaseConnection: DatabaseConnection) {
  }

  async findById(idItem: string): Promise<Item> {
    const [itemData] = await this.databaseConnection.query('select * from ccca.item where id = $1', [idItem]);
    // FIX THIS LATTER
    const item = new Item(itemData.id, itemData.description, parseFloat(itemData.price), new ItemDimensions(1, 0.3, 0.10), 1);
    return item;
  }
}
