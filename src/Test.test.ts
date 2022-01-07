import Test from "./Test";

test('Deve retornar o nome do test', () => {
  const test = new Test('It is working');
  expect(test.getName()).toBe('It is working');
})