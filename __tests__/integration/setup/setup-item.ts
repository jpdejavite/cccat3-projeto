import Item from '../../../src/domain/entity/item';
import ItemDimensions from '../../../src/domain/entity/item-dimensions';

const addItem = async (pg: any, item: Item): Promise<void> => {
  await pg.query(`INSERT INTO item (id, description, price, height, width, depth, weight) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [item.id, item.description, item.price, item.dimensions.height, item.dimensions.width, item.dimensions.depth, item.weight]);
};

const setupItemData = async (pg: any): Promise<void> => {
  // COUPON TABLE
  await pg.query('DROP TABLE IF EXISTS item');
  await pg.query('CREATE TABLE item (id INTEGER PRIMARY KEY, description TEXT, price NUMERIC(10,2), height NUMERIC(10,2), width NUMERIC(10,2), depth NUMERIC(10,2), weight NUMERIC(10,2))');

  await addItem(pg, new Item('1', 'Guitarra', 1000, new ItemDimensions(0.20, 0.15, 0.10), 1));
  await addItem(pg, new Item('2', 'Amplificador', 5000, new ItemDimensions(0.20, 0.15, 0.10), 40));
  await addItem(pg, new Item('3', 'Cabo', 30, new ItemDimensions(0.20, 0.15, 0.10), 3));
};

export default setupItemData;
