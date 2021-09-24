import CpfValidator from '../../src/validators/cpf.validator';


test('CPF "" should be invalid', () => {
  expect(CpfValidator.validate('')).toBe(false);
});

test('CPF 111.111.111-1 should be invalid', () => {
  expect(CpfValidator.validate('111.111.111-1')).toBe(false);
});

test('CPF 111.111.111-11 should be invalid', () => {
  expect(CpfValidator.validate('111.111.111-11')).toBe(false);
});

test('CPF 123.456.789-99 should be invalid', () => {
  expect(CpfValidator.validate('123.456.789-99')).toBe(false);
});

test('CPF 935.411.347-80 should be valid', () => {
  expect(CpfValidator.validate('935.411.347-80')).toBe(true);
});

test('CPF 93541134780 should be valid', () => {
  expect(CpfValidator.validate('93541134780')).toBe(true);
});
