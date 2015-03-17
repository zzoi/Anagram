/**
 * Anagram game
 * Mixed letters to conform an anagram
 * Validate the word and count the correct answers in 60 secs.
 */
var app = angular.module("Anagram", []);

app.controller("AnagramController", function($scope, $filter, $timeout) {
	  $scope.score = 0;
	  $scope.answer = '';
	  $scope.letter = '';
	  $scope.circleTimer = $(".countdown").TimeCircles(); 
	  $scope.inputAnswer = $("input[name=answer]");
	  $scope.inputSend = $("input[name=send]");
	  $scope.inputNext = $("input[name=next]");
	  
	  $scope.inputAnswer.focus();
	  $scope.inputAnswer.keypress(function(e) {
	  	if (e.keyCode === 13) {
	  		$scope.inputSend.click();
	  	}
	  });
	  
	  $scope.correctWord = "LOVE";
	  var words = ["VIOLET", "EGG", "BUTTER", "BERRY", "CRISPY", 
					  "BONUS", "MEXICO", "OPEN", "PAID", "GOOD", "TARGET", "MONEY", 
					  "PEACE", "LOVE", "TIME", "FRIEND", "LIVE", "FLOWER", "CAT", "GREED",
					  "BOAT", "HUMAN", "VOGUE", "WIRE", "GIRL", "BOY"];

	
	  $scope.validateWord = function() {
		if($scope.circleTimer.getTime() > 0) {
			var answer = $filter('uppercase')($scope.answer);
			if (answer === $scope.correctWord) {
		 		$scope.score += 1;
		 		$scope.nextWord();
			 } 
		} else {
			alert("Timeout!");
		}
		
		
	}
	
	$scope.nextWord = function() {
		$scope.greenFlag();
		$timeout($scope.displayWord, 500);
		
	}
	
	$scope.greenFlag = function() {
		$(".letter").css("background-color","#449D44");
    	$(".letter").slideToggle("1500");
	}
	
	$scope.displayWord = function() {
		$timeout.cancel($scope.displayWord);
		$scope.inputAnswer.val('');
		$scope.inputAnswer.focus();
		var wordIndex = Math.floor(Math.random() * words.length);
		$scope.correctWord = words[wordIndex];
		var anagram = '';
		var canvas = $("#canvas").empty();
		var randomIndexes = $scope.getRandomIndexes();
		for (var i = 0; i < $scope.correctWord.length; i++) {
			$scope.letter = document.createElement('div');
			anagram = $scope.correctWord.charAt(randomIndexes[i]);
			$scope.letter.innerHTML = anagram;
			$scope.letter.className = "letter fadeIn";
			canvas.append($scope.letter);
		}
	}
	
	$scope.getRandomIndexes = function() {
		var result = [];
		var nonExist = true;
		while (result.length < $scope.correctWord.length) {
			nonExist = true;
			var index = Math.floor(Math.random() * $scope.correctWord.length);
			for (var i = 0; i < result.length; i++) {
				if (result[i] === index) {
					nonExist = false;
					break;
				}
			}
			if (nonExist) {
				result.push(index);
			} 
		}
		
		return result;
	}

});


	
