$(document).ready(function() {

//========================= Firebase info =========================//
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDrxdQC96PX7a22P1D-p9fQC-ZvU_u70II",
    authDomain: "train-schedule-c7eaa.firebaseapp.com",
    databaseURL: "https://train-schedule-c7eaa.firebaseio.com",
    projectId: "train-schedule-c7eaa",
    storageBucket: "train-schedule-c7eaa.appspot.com",
    messagingSenderId: "59501853184"
  };

  firebase.initializeApp(config);

  // This is used to reference the database.
  var database = firebase.database();

//========================= App Functions =========================//

// Empty array that contains the train data.
var trainInfo = [];
console.log(trainInfo);

// Initial table values.
function initialize() {
    var name = $('#train-name').val('');
    var destination = $('#destination').val('');
    var frequency = $('#frequency').val('');
    var nextArrival = $('#next-arrival').val('');
    var minutesArrival = $('#minutes-arrival').val('');
}

// Pushed out table data.
function tableData() {
    $('#table > tbody').empty();

    for (i = 0; i < trainInfo.length; i++) {
        $('#table > tbody').append(
            '<tr>' + '<td>' + trainInfo[i].name + '</td>' +
            '<td>' + trainInfo[i].destination + '</td>' +
            '<td>' + trainInfo[i].frequency + '</td>' +
            '<td>' + trainInfo[i].nextArrival + '</td>' +
            '<td>' + trainInfo[i].minutesArrival + '</td>' + '</tr>'
        );
    }
}

// Button click function. This will not reset the page when clicked.
$('button').on('click', function(event) {
    event.preventDefault();

    // Handles user-input.
    var nameIn = $('#train-in').val().trim();
    var destIn = $('#destination-in').val().trim();
    var nextIn = moment($('#first-train-in').val().trim(),"hh:mm").subtract(1, 'years').format('X');
    var freqIn = $('#frequency-in').val().trim();

    // Stores current time as reference.
    var currentTime = moment();
    console.log("Current Time is: " + moment(currentTime).format('hh:mm'));


    // Stores in an object.
    var newInfo = {
        trainName: name,
        destination: destination,
        nextTrain: nextIn,
        frequency: freqIn
    };

    // Pushes the results.
    database.ref().push(newInfo);
    console.log(newInfo);

    // Clear boxes
    initialize();

// Adds to firebase database.
database.ref().on('child_added', function(childSnapshot, prevChildKey) {
    database.push(childSnapshot.val());
    console.log(childSnapshot.val());
});
});

console.log(trainInfo);
});
