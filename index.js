var NOOT = require('noot')('core-object');
var Through2 = require('through2');

var Stdout = NOOT.CoreObject.extend({
  writableStream: '',
  _writableStream:'',
  stdout: '',
  duplex: '',

  init: function() {
    this.setWritableStream(this.writableStream);
  },

  setWritableStream: function(writableStream) {

    this._writableStream = new Through2(function(chunk, enc, cb) {
      writableStream(chunk.toString());
      cb();
    });
  },

  redirect: function () {

    this.duplex = new Through2();

    console._stdout = this.duplex;
    this.duplex.pipe(process.stdout);
    this.duplex.pipe(this._writableStream);

  },

  destroy: function () {
    console._stdout = process.stdout;
    this._writableStream.end();
    this.duplex.end();
  }

}, {
  instance: null,

  create: function() {
    if (this.instance !== null)
      return this.instance;

    this.instance = this._super.apply(this, arguments);

    return this.instance;
  }
});

module.exports = Stdout;