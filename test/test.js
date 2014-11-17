var Stdout = require('../index');
var fs = require('fs');

describe('console.log duplicate', function() {

  var singleton1 = null;
  var singleton2 = null;

  before(function(done) {
    fs.unlink('./file.txt', done);
  });

  singleton1 = Stdout.create({ writer: function(b) {
    fs.appendFile('./file.txt', b);
  } });
  singleton2 = Stdout.create();

  it('should be a singleton', function () {
    (singleton1 === singleton2).should.be.eql(true);
  });

  it('should write in a file the log', function (done) {
    console.log('aex%*;:!$');
    process.nextTick(function() {
      fs.readFile('./file.txt', { encoding:'utf8' }, function(err, data) {
        (data.indexOf('aex%*;:!$') !== -1).should.be.eql(true);
        done();
      });
    });
  });

});


