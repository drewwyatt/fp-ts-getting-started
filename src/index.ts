/// <reference path="../types/nodemon.d.ts" />
import yargs from 'yargs'
import { readdirSync } from 'fs'
import nodemon from 'nodemon'
import { join } from 'path'

yargs
  .scriptName('fp-ts-getting-started')
  .usage('$0 <cmd> [args]')
  .command(
    'exercise [name]',
    'Run the watcher for a particular exercise',
    y => {
      y.positional('name', {
        type: 'string',
        describe: 'the name of the file',
      })
    },
    argv => {
      const file = readdirSync('src', { withFileTypes: true })
        .filter(f => f.isFile())
        .find(f => f.name === argv.name || f.name === [argv.name, '.ts'].join(''))

      if (file) {
        console.log(`Found exercise "${file.name}" for input: "${argv.name}"`)
        nodemon({
          script: join(__dirname, file.name),
          ext: 'ts',
        })

        nodemon
          .on('start', () => {
            console.log('[nodemon] ✅ Exercise Ready')
          })
          .on('quit', () => {
            console.log('[nodemon] 👋 Extercise stopped')
            process.exit()
          })
          .on('restart', () => {
            console.log('[nodemon] 🌀 Change detected: restarting...')
          })
      } else {
        console.log(`Could not find file: "${argv.name}"`)
      }
    },
  )
  .help().argv
