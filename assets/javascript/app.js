function newTable(name, dest, firstTime, freq){


    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % freq;

var mins =  freq - tRemainder;
var next = moment().add(mins, "minutes")
next = next.format("HH:mm");

var newT = $("<tbody>");
var newTR = $("<tr>");
var newTd1 = $("<td>");
var newTd2 = $("<td>");
var newTd3 = $("<td>");
var newTd4 = $("<td>");
var newTd5 = $("<td>");
newTd1.text(name);
newTR.append(newTd1);
newTd2.text(dest);
newTR.append(newTd2);
newTd3.text(freq);

newTR.append(newTd3);
newTd4.text(next);
newTR.append(newTd4);
newTd5.text(mins);
newTR.append(newTd5);

newT.append(newTR);

$("#train-list").append(newT);

console.log(newT);


}



var config = {
    apiKey: "AIzaSyAhQmw-kDfhDzRYcwr7DMLAymy_jfHmFLs",
    authDomain: "test-5546b.firebaseapp.com",
    databaseURL: "https://test-5546b.firebaseio.com",
    projectId: "test-5546b",
    storageBucket: "test-5546b.appspot.com",
    messagingSenderId: "75139584717"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();


  dataRef.ref().on("child_added", function(childSnapshot) {
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var firstTime = childSnapshot.val().firstTime;
    var freq = childSnapshot.val().freq;
    
    newTable(name, dest, firstTime, freq);
    
    
    });

$("button").on("click", function(e){

    e.preventDefault();

var name = $("#train-name").val();
var dest = $("#destination").val();
var firstTime = $("#time").val();
var freq = $("#freq").val();


//newTable(name, dest, firstTime, freq);
dataRef.ref().push({

    name: name,
    dest: dest,
    firstTime: firstTime,
    freq: freq
    
  });


});