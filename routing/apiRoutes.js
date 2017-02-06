var express = require('express')
var router = express.Router()
var path = require("path");
var fs = require('fs');
var data = require("../data/friends.json");
var closestFriendIndex

router.post("/api/new", function(req, res) {
  var newDinoFriend = req.body;
  //Writes new firend object to end of json file.
    data.friends[data.friends.length] = newDinoFriend;
    fs.writeFile('./data/friends.json', JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }

      findFriend(newDinoFriend);
       res.json(data.friends[closestFriendIndex]);
       res.end(0);
    });
   
});

router.get('/api', function(req, res) {
  res.sendFile(path.join(__dirname, "../data/friends.json"));
})

function findFriend(userScore){
	var closestScore = 9999999999
	var difference

	for (var i = 0; i < data.friends.length - 1; i++) {
		difference = 0

		 for (var j = 0; j < data.friends[0].scores.length; j++) {
		 difference += Math.abs(userScore.scores[j] - data.friends[i].scores[j])
		 } 
		 
		 if(difference < closestScore){
		 	closestScore = difference
		 	closestFriendIndex = i
		 }
	}
	// res.json(data.friends[closestFriendIndex]);
}

module.exports = router

