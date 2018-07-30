'use strict'

const glob = require('glob')
const { resolve, join } = require('path')
const { readFileSync: read, writeFileSync: write } = require('fs')
const { hookRequire } = require('istanbul-lib-hook')
const { createInstrumenter } = require('istanbul-lib-instrument')

const instrumenter = createInstrumenter({ debug: true, esModules: true })
const transformer = instrumenter.instrumentSync.bind(instrumenter)
let cov = global.__coverage__ = {}

const root = resolve(__dirname, '..', '..')
const tmpd = resolve(root, '.nyc_output')

const pattern = './app/src/**/*.{ts,tsx}'

const match = () => {
  const map = {}
  const fn = function(file) { return map[file] }

  fn.files = glob.sync(pattern, { root, realpath: true })
  for (let file of fn.files) map[file] = true

  return fn
}

const report = () => {
  console.log("REPORTING FOR DUTY")
  console.log("hello ", cov)
  for (let file of matched.files) {
    console.log(file)
    if (!cov[file]) {
      console.log("no cov for file")
      // Files that are not touched by code ran by the test runner is
      // manually instrumented, to illustrate the missing coverage.
      try {
        transformer(read(file, 'utf-8'), file)
      }
      catch (e) {
        console.log(e)
      }
      console.log("transformed")
      cov[file] = instrumenter.lastFileCoverage()
      console.log("done")
    }
  }
  console.log("hello ", cov);
  write(join(tmpd, `${process.type}.json`), JSON.stringify(cov), 'utf-8')
  console.log("finished");
}

const matched = match()
hookRequire(matched, transformer, {})

if (process.type === 'browser') {
  process.on('exit', report)
} else {
  window.addEventListener('unload', report)
}
