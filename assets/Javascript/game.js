

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCeOb0aoUcHOJrb8oMa3l1emvpdr9-Fu9U",
        authDomain: "train-schedule-e93ea.firebaseapp.com",
        databaseURL: "https://train-schedule-e93ea.firebaseio.com",
        projectId: "train-schedule-e93ea",
        storageBucket: "train-schedule-e93ea.appspot.com",
        messagingSenderId: "718866285494"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    var $table = $('table');
    var mydata = [{
        TrainName: '1',
        Destination: 'Item 1',
        Frequency: '1',
        MinutesAway: '00:00',
    }];
    $("button").click(function () {
        var TrainName = $("#name-input").val().trim();
        var Destination = $("#destination-input").val().trim();
        var Frequency = $("#frequency-input").val().trim();
        var MinutesAway = $("#time-input").val().trim();
        var data = {
            name: TrainName,
            destination: Destination,
            frequency: Frequency,
            time: MinutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        var currentTime = moment();
        var frequencyTime = response.val().frequency;
        var firstTimeConverted = moment(response.val().firstTrain, "hh:mm").subtract(1, "years");        
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var reminder = diffTime % frequencyTime
        // Minutes Away
        var minutesAway = frequencyTime - reminder;
        // Next train arrival
        var arrival = moment().add(minutesAway, "minutes").format("HH:mm");

        database.ref().push(data);

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#time-input").val("");



    });
    database.ref().on("child_added",
        function (childSnapshot, prevChilKey) {
            console.log(childSnapshot.val())
            var TrainName = childSnapshot.val().name;
            var Destination = childSnapshot.val().destination;
            var Frequency = childSnapshot.val().frequency;
            // var Arrival = childSnapshot.val().;
            var MinutesAway = childSnapshot.val().time;


            $(".table").append("<tr><td>" + TrainName + "</td><td>" + Destination + "</td><td>" + 
        Frequency + "</td></tr>");
        });
