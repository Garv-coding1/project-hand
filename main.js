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
    synth.speak(utter_this);
}