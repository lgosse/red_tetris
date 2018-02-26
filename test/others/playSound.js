import { createPlayer } from '../../src/media/playSound';

describe('Media', () => {
  describe('createPlayer', () => {
    it('should create a function', () => {
      (typeof createPlayer(true)).should.equal('function');
    });
  });
  describe('player', () => {
    it('should play the sound passed in parameter', done => {
      global.Audio = class {
        constructor(file) {
          this.file = file;
        }

        play() {
          this.file.should.equal('test');
          done();

          return {
            catch() {}
          };
        }
      };

      createPlayer(true)('test');
    });
    it('should do nothing if createPlayer s music parameter is false', () => {
      global.Audio = class {
        constructor(file) {
          this.file = file;
        }

        play() {
          throw new Error('Play method should not be called.');

          return {
            catch() {}
          };
        }
      };

      createPlayer(false)('test');
    });
  });
});
