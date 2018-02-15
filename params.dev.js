const params = {
  server: {
    host: '0.0.0.0',
    port: 3004,
    get url() {
      return 'http://' + this.host + ':' + this.port;
    }
  },
  db: {
    host: '192.168.99.100'
  }
};

module.exports = params;
