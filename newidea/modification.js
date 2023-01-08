/*
修约：四舍六入，五成双
1. 确定保留小数位数
2.修约
3.判断是否需要补0

主要是判断结尾为5这个特殊情况，如3.65修约到小数后一位，结果应为3.6
这里的已知条件有 修约到小数后一位、被修约数
而需要判断小数位结尾是否是5，即修约到小数后一位的后一位是否为5
奇进偶不进，所以需要判断小数后一位数字是奇数还是偶数，判断奇偶可以对2取余来判断


当修约位数为x，小数点向右移动x位，得到的数对2取余判断结果是否为0.5，如果是0.5，表示以5结尾并且5前面一位数字是偶数，此时应不进
否则，进

"=IF(MOD(ABS(A1*10^-X),2)=0.5,ROUNDDOWN(A1,-X),ROUND(A1,-X))"
A1就是待修约的数
X是修约到10的几次方
-2是修约到10的-2次方，也就是小数点后2位，0.01    
-1是修约到10的-1次方，也就是小数点后1位，0.1    
0是修约到10的0次方，也就是个位    
1是修约到10的1次方，也就是十位    
2是修约到10的2次方，也就是百位

作者：嘞好
链接：https://www.zhihu.com/question/326580932/answer/1145359410
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

*/
/**
 * @summary 四舍六入五成双
 * @param  {number} num - 需要修约的数
 * @param  {number} precision - 保留位数,即需要修约数值到第几位小数
 * @return {number} 修约后的数值
 */
function round(num, precision) {
    if (typeof +num !== "number") {
        console.log('修约失败，num非数值！');
        return num;
    }
    // 这里的乘以10的x次方可以理解为将小数点移到要修约的位数，判断末尾是不是0.50000，且前一位为偶数
    if (Math.abs((num * Math.pow(10, precision))) % 2 == 0.5) {
        return roundDown(num, precision).toFixed(precision);
    } else {
        return roundNormal(num, precision).toFixed(precision);
    }

    function roundDown(num, precision) {
        return Math.floor(+num + 'e' + precision) / Math.pow(10, precision);

    }

    function roundNormal(num, precision) {
        return Math.round(+num + 'e' + precision) / Math.pow(10, precision);
    }
}


/* 科学计数法
    - 科学计数法需要先修约
    修约需要小数
    有效位数
    固定小数
    用toPrecision兜底即可


*/
/**
* brief
* @summary description
* @param {ParamDataTypeHere} signDigits - 有效位数
* @return {ReturnValueDataTypeHere} Brief description
*/
function toScientific(num, signDigits = 2) {
    if (typeof +num !== "number") {
        console.log('roundDown修约失败，num非数值！');
        return num;
    }
    num = Number(num);
    const superNumberMap = { 0: "º", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-1": "⁻¹", "-2": "⁻²", "-3": "⁻³", "-4": "⁻⁴", "-5": "⁻⁵", "-6": "⁻⁶", "-7": "⁻⁷", "-8": "⁻⁸", "-9": "⁻⁹" }

    // 原生科学计数法分隔符
    const splitString = Math.abs(num) >= 1 ? 'e+' : 'e';

    const expNum = num.toExponential(); // 0: 0e+0 , 1000: 1e+3 , 1210: 1.21e+3
    const [m, n] = expNum.toString().split(splitString); //m × 10n, 当num小于0时，m为负数，当num为小数时，n为负数
    // 修约到有效位数
    let roundedM = Number(round(Math.abs(m), signDigits - 1 )).toPrecision(signDigits); 
    // num为负数的处理，加个负号
    num < 0 ? roundedM = -roundedM : '';

    const retStr = `${roundedM}×10${superNumberMap[n]}`;
    return retStr;
}

function scientificToNum(sciNum) {
    const baseNumberMap = { "º": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9, "⁻¹": "-1", "⁻²": "-2", "⁻³": "-3", "⁻⁴": "-4", "⁻⁵": "-5", "⁻⁶": "-6", "⁻⁷": "-7", "⁻⁸": "-8", "⁻⁹": "-9" };
    const [m, n] = sciNum.split('×10'); //m × 10n
    const retNum = m * 10 ** baseNumberMap[n];
    return retNum;
}


// console.log(round(3.5651, 2))

// console.log(toScientific(1051,2));


function nhSampleResultFormat(value, ValidDigit, DecimalDigit, LowestLimitValue, Lab_LowestFormat) {
    let usedDigit = DecimalDigit; // 最终使用的有效位数，下面代码会依据条件更改
    let ValidRoundDigit = null; // 
    const judgementValue = Math.pow(10, ValidDigit - DecimalDigit);
  
    let usePrecision = false;
    let useTofixed = false;
    // 如果结果值小于10^(有效位数-小数位数) ，就按小数修约，否则就按有效位数修约
    if (value > judgementValue) {
      console.log(`使用有效位进行保留位数：${ValidDigit}`);
      usedDigit = ValidDigit;
      usePrecision = true;
      // 使用有效位保留位数需要判断xx.xx小数点前有几位数字
      const strVal = Number(value).toString();
      if (strVal.includes('.')) {
        const strList = strVal.split('.');
        const beforeLens = strList[0].length;
        if (ValidDigit >= beforeLens) {
          ValidRoundDigit = ValidDigit - beforeLens;
          console.log(`小数位前数字长度：${beforeLens},修约到底第${ValidRoundDigit}小数位`);
        }
        // 如果是0.xxx
        if (strList[0] == 0) {
          let afterNum = strList[strList.length - 1];
          // 判断小数点后xxx是否有0，以此来确认修约位数
          let afterNumList = [...afterNum];
          let zeroCount = 0;
          afterNumList.forEach(num => {
            if (num == 0) {
              zeroCount++;
            }
          });
          ValidRoundDigit = ValidDigit + zeroCount;
          console.log(`原始值为${value},小数点后零个数：${zeroCount},修约位数到第${ValidRoundDigit}小数位(有效位+零个数)`);
        }
      }
    } else {
      console.log(`使用小数位进行保留位数：${DecimalDigit}`);
      usedDigit = DecimalDigit;
      useTofixed = true;
    }
    // 1.先进行保留位数修约
    let roundVal = round2(value, usedDigit);
    if (ValidRoundDigit || ValidRoundDigit === 0) {
      roundVal = round2(value, ValidRoundDigit);
    }
  
    if (useTofixed) {
      roundVal = Number(roundVal).toFixed(usedDigit);
    } else if (usePrecision) {
      roundVal = Number(roundVal).toPrecision(usedDigit);
    }
    let RoundValue = Number(roundVal);
    let ScientificValue = roundVal;
  
    // 如果结果大于10^（有效位数），就用科学记数法，科学记数法乘号前面的数也按有效位数修约
    if (value >= Math.pow(10, ValidDigit)) {
      ScientificValue = toScientific2(Number(roundVal), ValidDigit);
    }
  
    let ResultValue = value; // 样品结果的原始值，未经过任何处理
    let ResultRoundValue = RoundValue; // 样品结果修约后的值，可能为检出限L/ND等字符串
    let ResultScientificValue = ScientificValue;
  
    // 判断检出限
    if (LowestLimitValue && LowestLimitValue != "" && LowestLimitValue != "-" && Number(value) < Number(LowestLimitValue)) {
      let result = ''
      switch (Lab_LowestFormat) {
        case "检出限+L":
          result = `${LowestLimitValue}L`
          break;
        case "ND":
          result = `ND`
          break;
        default:
          result = isNotNullOrEmpty(Lab_LowestFormat) ? Lab_LowestFormat.replace("{0}", LowestLimitValue) : "ND";
      }
      ResultRoundValue = result;
      ResultScientificValue = result;
    }
  
    return { ResultValue, ResultRoundValue, ResultScientificValue };
  
    function round2(num, precision) {
      if (typeof +num !== "number") {
        console.log('修约失败，num非数值！');
        return num;
      }
      if (Math.abs((num * Math.pow(10, precision))) % 2 == 0.5) {
        return roundDown(num, precision).toFixed(precision);
      } else {
        return roundNormal(num, precision).toFixed(precision);
      }
  
      function roundDown(num, precision) {
        return Math.floor(+num + 'e' + precision) / Math.pow(10, precision);
  
      }
  
      function roundNormal(num, precision) {
        return Math.round(+num + 'e' + precision) / Math.pow(10, precision);
      }
    }
  
    function toScientific2(num, signDigits = 2) {
      if (typeof +num !== "number") {
        console.log('toScientific failed，num非数值！');
        return num;
      }
      num = Number(num);
      const superNumberMap = { 0: "º", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-1": "⁻¹", "-2": "⁻²", "-3": "⁻³", "-4": "⁻⁴", "-5": "⁻⁵", "-6": "⁻⁶", "-7": "⁻⁷", "-8": "⁻⁸", "-9": "⁻⁹" }
  
      // 原生科学计数法分隔符
      const splitString = Math.abs(num) >= 1 ? 'e+' : 'e';
  
      const expNum = num.toExponential(); // 0: 0e+0 , 1000: 1e+3 , 1210: 1.21e+3
      const [m, n] = expNum.toString().split(splitString); //m × 10n, 当num小于0时，m为负数，当num为小数时，n为负数
      // 修约到有效位数
      let roundedM = Number(round2(Math.abs(m), signDigits)).toPrecision(signDigits);
      // num为负数的处理，加个负号
      num < 0 ? roundedM = -roundedM : '';
  
      const retStr = `${roundedM}×10${superNumberMap[n]}`;
      return retStr;
    }
  };

  // let ret = nhSampleResultFormat(1.2345,4,4,2,"检出限+L")
  // console.log(ret);

  console.log(round(0.565,2))