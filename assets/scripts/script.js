$(document).ready(function () {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCvDoJ0PlzsJD8kN5XsEFFLjrbeuYOv0Cs",
		authDomain: "charlieapp-b60aa.firebaseapp.com",
		databaseURL: "https://charlieapp-b60aa.firebaseio.com",
		projectId: "charlieapp-b60aa",
		storageBucket: "charlieapp-b60aa.appspot.com",
		messagingSenderId: "906694568886"
	  };
	  firebase.initializeApp(config);


	// // Signs-in to app with pop-up
	// function signIn() {
	// 	var provider = new firebase.auth.GoogleAuthProvider();
	// 	firebase.auth().signInWithPopup(provider);
	// }

	// // Signs-out of app
	// function signOut() {
	// 	firebase.auth().signOut();
	// }

	// // Initiate firebase auth.
	// function initFirebaseAuth() {
	// 	// Listen to auth state changes.
	// 	firebase.auth().onAuthStateChanged(authStateObserver);
	// }

	// // Returns the signed-in user's profile Pic URL.
	// function getProfilePicUrl() {
	// 	return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
	// }

	// // Returns the signed-in user's display name.
	// function getUserName() {
	// 	return firebase.auth().currentUser.displayName;
	// }

	// // Returns true if a user is signed-in.
	// function isUserSignedIn() {
	// 	return !!firebase.auth().currentUser;
	// }

	var database = firebase.database();

	// COLLECTS AND ADDS TRAINS
	$("#add-train-btn").on("click", function (event) {
		event.preventDefault();

		// Collects user input
		var trainName = $("#train-name-input").val().trim();
		var trainDest = $("#dest-input").val().trim();
		var firstTrain = $("#firstTrain-input").val().trim();
		var trainFreq = $("#freq-input").val().trim();

		// Creates local object to hold data
		var newTrain = {
			name: trainName,
			destination: trainDest,
			start: firstTrain,
			frequency: trainFreq
		};

		// Uploads data to the database/ console.logs to double check
		database.ref().push(newTrain);
		// console.log(newTrain.name);
		// console.log(newTrain.destination);
		// console.log(newTrain.start);
		// console.log(newTrain.frequency);

		// Clears text boxes
		$("#train-name-input").val("");
		$("#dest-input").val("");
		$("#firstTrain-input").val("");
		$("#freq-input").val("");
	});

	//Firebase event to add trains to database and HTML 
	database.ref().on("child_added", function (childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());

		// Store information in variables
		var trainName = childSnapshot.val().name;
		var trainDest = childSnapshot.val().destination;
		var firstTrain = childSnapshot.val().start;
		var trainFreq = childSnapshot.val().frequency;

		// Variable for train frequency
		var trainFreq;

		// Time is to be entered on the entry form
		var firstTime = 0;

		// Use Moment to convert times
		var firstTimeConverted = moment(firstTime, "HH:MM").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:MM"));

		// Difference between times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % trainFreq;
		console.log(tRemainder);

		// Minutes until next
		var tMinutesTillTrain = trainFreq - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next train arriving
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:MM"));

		// Add train data to table
		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
			"</td><td>" + moment(nextTrain).format("HH:MM") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});