import renderExcel from '../index'
import fs from 'fs'

const raw_data = fs.readFileSync('example/data.json', {encoding: 'utf-8'})
const data = JSON.parse(raw_data)

renderExcel(
  'example/template.xlsx',
  'example/output.xlsx',
  data
)