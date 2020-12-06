var video;

var vScale = 9;

let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyelX2 = 0;
let eyelY2 = 0;
let sizex = 1280;
let sizey = 960;

function preload() {

  // video.hide();
}

function setup() {
  createCanvas(sizex, sizey);
  video = createCapture(VIDEO);
  pixelDensity(1);
  video.size(width / vScale, height / vScale);
  // video.hide();


  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let eX2 = poses[0].pose.keypoints[2].position.x;
    let eY2 = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
    eyelX2 = lerp(eyelX2, eX2, 0.5);
    eyelY2 = lerp(eyelY2, eY2, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  background(51);
  let d = dist(noseX, noseY, eyelX, eyelY);
  let d2 = dist(noseX, noseY, eyelX2, eyelY2);
  let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
  let latLength = int(dist(eyelX, eyelY, width, eyelY));
  line(eyelX, eyelY, image.width, eyelY)
  // console.log(latLength)
  // fill(255, 0, 0);
  ellipse(eyelX, eyelY, d / 2);
  ellipse(eyelX2, eyelY2, d2 / 2);

  if (latLength < 213) {
    fill(0, 255, 0)
  }

  if (latLength > 213) {
    fill(255, 0, 0)
  }

  if (latLength > 426) {
    fill(0, 0, 255)
  }
pixelization();
}
// push();
// scale(9)
// image(video, 0, 0);
// scale(9)
// pop();
// video.loadPixels();
// for (var y = 0; y < video.height; y++) {
//   for (var x = 0; x < video.width; x++) {
//     var index = (video.width - x + 1 + (y * video.width)) * 4;
//     var r = video.pixels[index + 0];
//     var g = video.pixels[index + 1];
//     var b = video.pixels[index + 2];
//     var bright = (r + g + b) / 3;
//     var w = map(bright, 0, 255, 0, vScale);
//     noStroke();
//     fill(255);
//     rectMode(CENTER);
//     rect(x * vScale, y * vScale, w, w);

//   }
// }
// push();
// sidetoside();





// function sidetoside() {
// //   video = createCapture(VIDEO)
// //   push();
// //   scale(vScale)
//   // image(video,0,0);
//   // pop();

//   let d = dist(noseX, noseY, eyelX, eyelY);
//   let d2 = dist(noseX, noseY, eyelX2, eyelY2);
//   let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
//   let latLength = int(dist(eyelX, eyelY, width, eyelY));
//   line(eyelX, eyelY, image.width, eyelY)
//   // console.log(latLength)
//   // fill(255, 0, 0);
//   ellipse(eyelX, eyelY, d / 2);
//   ellipse(eyelX2, eyelY2, d2 / 2);

//   if (latLength < 213) {
//     fill(0, 255, 0)
//   }

//   if (latLength > 213) {
//     fill(255, 0, 0)
//   }

//   if (latLength > 426) {
//     fill(0, 0, 255)
//   }

// }

function pixelization() {
  push();
  scale(vScale);
  tint(255, 50)
  image(video, 0, 0);
  pop();

  // video.size(width / vScale, height / vScale);
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      noStroke();
      fill(0);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);

    }
  }
  video.hide()
}
