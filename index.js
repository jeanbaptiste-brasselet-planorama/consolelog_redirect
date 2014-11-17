/**
 * Dependencies
 */
var NOOT = require('noot')('object');
var Through2 = require('through2');

/***********************************************************************************************************************
 *  Stdout
 ***********************************************************************************************************************
 *
 * @description Permit to write logs in a stream through console.log
 *
 *
 **********************************************************************************************************************/
var Stdout = NOOT.Object.extend({

  writer: null,
  _writableStream: null,
  _duplex: null,

  /**
   * Constructor
   */
  init: function() {
    this.setWritableStream(this.writer);
    this.duplicate();
  },

  /**
   * Define the writableStream
   *
   * @param {function} writer
   */

  setWritableStream: function(writer) {
    this._writableStream = new Through2(function(chunk, enc, cb) {
      writer(chunk.toString('utf8'));
      return cb();
    });
  },

  /**
   * Logic to duplicate the log in another stream
   */
  duplicate: function () {
    this._duplex = new Through2();
    console._stdout = this._duplex;
    this._duplex.pipe(process.stdout);
    this._duplex.pipe(this._writableStream);
  }

}, {

  instance: null,

  /**
   * Override method create to allow Singleton pattern
   *
   * @returns {Object}
   */
  create: function() {
    if (this.instance !== null)
      return this.instance;

    this.instance = this._super.apply(this, arguments);

    return this.instance;
  }

});

/**
 * @module
 */
module.exports = Stdout;