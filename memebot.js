// Bot ID from GroupMe goes here.
var botId = "";
// Url for spreadsheet where data is logged.
var spreadsheetUrl = "";

function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function sendImage(textS, imageUrl){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text": "' + textS + '","attachments": [{"type": "image","url": "' + imageUrl + '"}]' + '}'});
}


var botCommands = ["!help","!memebot","!meme","!leader", "!myrating","!best","!worst", "!suggestions"];
var ss = SpreadsheetApp.openByUrl(spreadsheetUrl);
SpreadsheetApp.setActiveSpreadsheet(ss);
var sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[0]);
var suggestions = [];

function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  var name = post.name;
  var rating = 0;
  
  if(text.toLowerCase().substring(0, 8) == "!suggest"){
    suggest(name,text.substring(9));
  }
  
  switch(text.toLowerCase()){
    case botCommands[0]:
      sendText("List of all commands: \\n \\n !help - returns list of bot commands \\n \\n !memebot - memebot will say hello \\n \\n !meme - returns a random meme \\n \\n !leader - returns a list of the top three posters \\n \\n !myrating - returns your current meme status & rating \\n \\n !best - returns the best meme that has been posted \\n \\n !worst - returns the worst meme that has been posted \\n \\n !suggestions - write your suggestion directly after the command to suggest features to memebot. (not available in this version)");
      break;
    case botCommands[1]:
      sendText("Hi!");
      break;
    case botCommands[2]:
      meme();
      break;
    case botCommands[3]:
      leaderboard();
      break;
    case botCommands[4]:
      myrating(name);
      break;
    case botCommands[5]:
      bestMeme();
      break;
    case botCommands[6]:
      worstMeme();
      break;
    case botCommands[7]:
      //suggest();
      sendText("This function is not available in this version");
      break;
  }
  
  if(post.attachments[0].type == "image" && post.name != "MemeBot"){
    rating =  Math.random() * 100;
    sendText("Rating: " + Math.round(rating) + "/100");
    telelog(post.name, post.text, post.attachments[0].url, rating);
    
  }
}

function telelog(name, text, image, rats){
  var d = new Date();
  var n = d.toLocaleString();
  var img = '=image("' + image + '")';
  sheet.appendRow([n,name,text,img,rats,image])
}

function meme(){
 var memePos = ['',''];
 var imagine = memePos[Math.round(Math.random() * memePos.length)];
 sendImage("MEMES@MEME.COM" ,imagine);
}

function leaderboard(){
  var topThree = sheet.getRange("K1:K3").getValues();
  sendText("1. " + topThree[0] + "\\n2. " + topThree[1] + "\\n3. " + topThree[2]); 
}

function myrating(person){
  var rateArray = sheet.getRange('I1:I8').getValues();
  console.log(rateArray);
  var personalRate = rateArray[0];
  //var personArray = sheet.getRange('H1:H8').getValues();
  var personArray = ['Person 1','Person 2','Person 3','Person 4','Person 5','Person 6','Person 7','Person 8'];
  switch(person){
    case personArray[0]:
      personalRate = rateArray[0];
      break;
    case personArray[1]:
      personalRate = rateArray[1];
      break;
    case personArray[2]:
      personalRate = rateArray[2];
      break;
    case personArray[3]:
      personalRate = rateArray[3];
      break;
    case personArray[4]:
      personalRate = rateArray[4];
      break;
    case personArray[5]:
      personalRate = rateArray[5];
      break;
    case personArray[6]:
      personalRate = rateArray[6];
      break;
    case personArray[7]:
      personalRate = rateArray[7];
      break;
  }
  sendText("Your rating is: " + Math.round(personalRate[0]) + "/100");
}

function bestMeme(){
  var bestMemeText = "The best meme was posted by " + sheet.getRange("O1").getValue() + ", a cool boye.";
  console.log(bestMemeText);
  var bestMemeUrl = sheet.getRange("R1").getValue();
  console.log(bestMemeUrl);
  sendImage(bestMemeText,bestMemeUrl);
}

function worstMeme(){
  var worstMemeText = "The worst meme was posted by " + sheet.getRange("O2").getValue() + ", who is bad.";
  console.log(worstMemeText);
  var worstMemeUrl = sheet.getRange("R2").getValue();
  console.log(worstMemeUrl);
  sendImage(worstMemeText,worstMemeUrl);
}

function suggest(textas,nameas){
  sheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[2]);
  var red = new Date();
  var black = red.toLocaleString();
  sheet.appendRow([black,textas,nameas]);
}


