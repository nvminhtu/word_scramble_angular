// App-level module

var ScrambleApp = angular.module('ScrambleApp', []);

angular.module('ScrambleApp')
.controller('GameCtrl', ['$scope', '$http', function ($scope, $http) {

	console.log("Game Controller");

	// keeping all strings in one place
	var __strings = {
		START: "Start typing to guess the unscrambled word",
		CONGRATS_MATCH: "Congratulations! You matched the word!",
		SCRAMBLE: "LMESRACB",
		YOUR_GUESS: "",
		TOO_LONG: "Whoops! You've entered more letters than are in the word!"
	};

	$scope.secret = '';
	$scope.scrambled = __strings['SCRAMBLE'];
	$scope.result = __strings['START'];
	$scope.candidate = __strings['YOUR_GUESS'];

	/**
	 * get and display newScrambledWord
	 */
	$scope.newScrambledWord = function () {
		console.log("running newScrambledWord");
		// clear any current scramble
		// fetch new word
		// scramble word
		// display scrambled word


	};

	// display initial scrambled word on load
	$scope.newScrambledWord();

	/**
	 * checkWordMatch, compare actual/secret word and candidate
	 * returns Boolean to indicate match or not
	 */
	$scope.checkWordMatch = function (secret, candidate) {
		console.log("running checkWordMatch");

	};

	// TODO switch back for testing
	// var matchedWord = false;
	var matchedWord = true;

	// keep checking for a match until you get a matched word
	while (!matchedWord && $scope.candidate.length <= $scope.scrambled.length) {

		// listen for key presses --> review specs

		// check updated candidate word

		matchedWord = $scope.checkWordMatch($scope.secret, $scope.candidate);
	}

	// Broken out of the word-entry loop
	if (matchedWord) {
		// congratulations
		$scope.result = __strings['CONGRATS_MATCH'];
	} else if ($scope.candidate.length > $scope.scrambled.length) {
		// you've typed too much
		$scope.result = __strings['TOO_LONG'];
	} else {
		console.log("This shouldn't happen");
	}

}]);