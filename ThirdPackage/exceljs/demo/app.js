const Exceljs = require('exceljs');
const cell = require('./utils.js')

const workbook = new Exceljs.Workbook();


workbook.creator = "anqing";
workbook.lastModifiedBy = "anqing";
workbook.modified = new Date();

const sheet1 = workbook.addWorksheet("sheet1", { properties: { tabColor: { argb: 'FFC0000' } } });

let A1 = sheet1.getCell("A1");
A1.value = new Date();

let A2 = sheet1.getCell("A2");
A2.value = "anqing";

let A3 = sheet1.getCell("A3");
A3.value = {
    text: 'myblog',
    hyperlink: 'http://anqing-none.github.io',
    tooltip: 'www.mylink.com'
}

let B1 = sheet1.getCell("B1");
B1.value = 4;

let B2 = sheet1.getCell("B2");
// B2.value = 3;

// let B3 = sheet1.getCell
let B3 = cell.call(sheet1, "B3");

let B3value = null;
if (B1.value && B2.value) {
    B3value = { formula: 'B1*B2' };
}
B3.value = B3value;


workbook.xlsx.writeFile("demo.xlsx");





