var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);

  video.size(cols, rows);
  // video.size(320,240);
  slider = createSlider(0, 255, 77)

  //music

  song = loadSound("file.mp3",loaded);
  amp = new p5.Amplitude();

}

function loaded() {
  button = createButton("play");
  button.position(19, 650);
  button.mousePressed(togglePlaying);
  console.log("loaded")
}



function draw() {
  background(185,206,235,60);
  video.loadPixels();
  loadPixels();


  for (var y = 0; y < video.height; y++) { //noprotect
    for (var x = 0; x < video.width; x++) {
      // var index = (x + y * video.width) * 4;
      var index = (video.width - x - 1 + y * video.width) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var threshold = slider.value();
      if (bright > threshold) {

        fill(r,g,b);

      } else {
        fill(100)
      }
      var vol = amp.getLevel();
      // console.log(vol)
      var wvol = map(bright, 0, 255, 0, vol) // dark pixel be small rec white be large rect

      // fill(bright);
      noStroke();
      ellipse(random(x * vScale-vScale,x * vScale), random(y * vScale-vScale,y * vScale), 100*wvol, 100*wvol);
      //how to create a water ripple effect
      ellipseMode(CENTER);

      //REVERSE  w-x-1=video.width


      // pixels[index + 0] = bright;
      // pixels[index + 1] = bright;
      // pixels[index + 2] = bright;
      // pixels[index + 3] = 255;
    }
  }

  // updatePixels();
}

function togglePlaying() {
  if (!song.isPlaying()) {

    song.play();
    song.setVolume(1);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }

}