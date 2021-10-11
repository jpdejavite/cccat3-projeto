import ItemDimensions from '../../../../src/domain/entity/item-dimensions';

test('Should calculate volume correctly in m3 (1)', () => {
  const itemDimension = new ItemDimensions(0.20, 0.15, 0.10);
  expect(itemDimension.getVolume()).toBe(0.003);
});


test('Should calculate volume correctly in m3 (2)', () => {
  const itemDimension = new ItemDimensions(1, 0.3, 0.10);
  expect(itemDimension.getVolume()).toBe(0.03);
});


test('Should calculate volume correctly in m3 (3)', () => {
  const itemDimension = new ItemDimensions(2, 1, 0.5);
  expect(itemDimension.getVolume()).toBe(1);
});
