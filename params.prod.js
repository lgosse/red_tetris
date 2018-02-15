const params = {
  server: {
    host: process.env.RED_TETRIS_SERVER_HOST || '0.0.0.0',
    port: process.env.RED_TETRIS_SERVER_PORT || 3004,
    get url() {
      return `http://${this.host}:${this.port}`;
    }
  },
  front: {
    host: 'ec2-52-47-162-238.eu-west-3.compute.amazonaws.com',
    port: 80,
    get url() {
      return `http://${this.host}${this.port === 80 ? '' : ':' + this.port}`;
    }
  },
  db: {
    host: process.env.RED_TETRIS_DB_HOST || '192.168.99.100'
  }
};

module.exports = params;
