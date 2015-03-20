/**
 * Anagram game
 * Mixed letters to conform an anagram
 * Validate the word and count the correct answers in 60 secs.
 */
var app = angular.module("Anagram", []);

app.controller("AnagramController", ["$scope", "$timeout", function($scope, $timeout) {
	  $scope.score;
	  $scope.answer;
	  $scope.letters = [];
	  $scope.circleTimer;
	  var letterAnimation = 0;
	  var timerPromise;
	  
	  var words = ["VIOLET", "EGG", "BUTTER", "BERRY", "CRISPY", "YELLOW", "GREEN",
					  "BONUS", "MEXICO", "OPEN", "PAID", "GOOD", "TARGET", "MONEY", 
					  "PEACE", "LOVE", "TIME", "FRIEND", "CHASE", "FLOWER", "GLASS", "GREED",
					  "BOAT", "HUMAN", "VOGUE", "WIRE", "GIRL", "PHONE"];
					  
	  $scope.isLetterVisible = function() {
	  	return letterAnimation === 1;
	  }
	  
	  $scope.isLetterHiding = function() {
	  	return letterAnimation === 2;
	  }
	  
	  $scope.isCorrectLetter = function() {
	  	return letterAnimation === 3;
	  }
	  
	  $scope.validateWord = function() {
		if($scope.circleTimer.getTime() > 0) {
			if ($scope.answer.toUpperCase() === $scope.correctWord) {
		 		$scope.score += 1;
		 		letterAnimation = 3;
		 		timerPromise = $timeout($scope.displayWord, 1000);
			 } 
		} else {
			alert("Timeout!");
		}
	}
	

	$scope.nextWord = function() {
		$scope.answer = ' ';
		letterAnimation = 2;
		timerPromise = $timeout($scope.displayWord, 1000);
	}
	
	
	$scope.displayWord = function() {
		$scope.answer = '';
		var wordIndex = Math.floor(Math.random() * words.length);
		$scope.correctWord = words[wordIndex];
		$scope.letters = $scope.correctWord.split('');
		$scope.getRandomIndexes();
		timerPromise = $timeout(function() { letterAnimation = 1; }, 100);
	}
	
		$scope.getRandomIndexes = function() {
		var randomIndex;
		var size = $scope.letters.length;
		var temp;
		while (size > 0) {
			randomIndex = Math.floor(Math.random() * size--);
			temp = $scope.letters[size];
			$scope.letters[size] = $scope.letters[randomIndex];
			$scope.letters[randomIndex] = temp;
		}
	}
	 
	$scope.init = function() {
	  	$scope.circleTimer = $(".countdown").TimeCircles(); 
	  	$scope.score = 0;
	  	$scope.answer = '';
	  	$scope.displayWord();
	}();

}]);

app.directive('focus', function() {
  return {
    restrict: 'A',
    scope: { focus: '=' },
    link: function(scope, elem) {
      scope.$watch('focus', function(focus) {
        if (focus)
          elem[0].focus();
      });
    }
  };
});
	
