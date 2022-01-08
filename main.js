
objects = [];
status1 = "";
item = "";

function preload(){
}

function setup() {
  canvas = createCanvas(480, 380);
  video=createCapture(VIDEO)
  canvas.center();
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "status : Detecting Objects";
  item=document.getElementById("input1").value

}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 480, 380);
      if(status1 != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) { 
          if(item == objects[i].label){
          document.getElementById("status").innerHTML = "status : Objects Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
 
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);//text(text,x,y)
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);//rect(x,y,w,h)
          }
        }
      }
}
