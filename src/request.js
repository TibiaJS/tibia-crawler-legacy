var request = require('request');
var url = "https://secure.tibia.com/";

var Request = function(method, path, data, sess, callback){
  var options = {
    url: url + path,
    form: data,
    method: method.toUpperCase(),
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  };

  if(sess) {
    options.jar = request.jar();
  }

  return request(options, callback);
};

module.exports = {

  request: function(method, path, data, callback) {
    return new Request(method, path, data, false, callback);
  },

  requestSess: function(method, path, data, callback) {
    return new Request(method, path, data, true, callback);
  }

};
