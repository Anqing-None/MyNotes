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
    if (typeof num !== "number") {

    }
    if (Math.abs((num * Math.pow(10, precision))) % 2 == 0.5) {
        return roundDown(num, precision);
    } else {
        return roundNormal(num, precision);
    }

    function roundDown(num, precision) {
        return Math.floor(+num + 'e' + precision) / Math.pow(10, precision);

    }

    function roundNormal(num, precision) {
        return Math.round(+num + 'e' + precision) / Math.pow(10, precision);
    }
}

console.log(round(3.5651, 2))