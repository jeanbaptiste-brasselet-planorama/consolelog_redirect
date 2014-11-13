var Stdout = require('../index');

var fs = require('fs');

describe('console.log redirect', function() {

  var singleton1 = '';
  var singleton2 = '';

  before(function() {
    singleton1 = Stdout.create({ wsstream: function(b) {
      fs.appendFile('./file.txt', b);
    } });
    singleton2 = Stdout.create();
  });

  it('should be a singleton', function () {
    (singleton1 === singleton2).should.be.eql(true);
  });

});


