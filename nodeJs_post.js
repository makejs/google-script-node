var https = require("https");
var url = require("url");

var googleWebApp = "google web app address";
var reqBody = JSON.stringify({"key":"value"});

function postData(address){
  var options = {
    hostname: url.parse(address).hostname,
    path: url.parse(address).pathname,
    //port: 443, //https defaults to 443
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(reqBody)
    }
  };
  var req = https.request(options, function (res) {
    //console.log("status code:", res.statusCode);
    //console.log("headers:", res.headers);
    if(res.statusCode == 302){
      //status code 302 indicates a redirect
      postData(res.headers.location);//handle redirect
    }else{
      var responseString = "";
      res.on("data", function (data) {
          responseString += data;
          // save all the data from response
      });
      res.on("end", function () {
          console.log(responseString); 
          // print to console when response ends
      });
    }
  });
  req.on('error', function (e){
    console.error("problem with request:",e.message);
  });
  req.write(reqBody);
  req.end();
}
postData(googleWebApp);
