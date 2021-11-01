const setupOrderData = async (pg: any): Promise<void> => {
  await pg.query('DROP TABLE IF EXISTS "order"');
  await pg.query('CREATE TABLE "order" (id SERIAL PRIMARY KEY, code TEXT, client_cpf TEXT, coupon_id TEXT, total NUMERIC(10,2), shipping_cost NUMERIC(10,2), created_at timestamp DEFAULT current_timestamp)');

  await pg.query('DROP TABLE IF EXISTS order_item');
  await pg.query('CREATE TABLE order_item (id SERIAL PRIMARY KEY, order_id INTEGER, quantity NUMERIC(10,2), final_price NUMERIC(10,2), item_id TEXT)');
};

export default setupOrderData;
