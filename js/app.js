// App-level module

var ScrambleApp = angular.module('ScrambleApp', []);

angular.module('ScrambleApp')
.controller('GameCtrl', ['$scope', '$http', function ($scope, $http) {

	// keeping all strings in one place
	var __strings = {
		START: "Start typing to guess the unscrambled word",
		CONTINUE: "See if you can unscramble the word",
		CONGRATS_MATCH: "Congratulations! You matched the word!",
		SCRAMBLE_START: "",
		YOUR_GUESS: "",
		TOO_LONG: "Whoops! You've entered more letters than are in the word!",
		INVALID_INPUT: "Please only use letters from the alphabet, hyphens (-), and apostrophes (')"
	};

	// initial values
	var secret = '';
	$scope.scrambled = __strings['SCRAMBLE_START'];
	$scope.result = __strings['START'];
	$scope.candidate = __strings['YOUR_GUESS'];

	/**
	 * get newScrambledWord from wordnik api
	 * return random word as a string
	 */

	$scope.newScrambledWord = function () {

		// clear old words if necessary
		secret = '';
		$scope.scrambled = '';
		$scope.candidate = '';
		// need to replace with two-way data binding 
		document.getElementById("display-guess").value = '';

		// assemble url for ajax call
		var maxWordLength = 10;
		var randomWordUrl = "http://api.wordnik.com/v4/words.json/randomWord?" +
			"hasDictionaryDef=true" + 
			"&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,prefix,suffix,family-name,given-name" + 
			"&minCorpusCount=10000" +
			"&maxCorpusCount=-1" +
			"&minDictionaryCount=1" +
			"&maxDictionaryCount=-1" +
			"&minLength=5" +
			"&maxLength=" + maxWordLength +
			"&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

		// get new random word
		$http({
			method: 'GET',
			url: randomWordUrl,
			headers: {
				'Content-Type': undefined
			}
		}).then(function success (response) {
		
			secret = response.data.word;
		
			if (secret) {
				// scramble word and display
				$scope.scrambled = $scope.scrambleWord(secret);
			}

		}, function error(response){
			console.log("There has been a problem problem with $http: ", response);
		});
	};

	/**
	 * scrambleWord randomly re-order letters
	 */

	$scope.scrambleWord = function (origWord) {

		var scrambledWord =  [];
		var randIndex = 0;
		var letterToSwap = '';
		var wordLength = origWord.length;
		var origWordArray = origWord.split('');

		for (var i = 0; i < wordLength; i++) {
			// get a random index to move
			randIndex = Math.floor(Math.random() * origWordArray.length);
			// remove letter at that index from array
			letterToSwap = origWordArray.splice(randIndex, 1);
			// add random letter to scrambledWord
			scrambledWord.push(letterToSwap);
		}
		return scrambledWord.join('');
	};

	/**
	 * checkNewInput, compare actual/secret word and candidate
	 * returns Boolean to indicate match or not
	 * called with every keyUp in input field
	 */
	$scope.checkNewInput = function ($event) {

		// to alert the user if they use any non-alphabet, - or ' chars
		var textRegEx = /^[A-Za-z\-\']+$/;

		// get latest guess (inelegant method, need to do two-way data binding)
		$scope.candidate = document.getElementById("display-guess").value;

		// check candidate word for length, match etc.
		if ($scope.candidate.toUpperCase() == secret.toUpperCase()) {
			// check for matching of user's candidate word and secret word
			$scope.result = __strings['CONGRATS_MATCH'];

		} else if ($scope.candidate.length > secret.length) {
			// check to see if the guess is longer than the original word
			$scope.result = __strings['TOO_LONG'];

		} else if (!$scope.candidate.match(textRegEx)) {
			// bad input, let the user know, but don't really do anything
			$scope.result = __strings['INVALID_INPUT'];
		} else {
			// encouragement to keep trying
			$scope.result = __strings['CONTINUE'];
		}
	};

	// display initial scrambled word on load or 'get new word'
	$scope.newScrambledWord();

}]);