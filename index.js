
/**
 * Created by jean-baptiste on 07/11/14.
 */

var NOOT = require('noot')('core-object');

var Through2 = require('through2');

var Stdout = NOOT.CoreObject.extend({
  wsstream: '',
  test:'',
  stdout: '',
  duplex: '',

  init: function() {
    this.setwwstream(this.wsstream);
  },

  setwwstream: function(wsstream) {
    /*var MyStream = function (options) {
     Writable.call(this, options);
     }

     util.inherits(MyStream, Writable);

     MyStream.prototype._write = function (chunk, enc, cb) {
     wsstream(chunk.toString('utf8'));
     cb();
     };*/

    //this.test = new MyStream();

    this.test = new Through2(function(chunk, enc, cb) {
      wsstream(chunk.toString());
      cb();
    });
    //this.test = new through2(wsstream);
  },

  redirect: function () {

    this.duplex = new Through2();

    console._stdout = this.duplex;
    this.duplex.pipe(process.stdout);
    this.duplex.pipe(this.test);

  },

  unredirect: function () {
    console._stdout = process.stdout;
    this.test.end();
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