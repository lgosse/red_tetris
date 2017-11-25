import chai from "chai";
import chaiJestSnapshot from "chai-jest-snapshot";
import glob from "glob";

chai.use(chaiJestSnapshot);

before(function() {
  chaiJestSnapshot.resetSnapshotRegistry();
});

beforeEach(function() {
  chaiJestSnapshot.configureUsingMochaContext(this);
});

console.log(__dirname);
const files = glob.sync("src/server#<{(||)}>#*.js");
files.forEach(file => {
  console.log(file);
  require("../" + file);
});
