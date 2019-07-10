/**
 * this file used to watch blogs dir and gen router.ts for blogs
 * you can start it by `yarn server` or `pm2 start examples/app.ts`
 * this is node server
 */

const chokidar = require('chokidar')
const writeFile = require('write')
const slugify = require('transliteration').slugify
const path = require('path')

const baseUrl = path.resolve(__dirname, '../examples/blogs/')
const watcher = chokidar.watch(baseUrl)

const maps = {}

function getDirByPath(filePath) {
  const dirs = filePath.split('/') || []
  let dir = ''

  if (dirs.length >= 2) {
    dir = dirs[dirs.length - 2]
  }

  return dir
}

function writeConfig() {
  writeFile(path.resolve(__dirname, '../examples/routes.json'), JSON.stringify(maps))
    .then(() => {
      console.log('route updated...')
    })
}

watcher
  .on('add', function (path) {
    const filePath = path.substr(baseUrl.length + 1)
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1)
    const dir = getDirByPath(filePath)

    if (dir in maps && maps[dir].indexOf(filePath) === -1) {
      const name = fileName.substring(0, fileName.lastIndexOf('.'))
      maps[dir].push({
        name,
        path: slugify(name),
        filePath
      })
    }

    writeConfig()
  })
  .on('unlink', function(path) {
    const filePath = path.substr(baseUrl.length + 1)
    const dir = getDirByPath(filePath)

    if (maps && maps[dir]) {
      const index = maps[dir].findIndex(item => item.filePath === filePath)
      maps[dir].splice(index, 1)
    }

    writeConfig()
  })
  .on('addDir', function(path) {
    const dir = path.substr(baseUrl.length + 1)
    maps[dir] = []

    writeConfig()
  })
  .on('unlinkDir', function(path) {
    const dir = path.substr(baseUrl.length + 1)
    delete maps[dir]

    writeConfig()
  })
