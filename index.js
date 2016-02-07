var app = require('app')
  , compileFile = require('jade').compileFile
  , extend = require('lodash.assign')
  , path = require('path')
  , readFileSync = require('fs').readFileSync
  , mime = require('mime')

module.exports = function (jadeOptions, globalLocals) {
  var locals = {}

  app.on('ready', function () {
    var protocol = require('protocol')
    protocol.interceptBufferProtocol('file'
    , function (req, cb) {
        var reqPath = path.normalize(req.url.substr(7))
        if (path.extname(reqPath) === '.jade') {
          var fn = compileFile(reqPath, jadeOptions)
            , html = fn(extend({}, globalLocals, locals))
          cb({ mimeType: 'text/html', data: new Buffer(html) })
        } else {
          var file = readFileSync(reqPath)
          cb({ mimeType: mime.lookup(reqPath), data: file })
        }
        locals = {}
      }
    , function (err) {
        if (err) {
          console.error('Failed to register jade protocol')
        } else {
          console.log('Successfully registered jade protocol')
        }
      }
    )
  })

  function updateLocals (newLocals) {
    locals =  newLocals
  }

  return updateLocals
}