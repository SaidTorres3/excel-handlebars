# Excel-Handlebars
Use handlebars inside a XLSX file and replace it with data in JSON.

## How to use it?

You'll need a template, is a XLSX file (excel file). Inside the document you can use handlebars inside cells:

| Person | Data |
| ------------- | ------------- |
| Name  | {{data.name}}  |
| Age  | {{data.age}}  |

And you'll need the data in JSON format:

```
"data": {
  "name": "Steve",
  "age": "26"
}
```

Once you have all, use the function renderExcel() in order to compile the file, example:
```js
import renderExcel from '../index'
import fs from 'fs'

const raw_data = fs.readFileSync('example/data.json', {encoding: 'utf-8'})
const data = JSON.parse(raw_data)

renderExcel(
  'example/template.xlsx',
  'example/output.xlsx',
  data
)
```
The first param is the path of the template, the second param is path of the output file and the third param is the data in JSON. 
