Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ml5 version = " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kweLOc-Ve/model.json", modelLoaded);

function modelLoaded() {
    console.log("The model is loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speech_data = "The hand gesture is" + prediction;
    var utter_this = new SpeechSynthesisUtterance(speech_data);
    utter_this.rate = 0.5;
    synth.speak(utter_this);
}

function check_hGesture(){
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

function getResult(error, results){
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("gesture_result_name").innerHTML = results[0].label;
        if (results[0].label == "Victory") {
            document.getElementById("gesture_icon").innerHTML = "✌";
        }
        if (results[0].label == "Wait") {
            document.getElementById("gesture_icon").innerHTML = "🖐";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("gesture_icon").innerHTML = "👌";
        }
        if (results[0].label == "Bad") {
            document.getElementById("gesture_icon").innerHTML = "👎";
        }
        if (results[0].label == "Good") {
            document.getElementById("gesture_icon").innerHTML = "👍";
        }
        if (results[0].label == "Namaste") {
            document.getElementById("gesture_icon").innerHTML = "🙏";
        }
        if (results[0].label == "Good Luck") {
            document.getElementById("gesture_icon").innerHTML = "🤞";
        }
        prediction = results[0].label;
        speak();
    }
}