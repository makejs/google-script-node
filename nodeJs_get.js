var https = require("https");

var googleWebData = "google web app address";

function getRequest(host){
  var body = "";
  var req = https.get(host, function(res){
    if(res.statusCode > 300 && res.statusCode < 400 && res.headers.location){
      //we are being redirected to another website (standard for google).
      //follow redirect
      getRequest(res.headers.location);
      // console.log("host is "+ url.parse(res.headers.location).hostname);
      // console.log("path is "+ url.parse(res.headers.location).pathname);
    
    }else{
      res.setEncoding("utf8");
      res.on("data", function(data){
        body += data;
      });
      res.on("end",function(){
        body = JSON.parse(body);
        //console.log(body);
      });
    }
  });
  req.on('error', function(e){
    console.error(e);
  });
}

getRequest(googleWebData);//call the request
