import ExcelHandlebars from '../index'
import fs from 'fs'

const raw_data = fs.readFileSync('example/data.json', {encoding: 'utf-8'})
const data = JSON.parse(raw_data)

const templateOutput = new ExcelHandlebars()

// Registering helper 'uppercase', it uppercase text. Usage in handlebar: {{uppercase data.value}}
templateOutput.registerHelper('uppercase', (text: string|undefined) => {
  if(!text) return
  return text.toUpperCase()
})

// Creates the output file.
templateOutput.renderExcel(
  'example/template.xlsx',
  'example/output.xlsx',
  data
)