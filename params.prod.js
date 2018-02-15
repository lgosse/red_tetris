const params = {
  server: {
    host: 'ec2-52-47-162-238.eu-west-3.compute.amazonaws.com',
    port: 80,
    get url() {
      return 'https://' + this.host + ':' + this.port;
    }
  }
};

module.exports = params;
