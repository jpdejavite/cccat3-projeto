import Cpf from '../../../../src/domain/entity/cpf';
import InvalidCpf from '../../../../src/domain/errors/invalid-cpf.error';


test('CPF "" should be invalid', () => {
  expect(() => {
    const cpf = new Cpf('');
  }).toThrow(new InvalidCpf());
});

test('CPF 111.111.111-1 should be invalid', () => {
  expect(() => {
    const cpf = new Cpf('111.111.111-1');
  }).toThrow(new InvalidCpf());
});

test('CPF 111.111.111-11 should be invalid', () => {
  expect(() => {
    const cpf = new Cpf('111.111.111-11');
  }).toThrow(new InvalidCpf());
});

test('CPF 123.456.789-99 should be invalid', () => {
  expect(() => {
    const cpf = new Cpf('123.456.789-99');
  }).toThrow(new InvalidCpf());
});

test('CPF 935.411.347-80 should be valid', () => {
  expect(new Cpf('935.411.347-80').getValue()).toBe('935.411.347-80');
});

test('CPF 93541134780 should be valid', () => {
  expect(new Cpf('93541134780').getValue()).toBe('93541134780');
});
