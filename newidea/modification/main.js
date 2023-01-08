const decimal = require('decimal.js')
'use strict';
/**
 * 四舍六入五成双修约法
 * @param {number | numberString} num 待修约的值
 * @param {number} precision 指定修约到第几小数位数，应当大于等于0
 */
function ROUND(num, precision) {
  isValidNumber(num) ? num = `${num}`.trim() : num = 0;
  precision < 0 ? precision = 0 : '';
  // fix 修约浮点数精度丢失问题 
  const judge = decimal(num).mul(Math.pow(10, precision)).toNumber();
  if (Math.abs(judge) % 2 == 0.5) {
    return roundDown(num, precision).toFixed(precision);
  } else {
    return roundNormal(num, precision).toFixed(precision);
  }

}

/**
 * 向下舍入修约 即 1.79 -> 1.70
 * @param {number} num 待修约的数
 * @param {number} precision 修约到的小数位数
 * @returns {number} 修约后的数
 */
function roundDown(num, precision) {
  return Math.floor(+num + 'e' + precision) / Math.pow(10, precision);
}

/**
 * 普通的四舍五入
 * @param {number} num 待修约的数
 * @param {number} precision 修约到的小数位数
 * @returns {number} 修约后的数
 */
function roundNormal(num, precision) {
  return Math.round(+num + 'e' + precision) / Math.pow(10, precision);
}

/**
 * 将一个数字修约到有效位
 * @param {number} num 待修约数
 * @param {number} validDigit 有效位,必须大于等于1 !!
 */
function ROUNDVALIDDIGIT(num, validDigit) {
  validDigit <= 1 ? validDigit = 1 : '';
  let isNegtive = false;
  num < 0 ? isNegtive = true : '';
  num = Math.abs(num);
  const decimalBeforeLen = decimal.log10(num).floor().toNumber() + 1;
  const roundPosDigit = validDigit - decimalBeforeLen;
  if (roundPosDigit < 0) {
    let ret = TOSCIENTIFIC(num, validDigit);
    isNegtive ? ret = '-' + ret : '';
    return ret;
  } else {
    let roundedRet = ROUND(num, roundPosDigit);
    isNegtive ? roundedRet = '-' + roundedRet : '';
    return roundedRet;
  }
}

/**
 * 科学技术法 a×10^b, a的取值区间（1≤|a|<10）
 * @param {number} num 待转换的值
 * @param {number} validDigit 保留的有效位数
 * @returns 转换后的科学计数法字符串
 */
function TOSCIENTIFIC(num, validDigit) {
  if (typeof +num !== "number") {
    console.log('TOSCIENTIFIC failed，num非数值！');
    return num;
  }
  num = Number(num);
  const superNumberMap = { 0: "º", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-1": "⁻¹", "-2": "⁻²", "-3": "⁻³", "-4": "⁻⁴", "-5": "⁻⁵", "-6": "⁻⁶", "-7": "⁻⁷", "-8": "⁻⁸", "-9": "⁻⁹" }

  // 原生科学计数法分隔符
  const splitString = Math.abs(num) >= 1 ? 'e+' : 'e';

  const expNum = num.toExponential(); // 0: 0e+0 , 1000: 1e+3 , 1210: 1.21e+3
  const [m, n] = expNum.toString().split(splitString); //m × 10n, 当num小于0时，m为负数，当num为小数时，n为负数
  // 修约到有效位数
  // 判断有效位数
  let ValidDigitNum = validDigit;
  if (m >= 1) {
    const strm = String(m);
    const [decimalBeforeNum] = strm.split('.');
    const decimalBeforeLen = decimalBeforeNum.length;
    ValidDigitNum = ValidDigitNum - decimalBeforeLen;
  }
  let roundedM = Number(ROUND(Math.abs(m), ValidDigitNum)).toPrecision(validDigit);
  // num为负数的处理，加个负号
  num < 0 ? roundedM = -roundedM : '';
  const retStr = `${roundedM}×10${superNumberMap[n]}`;
  return retStr;
}

/**
 * 将科学计数法转换为普通数字
 * @param {String} sciNum 科学计数法字符串
 * @returns 转换后的数字
 */
function SCIENTIFICTONUM(sciNum) {
  const baseNumberMap = { "º": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9, "⁻¹": "-1", "⁻²": "-2", "⁻³": "-3", "⁻⁴": "-4", "⁻⁵": "-5", "⁻⁶": "-6", "⁻⁷": "-7", "⁻⁸": "-8", "⁻⁹": "-9" };
  const [m, n] = sciNum.split('×10'); //m × 10n
  const retNum = decimal(m).mul(decimal.pow(10, baseNumberMap[n])).toNumber();
  return retNum;
}
// 用于表单公式
function ROUNDFXSAMPLEVALUE(value, field = 'ScientificValue') {
  field = 'ScientificValue'
  // 表单table区域的行索引值
  const rowIndex = this.$formulaResult.rowindex;
  // Lab_LowestFormat 检出限格式： ND / 检出限+L
  const { Lab_LowestFormat } = window.$app.Cfg.lims.labConfig;
  // ValidDigit : 有效位数  DecimalDigit : 小数位数  LowestLimitValue :检出限
  const { ValidDigit, DecimalDigit, LowestLimitValue } = this.datasource.form;
  // 先判定检出限
  let ResultRoundValue = value; // 样品结果修约后的值，可能为检出限L/ND等字符串
  let ResultScientificValue = value;
  if (isValidNumber(LowestLimitValue) && Number(value) < Number(LowestLimitValue)) {
    let result = ''
    switch (Lab_LowestFormat) {
      case "检出限+L":
        result = `${LowestLimitValue}L`;
        break;
      case "ND":
        result = `ND`;
        break;
      default:
        result = "ND";
    }
    ResultRoundValue = result;
    ResultScientificValue = result;
    // 低于检出限返回，无需修约
    console.log(`低于检出限，无需修约，样品原始结果值：${value}，检出限：${LowestLimitValue}`);
    this.datasource.sampleList[rowIndex].Value = value; // 样品结果的原始值，未经过任何处理
    this.datasource.sampleList[rowIndex].RoundValue = ResultRoundValue;  // 样品结果修约后的值，可能为检出限L/ND等字符串
    this.datasource.sampleList[rowIndex].ScientificValue = ResultScientificValue;  // 判断样品结果是否小于方法检出限
    return this.datasource.sampleList[rowIndex][field];
  }
  /**
   * 1.同时设置了有效位和小数位
   * 2.未设置有效位，设置了小数位
   * 3.设置了有效位，未设置小数位
   * 4.未设置有效位，未设置小数位
   */

  //#region 
  if (!isValidNumber(ValidDigit) && !isValidNumber(DecimalDigit)/** 4.未设置有效位，未设置小数位*/) {
    console.log(`未设置有效位，未设置小数位，不进行修约,样品原始结果值：${value}`);
    this.datasource.sampleList[rowIndex].Value = value; // 样品结果的原始值，未经过任何处理
    this.datasource.sampleList[rowIndex].RoundValue = ResultRoundValue;  // 样品结果修约后的值，可能为检出限L/ND等字符串
    this.datasource.sampleList[rowIndex].ScientificValue = ResultScientificValue;  // 判断样品结果是否小于方法检出限
    return this.datasource.sampleList[rowIndex][field];
  } else if (isValidNumber(ValidDigit) && !isValidNumber(DecimalDigit)/**3.设置了有效位，未设置小数位 */) {
    const roundedRet = ROUNDVALIDDIGIT(value, ValidDigit);
    ResultScientificValue = roundedRet;
    if (roundedRet.includes('×')) {
      const normalNum = SCIENTIFICTONUM(roundedRet);
      ResultRoundValue = normalNum;
    }
    this.datasource.sampleList[rowIndex].Value = value; // 样品结果的原始值，未经过任何处理
    this.datasource.sampleList[rowIndex].RoundValue = ResultRoundValue;  // 样品结果修约后的值，可能为检出限L/ND等字符串
    this.datasource.sampleList[rowIndex].ScientificValue = ResultScientificValue;  // 判断样品结果是否小于方法检出限
    console.log(`设置了有效位${ValidDigit}，未设置小数位，修约到有效位数, 样品原始结果值：${value}, 样品修约值：${ResultRoundValue}，样品记数法值：${ResultScientificValue}`);
    return this.datasource.sampleList[rowIndex][field];
  } else if (!isValidNumber(ValidDigit) && isValidNumber(DecimalDigit) /**2.未设置有效位，设置了小数位 */) {
    const roundedRet = ROUND(value, DecimalDigit);
    ResultRoundValue = roundedRet;
    ResultScientificValue = roundedRet;
    this.datasource.sampleList[rowIndex].Value = value; // 样品结果的原始值，未经过任何处理
    this.datasource.sampleList[rowIndex].RoundValue = ResultRoundValue;  // 样品结果修约后的值，可能为检出限L/ND等字符串
    this.datasource.sampleList[rowIndex].ScientificValue = ResultScientificValue;  // 判断样品结果是否小于方法检出限
    console.log(`未设置有效位，设置了小数位${DecimalDigit}，修约到小数位, 样品原始结果值：${value}, 样品修约值：${ResultRoundValue}，样品记数法值：${ResultScientificValue}`);
    return this.datasource.sampleList[rowIndex][field];
  }
  //#endregion
  // * 1.同时设置了有效位和小数位
  // 最终使用的修约位数，下面会依据条件更改
  let usedDigit = DecimalDigit;
  // 如果判断值小于10^(有效位数-小数位数) ，就按小数修约，否则就按有效位数修约
  const judgementValue = Math.pow(10, ValidDigit - DecimalDigit);
  if (value > judgementValue) {
    // 使用有效位保留位数需要判断xx.xx小数点前有几位数字，0.0022 -> -2 ，-2表示两个0
    const decimalBeforeNumLen = decimal.log10(value).floor().toNumber() + 1;
    usedDigit = ValidDigit - decimalBeforeNumLen;
    console.log(`${value}修约到有效位${ValidDigit},小数修补长度：${decimalBeforeNumLen},修约小数位${usedDigit}`);
  } else {
    console.log(`使用小数位进行保留位数：${DecimalDigit}`);
    usedDigit = DecimalDigit;
  }
  // 1.先进行保留位数修约
  let roundVal = ROUND(value, usedDigit);
  let RoundValue = roundVal;
  let ScientificValue = roundVal;

  // 如果结果大于10^（有效位数），就用科学记数法，科学记数法乘号前面的数也按有效位数修约
  if (value >= Math.pow(10, ValidDigit)) {
    ScientificValue = TOSCIENTIFIC(Number(roundVal), ValidDigit);
  }

  ResultRoundValue = RoundValue;
  ResultScientificValue = ScientificValue;
  console.log(`inject:样品原始结果值：${value}，样品修约值：${ResultRoundValue}，样品记数法值：${ResultScientificValue},有效位数：${ValidDigit}，小数位数：${DecimalDigit}，检出限：${LowestLimitValue}`);
  this.datasource.sampleList[rowIndex].Value = value; // 样品结果的原始值，未经过任何处理
  this.datasource.sampleList[rowIndex].RoundValue = ResultRoundValue;  // 样品结果修约后的值，可能为检出限L/ND等字符串
  this.datasource.sampleList[rowIndex].ScientificValue = ResultScientificValue;  // 判断样品结果是否小于方法检出限
  return this.datasource.sampleList[rowIndex][field];
}

function ROUNDRESULT(value, { DecimalDigit, ValidDigit, LowestLimitValue, Lab_LowestFormat }) {
  isValidNumber(value) ? "" : value = 0;

  let ResultRoundValue = value; // 样品结果修约后的值，可能为检出限L/ND等字符串
  let ResultScientificValue = value;
  /**
   * 0.先判定检出限
   * 1.同时设置了有效位和小数位
   * 2.未设置有效位，设置了小数位
   * 3.设置了有效位，未设置小数位
   * 4.未设置有效位，未设置小数位
   */

  if (isValidNumber(LowestLimitValue) && Number(value) < Number(LowestLimitValue)) {
    let result = ''
    switch (Lab_LowestFormat) {
      case "检出限+L":
        result = `${LowestLimitValue}L`;
        break;
      case "ND":
        result = `ND`;
        break;
      default:
        result = "ND";
    }
    ResultRoundValue = result;
    ResultScientificValue = result;
    // 低于检出限返回，无需修约
    const ret = { Value: value, RoundValue: ResultRoundValue, ScientificValue: ResultScientificValue };
    return ret;
  }



  //#region 
  if (!isValidNumber(ValidDigit) && !isValidNumber(DecimalDigit)/** 4.未设置有效位，未设置小数位*/) {
    const ret = { Value: value, RoundValue: ResultRoundValue, ScientificValue: ResultScientificValue };
    return ret;
  } else if (isValidNumber(ValidDigit) && !isValidNumber(DecimalDigit)/**3.设置了有效位，未设置小数位 */) {
    const roundedRet = ROUNDVALIDDIGIT(value, ValidDigit);
    ResultRoundValue = roundedRet;
    ResultScientificValue = roundedRet;
    if (roundedRet.includes('×')) {
      const normalNum = SCIENTIFICTONUM(roundedRet);
      ResultRoundValue = normalNum;
    }
    const ret = { Value: value, RoundValue: ResultRoundValue, ScientificValue: ResultScientificValue };
    return ret;
  } else if (!isValidNumber(ValidDigit) && isValidNumber(DecimalDigit) /**2.未设置有效位，设置了小数位 */) {
    const roundedRet = ROUND(value, DecimalDigit);
    ResultRoundValue = roundedRet;
    ResultScientificValue = roundedRet;

    const ret = { Value: value, RoundValue: ResultRoundValue, ScientificValue: ResultScientificValue };
    return ret;
  }
  //#endregion
  // * 1.同时设置了有效位和小数位
  // 最终使用的修约位数，下面会依据条件更改
  let usedDigit = DecimalDigit;
  // 如果判断值小于10^(有效位数-小数位数) ，就按小数修约，否则就按有效位数修约
  const judgementValue = Math.pow(10, ValidDigit - DecimalDigit);
  if (value > judgementValue) {
    // 使用有效位保留位数需要判断xx.xx小数点前有几位数字，0.0022 -> -2 ，-2表示两个0
    const decimalBeforeNumLen = decimal.log10(value).floor().toNumber() + 1;
    usedDigit = ValidDigit - decimalBeforeNumLen;
  } else {
    usedDigit = DecimalDigit;
  }
  // 1.先进行保留位数修约
  let roundVal = ROUND(value, usedDigit);
  let RoundValue = roundVal;
  let ScientificValue = roundVal;

  // 如果结果大于10^（有效位数），就用科学记数法，科学记数法乘号前面的数也按有效位数修约
  if (value >= Math.pow(10, ValidDigit)) {
    ScientificValue = TOSCIENTIFIC(Number(roundVal), ValidDigit);
  }

  ResultRoundValue = RoundValue;
  ResultScientificValue = ScientificValue;
  const ret = { Value: value, RoundValue: ResultRoundValue, ScientificValue: ResultScientificValue };
  return ret;
}

function AVG(...numList) {
  numList = numList || [];
  let sum = decimal(0);
  let count = 0;
  numList.forEach(num => {
    if (typeof +num != 'number') { console.log('AVG: not a number'); return; }
    sum = sum.add(Number(num))
    count++;
  })
  return count != 0 ? sum.div(count).toString() : '';
}
/**
 * 一元线性回归斜率b值计算
 * @param {Array} listx x轴的值
 * @param {Array} listy y轴的值
 * @param {number} precision 斜率的保留小数位
 * @returns {String}  y = a + bx   返回修约后的b
 */
function SLOPE(listx, listy, precision = 2) {
  try {
    // const { table: list } = this.datasource;
    const xList = listx.filter(i => `${i}`.trim() != '');
    const yList = listy.filter(i => `${i}`.trim() != '');
    // 计算公式
    // https://baike.baidu.com/item/%E4%B8%80%E5%85%83%E7%BA%BF%E6%80%A7%E5%9B%9E%E5%BD%92%E6%96%B9%E7%A8%8B
    const len = Math.min(xList.length, yList.length);
    const calcxList = xList.slice(0, len);
    const calcyList = yList.slice(0, len);
    const avgX = AVG(...calcxList);
    const avgY = AVG(...calcyList);
    let multiSum = decimal(0);
    let xMinusXAvgPow2Sum = decimal(0);
    for (let i = 0; i < len; i++) {
      const x = calcxList[i];
      const y = calcyList[i];
      const xMinusXAvg = decimal(x).minus(avgX);
      const yMinusYAvg = decimal(y).minus(avgY);
      const multi = xMinusXAvg.mul(yMinusYAvg);
      multiSum = multiSum.add(multi);

      const xMinusXAvgPow2 = decimal.pow(xMinusXAvg, 2);
      xMinusXAvgPow2Sum = xMinusXAvgPow2Sum.add(xMinusXAvgPow2);
    }

    const originB = multiSum.div(xMinusXAvgPow2Sum).toString();
    const roundedB = ROUND(originB, precision);

    console.log(`SLOPE claculate`, 'xList:', xList, "yList", yList, "originRet", originB, "roundedB", roundedB);

    return roundedB || "";
  } catch (error) {
    console.log('SLOPE claculate failed. ');
  }
}
/**
 * 一元线性回归截距a值计算
 * @param {Array} listx x轴的值
 * @param {Array} listy y轴的值
 * @param {number} precision 截距的保留小数位
 * @returns {String} y = a + bx   返回修约后的a
 */
function INTERCEPT(listx, listy, precision = 2) {
  try {
    // const { table: list } = this.datasource;
    const xList = listx.filter(i => `${i}`.trim() != '');
    const yList = listy.filter(i => `${i}`.trim() != '');
    // 计算公式
    // https://baike.baidu.com/item/%E4%B8%80%E5%85%83%E7%BA%BF%E6%80%A7%E5%9B%9E%E5%BD%92%E6%96%B9%E7%A8%8B
    const len = Math.min(xList.length, yList.length);
    const calcxList = xList.slice(0, len);
    const calcyList = yList.slice(0, len);
    const avgX = AVG(...calcxList);
    const avgY = AVG(...calcyList);
    let multiSum = decimal(0);
    let xMinusXAvgPow2Sum = decimal(0);
    for (let i = 0; i < len; i++) {
      const x = calcxList[i];
      const y = calcyList[i];
      const xMinusXAvg = decimal(x).minus(avgX);
      const yMinusYAvg = decimal(y).minus(avgY);
      const multi = xMinusXAvg.mul(yMinusYAvg);
      multiSum = multiSum.add(multi);

      const xMinusXAvgPow2 = decimal.pow(xMinusXAvg, 2);
      xMinusXAvgPow2Sum = xMinusXAvgPow2Sum.add(xMinusXAvgPow2);
    }

    const originB = multiSum.div(xMinusXAvgPow2Sum);
    const originA = decimal(avgY).minus(decimal(originB).mul(avgX)).toString();
    const roundedA = ROUND(originA, precision);
    console.log(`INTERCEPT claculate`, 'xList:', calcxList, "yList", calcyList, "originB", originB, "roundedB", "originA", originA, "roundedA", roundedA);

    return roundedA || "";
  } catch (error) {
    console.log('INTERCEPT claculate failed. ');
  }
}
/**
 * 返回两组数值的相关系数
 * @param {Array} listx x轴的值
 * @param {Array} listy y轴的值
 * @param {number} precision R值的保留小数位
 * @returns {String} 返回向下修约后的r
 */
function CORREL(listx, listy, precision = 4) {
  try {
    const xList = listx.filter(i => `${i}`.trim() != '');
    const yList = listy.filter(i => `${i}`.trim() != '');
    // 计算公式
    // https://baike.baidu.com/item/%E4%B8%80%E5%85%83%E7%BA%BF%E6%80%A7%E5%9B%9E%E5%BD%92%E6%96%B9%E7%A8%8B
    const len = Math.min(xList.length, yList.length);
    const calcxList = xList.slice(0, len);
    const calcyList = yList.slice(0, len);
    const avgX = AVG(...calcxList);
    const avgY = AVG(...calcyList);
    let xMinusXAvgMulyMinusYAvgSum = decimal(0);
    let xMinusXAvgPowSum = decimal(0);
    let yMinusYAvgPowSum = decimal(0);
    for (let i = 0; i < len; i++) {
      const x = calcxList[i];
      const y = calcyList[i];
      const xMinusXAvg = decimal(x).minus(avgX);
      const yMinusYAvg = decimal(y).minus(avgY);
      const xMinusXAvgMulyMinusYAvg = decimal(xMinusXAvg).mul(yMinusYAvg);
      xMinusXAvgMulyMinusYAvgSum = xMinusXAvgMulyMinusYAvgSum.add(xMinusXAvgMulyMinusYAvg);
      const xMinusXAvgPow = decimal.pow(xMinusXAvg, 2);
      xMinusXAvgPowSum = xMinusXAvgPowSum.add(xMinusXAvgPow);
      const yMinusYAvgPow = decimal.pow(yMinusYAvg, 2);
      yMinusYAvgPowSum = yMinusYAvgPowSum.add(yMinusYAvgPow);
    }
    const step1 = decimal.pow(xMinusXAvgPowSum, 0.5).mul(decimal.pow(yMinusYAvgPowSum, 0.5));
    const originR = xMinusXAvgMulyMinusYAvgSum.div(step1).toString();
    const roundedR = roundDown(originR, precision);
    console.log(`CORREL claculate`, 'xList:', calcxList, "yList", calcyList, "originR", originR, "roundedR", roundedR);
    return roundedR || "";
  } catch (error) {
    console.log('CORREL claculate failed. ');
  }
}
function isValidNumber(value) {
  let ret = true;
  if (isNaN(+value)) {
    ret = false;
  }
  if (value == undefined) {
    ret = false;
  }
  if (value == null) {
    ret = false;
  }
  if (String(value).trim() == '') {
    ret = false;
  }
  return ret;
}


module.exports = {
  ROUND,
  ROUNDVALIDDIGIT,
  TOSCIENTIFIC,
  SCIENTIFICTONUM,
  ROUNDRESULT,
  isValidNumber
}