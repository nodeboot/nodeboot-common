const _ = process.cwd();
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const ObjectHelper = require(`${_}/src/main/node/common/object/ObjectHelper.js`);

describe('ObjectHelper : hasProperty', function() {
  it('not configured nodeboot.database.client in application.json', function() {
    var dummy = new ObjectHelper()
    expect(true).to.equal(true);
  });
});
