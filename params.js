const params = {
  server: {
    host: process.env.RED_TETRIS_SERVER_HOST || '0.0.0.0',
    port: process.env.RED_TETRIS_SERVER_PORT || 3004,
    get url() {
      return `http://${this.host}:${this.port}`;
    }
  },
  front: {
    host: process.env.RED_TETRIS_FRONT_HOST || 'localhost',
    port: process.env.RED_TETRIS_FRONT_PORT || 3004,
    get url() {
      return `http://${this.host}${this.port === 80 ? '' : ':' + this.port}`;
    }
  },
  db: {
    host: process.env.RED_TETRIS_DB_HOST || '192.168.99.100'
  }
};

module.exports = params;
