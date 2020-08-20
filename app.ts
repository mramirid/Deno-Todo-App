const text = 'Hello world'

const encoder = new TextEncoder()
const encodedText = encoder.encode(text)

await Deno.writeFile('output.txt', encodedText)
console.log('Wrote to file!')