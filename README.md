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

Once you have all, create a new instance of ExcelHandlebars, use the function renderExcel() in the instance in order to compile the file. The first param is the path of the template, the second param is path of the output file and the third param is the data in JSON, example:
```ts
import ExcelHandlebars from '../index'
import fs from 'fs'

const raw_data = fs.readFileSync('example/data.json', {encoding: 'utf-8'})
const data = JSON.parse(raw_data)

// New instance of ExcelHandlebars
const templateOutput = new ExcelHandlebars()

// Creates the output file.
templateOutput.renderExcel(
  'example/template.xlsx',
  'example/output.xlsx',
  data
)
```
Output:
| Person | Data |
| ------------- | ------------- |
| Name  | Steve  |
| Age  | 26  |

## Using helpers

To create a helper use the method registerHelper, it receives the name of the helper and the function that defines what it do.
```ts
// Registering helper 'uppercase', it uppercase text. Usage in handlebar: {{uppercase data.value}}
templateOutput.registerHelper('uppercase', (text: string|undefined) => {
  if(!text) return
  return text.toUpperCase()
})
```
Usage in template:
| Person | Data |
| ------------- | ------------- |
| Uppercase name  | {{uppercase data.name}}  |

```
"data": {
  "name": "karl",
}
```

Output:
| Person | Data |
| ------------- | ------------- |
| Uppercase name  | KARL |
