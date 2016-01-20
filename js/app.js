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

		var randomWordUrl = "http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,prefix,suffix,family-name,given-name&minCorpusCount=1000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

		// fetch new word
		$http({
			method: 'GET',
			url: randomWordUrl,
			headers: {
				'Content-Type': undefined
			}
		}).then(function successCallback (response) {
			console.log("success response.data.word", response.data.word);
			$scope.secret = response.data.word;
			console.log("$scope.secret", $scope.secret);

			}, function errorCallback(response){
				console.log("problem with $http.get: ", response);
			});

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