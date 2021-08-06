import ExcelJS from 'exceljs' 
import Handlebars from 'handlebars';

export default async function renderExcel(input: string, output: string, data: any) {
  const book = await new ExcelJS.Workbook().xlsx.readFile(input);
  const totalWorksheets = book.worksheets.length

  for (let sheetIndex = 1; sheetIndex <= totalWorksheets; sheetIndex++) {
    const dataSheet = book.getWorksheet(sheetIndex);

    const maxColumns = dataSheet.actualColumnCount //Column is horizonal
    const maxRows = dataSheet.actualRowCount //Row is vertical

    for (let rowIndex = 1; rowIndex <= maxRows; rowIndex++) {
      for (let columnIndex = 1; columnIndex <= maxColumns; columnIndex++) {
        const cell = dataSheet.getRow(rowIndex).getCell(columnIndex)
        if (typeof cell.value == 'string') {
          cell.value = Handlebars.compile(cell.value)(data);
        }
      }
    }

    await book.xlsx.writeFile(output);
  }
}