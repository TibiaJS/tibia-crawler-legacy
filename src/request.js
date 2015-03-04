var request = require('request');
var url = "https://secure.tibia.com/"

var Request = function(method, path, data, callback){
  var cookiejar = request.jar();
  var options = {
    url: url + path,
    form: data,
    method: method.toUpperCase(),
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    jar: cookiejar
  };

  return request(options, callback);
}

module.exports = Request;
