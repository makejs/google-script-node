var https = require("https");
var url = require("url");

var googleWebApp = "google web app address";
var reqBody = JSON.stringify({"key":"value"});

function postData(){
  var options = {
    host: url.parse(googleWebApp).hostname,
    path: url.parse(googleWebApp).pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      "Content-Length": Buffer.byteLength(reqBody)
    }
  };
  var req = https.request(options, function (res) {
      //console.log("status code:", res.statusCode);
      //console.log("headers:", res.headers);
      var responseString = "";
      res.on("data", function (data) {
          responseString += data;
          // save all the data from response
      });
      res.on("end", function () {
          console.log(responseString); 
          // print to console when response ends
      });
  });
  req.on('error', function (e){
    console.error("problem with request: "+e.message);
  });
  req.write(reqBody);
  req.end();
}
postData();
