#!/usr/bin/env node

"use strict"

//////////////////// EXECUTE with "./09.js (fileToUseHere)" ////////////////////
// ran "chmod +x 09.js" from TERMINAL to allow execution capabilities

const { createReadStream }= require('fs')
const [, , fileToUseHere] = process.argv

const readStream = createReadStream(fileToUseHere, { highWaterMark: 2 })  // bits of data processed at a time -  "chunk size"

readStream.on("data", buffer => {
  readStream.pause()
  process.stdout.write(buffer.toString())                     // sends text as it is (no buffering)
})

const timer = setInterval(() => readStream.resume(), 50)     // timer for writing to the page

readStream.on("end", ()=> {
  console.log("Stream End")                                   // Con log at end of stream
  clearInterval(timer)                                        // stops stream read (otherwise waits for more data)
})















/////////////////////////////////// LEARNING ///////////////////////////////////
// // //There are three types of streams to accomplish tasks:
/////////////////////////////////// READABLE ///////////////////////////////////
// // A Readable which retrieves data...
// const { Readable } = require('stream')

// const readStream = new Readable()
// readStream.push('foo\n')
// readStream.push('bar\n')
// readStream.push('foodie\n')
// readStream.push('barly\n')
// readStream.push(null)

// // readStream.on('data', buffer => (
// //   process.stdout.write(`Received chunk: ${JSON.stringify(buffer.toString())}\n`)
// // ))
// // readStream.on('end', () => 
// //   process.stdout.write('End of stream\n\n'))

// readStream.pipe(process.stdout)


/////////////////////////////////// TRANSFORM //////////////////////////////////
// // a Transform stream to manipulate the data...
// const { Readable, Transform } = require('stream')

// const readStream = Readable()
// readStream.push('zoo')
// readStream.push('car')
// readStream.push('zootie')
// readStream.push('carmax')
// readStream.push(null)

// const JSONStringify = Transform()
// JSONStringify._transform = (buffer, _, cb) => (
  // // cb(null, `${JSON.stringify(buffer.toString())}\n`)                  // returns the readstream items "WITH QUOTES"
  // cb(null, `${(buffer)}\n`)                                              // returns the readstream items with NO QUOTES
// )

// readStream.pipe(JSONStringify).pipe(process.stdout)


/////////////////////////////////// WRITABLE ///////////////////////////////////
// // and a Writable stream to give the manipulated data a destination
// const { Readable, Writable } = require('stream')

// const readStream = Readable()
// readStream.push('goo')
// readStream.push('ber')
// readStream.push('goodie')
// readStream.push('berm')
// readStream.push(null)

// const writeStream = Writable()
// writeStream._write = (buffer, _, cb) => {
//   // process.stdout.write(`${JSON.stringify(buffer.toString())}\n`)       // returns the readstream items "WITH QUOTES"
//   process.stdout.write(`${(buffer)}\n`)                                   // returns the readstream items with NO QUOTES
//   cb()                                                                    // callback function is 3rd argument in function and executes when complete
// }

// readStream.pipe(writeStream)
