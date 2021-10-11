import ItemDimensions from '../../../../src/domain/entity/item-dimensions';
import Item from '../../../../src/domain/entity/item';

test('Should calculate density correctly in kg/m3 (1)', () => {
  const itemDimension = new ItemDimensions(0.20, 0.15, 0.10);
  const item = new Item('1', 'desc 1', 1, itemDimension, 1);
  expect(item.getDensity()).toBe(333);
});


test('Should calculate density correctly in kg/m3 (2)', () => {
  const itemDimension = new ItemDimensions(1, 0.3, 0.10);
  const item = new Item('1', 'desc 1', 1, itemDimension, 3);
  expect(item.getDensity()).toBe(100);
});


test('Should calculate density correctly in kg/m3 (3)', () => {
  const itemDimension = new ItemDimensions(2, 1, 0.5);
  const item = new Item('1', 'desc 1', 1, itemDimension, 40);
  expect(item.getDensity()).toBe(40);
});
