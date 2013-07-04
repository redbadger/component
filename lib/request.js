
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , join = path.join
  , resolve = path.resolve
  , request = require('request');

/**
 * Returns request with relevant options to allow support for proxies and certificates.
 */
var ca_dir = process.env.COMPONENT_CA_DIR || process.env.component_ca_dir;
var proxy = process.env.HTTPS_PROXY || process.env.https_proxy;

var options = {};

if (proxy) {
  options.proxy = proxy;
}

if (ca_dir) {
    var certs = fs.readdirSync(ca_dir).filter(function (file) {
      var ext = path.extname(file || '').split('.');
      return ext[ext.length - 1] === 'pem';
    });

    options.ca = certs.map(function (file) {
      var absolutePath = resolve(ca_dir, file);
      return fs.readFileSync(absolutePath, 'utf-8');
    });
}

module.exports = request.defaults(options);

