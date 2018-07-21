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

// Button click function. This will not reset the page when clicked.
$('button').on('click', function(event) {
    event.preventDefault();

    // Handles user-input.
    var trainName = $('#name').val().trim();
    var destination = $('#destination').val().trim();
    var freq = $('#frequency').val().trim();
    var nextIn = moment($('#first-train').val().trim(),"hh:mm").subtract(1, 'years').format('X');

    // Stores current time as reference.
    var currentTime = moment();
    console.log("Current Time is: " + moment(currentTime).format('hh:mm'));


    // Stores info in an object.
    var newInfo = {
        train: trainName,
        dest: destination,
        frequency: freq,
        arrivalTime: nextIn,
    };

    // Pushes the results.
    database.ref().push(newInfo);
    console.log(newInfo);

    // Clear boxes
    $('#name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');

    return false;
});

// Adds to firebase database.
database.ref().on('child_added', function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // Stores variables from the object.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().dest;
    var nextIn = childSnapshot.val().arrivalTime;
    var freq = childSnapshot.val().frequency;

    var trainTime = moment.unix(nextIn).format('hh:mm');
    // Outputs time difference.
    var difference = moment().diff(moment(trainTime), 'minutes');

    // Shows time apart.
    var remaining = difference % frequency;

    // Shows next arrival time.
    var nextArrival = moment().add(remaining, 'minutes').format('hh:mm');

    // Inputs new information to table.
    $('#train-table > tbody').append(
        '<tr>' + 
            '<td>' + trainName + '</td>' +
            '<td>' + destination + '</td>' +
            '<td>' + freq + '</td>' +
            '<td>' + nextArrival + '</td>' +
            '<td>' + difference + '<td>' +
        '</tr>');
});
});

