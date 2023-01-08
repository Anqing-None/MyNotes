const { ROUND, ROUNDRESULT, ROUNDVALIDDIGIT, isValidNumber } = require('./main.js')



// ROUND
//#region 
test('修约 0.250 修约到一位小数 -> 0.2', () => {
  expect(ROUND(0.250, 1)).toBe('0.2');
  expect(ROUND('0.250', 1)).toBe('0.2');
  expect(ROUND('0.250', '1')).toBe('0.2');
  expect(ROUND(0.250, '1')).toBe('0.2');
});

test('修约 0.350 修约到一位小数 -> 0.4', () => {
  expect(ROUND(0.350, 1)).toBe('0.4');
});

test('修约 "0.122 " 修约到一位小数 -> 0.1', () => {
  expect(ROUND("0.122 ", 1)).toBe('0.1');
});

test('修约 "1.23" 修约到3位小数 -> 1.230', () => {
  expect(ROUND(1.23, 3)).toBe('1.230');
});
//#endregion


// isValidNumber
//#region 
test(' "0.2 " isValidNumber -> true ', () => {
  expect(isValidNumber("0.2 ")).toBe(true);
});

test(' "null" isValidNumber -> flase ', () => {
  expect(isValidNumber(null)).toBe(false);
});

test(' "undefined" isValidNumber -> flase ', () => {
  expect(isValidNumber(undefined)).toBe(false);
});

test(' "1.2×10¹" isValidNumber -> flase ', () => {
  expect(isValidNumber("1.2×10¹")).toBe(false);
});

//#endregion