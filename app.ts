const text = 'Hello world'

const encoder = new TextEncoder()
const encodedText = encoder.encode(text)

await Deno.writeFile('output.log', encodedText)
console.log('Wrote to file!')