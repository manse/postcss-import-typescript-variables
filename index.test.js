const lib = require('./index');

test('parent case', function() {
  const vars = lib({
    content: `
    export const A = {a: 1};
    export const B_B = {b: 1};
    export const Cc = {c: 1};
    export const dD = {d: 1};
    export const E = 1;
    export const F_F = 1;
    export const Gg = 1;
    export const hH = 1;
    `
  });
  expect(vars['a-a']).toBe('1px');
  expect(vars['b-b-b']).toBe('1px');
  expect(vars['cc-c']).toBe('1px');
  expect(vars['d-d-d']).toBe('1px');
  expect(vars['e']).toBe('1px');
  expect(vars['f-f']).toBe('1px');
  expect(vars['gg']).toBe('1px');
  expect(vars['h-h']).toBe('1px');
});

test('child case', function() {
  const vars = lib({
    content: `
    export const a = {
      A: 1,
      B_B: 1,
      Cc: 1,
      dD: 1
    };
    `
  });
  expect(vars['a-a']).toBe('1px');
  expect(vars['a-b-b']).toBe('1px');
  expect(vars['a-cc']).toBe('1px');
  expect(vars['a-d-d']).toBe('1px');
});
