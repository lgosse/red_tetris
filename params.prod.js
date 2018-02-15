const params = {
  server: {
    host: 'ec2-52-47-162-238.eu-west-3.compute.amazonaws.com',
    port: 3004,
    get url() {
      return 'http://' + this.host + ':' + this.port;
    },
    db: {
      host: 'database'
    }
  }
};

module.exports = params;
