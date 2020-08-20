import fs from 'fs/promises'

const text = 'Hello world'

await fs.writeFile('output.log', text)
console.log('Wrote file!')