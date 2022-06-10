## 打开excel文件，写入内容到某一工作表的单元格
```javascript
const Excel = require('exceljs')

const workbook = new Excel.Workbook();

async function readExcel() {
    await workbook.xlsx.readFile('test.xlsx');
    const demo = workbook.getWorksheet('demo');
    const cellA2 = demo.getCell("A3");

    cellA2.value = new Date();

    await workbook.xlsx.writeFile('demo.xlsx');
}


readExcel();
```