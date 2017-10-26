function doGet(e) {
  if(typeof e !== 'undefined')
  Console.log("get " + JSON.stringify(e.parameter));
  return ContentService.createTextOutput(JSON.stringify(e.parameter));
}

function doPost(e) {
  if(typeof e !== 'undefined')
    Console.log(e.postData.contents)
    Console.log("post data stringify "+JSON.stringify(e.postData.contents));
    Console.log("post query " + JSON.stringify(e.parameter));
    return ContentService.createTextOutput(JSON.stringify(e.parameter));
}

var SSID = "google_spreadsheet_key"
//create a sheet named Console for console logging
var Console = new Object;
Console.log = function(e){
  var sheet = SpreadsheetApp.openById(SSID).getSheetByName("Console");
  sheet.insertRowBefore(2);
  var data = [[new Date, e]];
  sheet.getRange(2,1,1,2).setValues(data);
}
