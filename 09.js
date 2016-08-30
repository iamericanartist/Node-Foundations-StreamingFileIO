#!/usr/bin/env node

'use strict';

/////////// EXECUTE with "./09.js (source.file) (destination.file)`" ///////////
////// ran "chmod +x 09.js" from TERMINAL to allow execution capabilities //////

const { Readable, Writable, Transform } = require('stream')
const [, , ...cliArguments] = process.argv
const fs = require('fs')

const readStream = fs.createReadStream(cliArguments[0])     // [0] is the source file


const transformStream = Transform()
transformStream._transform = (buffer, _, cb) => {
  
  console.log(`FROM:\n${buffer.toString()}TO:`);              // Before (w/ added text)

  cb(null, `${buffer.toString().toUpperCase()}`)            // After .toUpperCase()
}


const writeStream = Writable()
writeStream._write = (buffer, _, cb) => {
    process.stdout.write(`${buffer}\n`)
    fs.writeFile(cliArguments[1], buffer, (err) => {        // [1] is the destination file 
        if (err) throw err
    });
    cb()
}

readStream.pipe(transformStream).pipe(writeStream)




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
  // // cb(null, `${JSON.stringify(buffer.toString())}\n`)              // returns the readstream items "WITH QUOTES"
  // cb(null, `${(buffer)}\n`)                                          // returns the readstream items with NO QUOTES
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
//   // process.stdout.write(`${JSON.stringify(buffer.toString())}\n`)    // returns the readstream items "WITH QUOTES"
//   process.stdout.write(`${(buffer)}\n`)                                // returns the readstream items with NO QUOTES
//   cb()                                                                 // callback function is 3rd argument in function and executes when complete
// }

// readStream.pipe(writeStream)
