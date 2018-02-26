import chai from 'chai';
import chaiJestSnapshot from 'chai-jest-snapshot';
import glob from 'glob';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(chaiJestSnapshot);

before(function() {
  Enzyme.configure({ adapter: new Adapter() });
  chaiJestSnapshot.resetSnapshotRegistry();
});

beforeEach(function() {
  chaiJestSnapshot.configureUsingMochaContext(this);
});

console.log(__dirname);
const files = glob.sync('src/server#<{(||)}>#*.js');
files.forEach(file => {
  console.log(file);
  require('../' + file);
});
