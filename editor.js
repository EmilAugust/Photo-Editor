var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
const url = document.getElementById('url');
const loadURL = document.querySelector('.loadURL');

var img;
var ratio;

var overlay = document.getElementById("overlay");

canvas.width = 500;

var uploaded;

var closeMenu = document.querySelectorAll(".closeMenu");

closeMenu.forEach(function(cm){
  cm.addEventListener('click', function() {
    overlay.style = "display: none;";
  });
});

function handleImage(e){
  var reader = new FileReader();
  reader.onload = function(event){
    img = new Image();
    img.onload = function(){
      ratio = this.height / this.width;
      canvas.height = canvas.width * ratio;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img,0,0,canvas.width, canvas.height);
    }
    overlay.style = "display: none;";
    uploaded = "image";
    img.src = event.target.result;
    window.onbeforeunload = function() {
      return true;
    };
  }
  reader.readAsDataURL(e.target.files[0]);
}

const getImage = () => {
  img = new Image();
  img.crossOrigin = "anonymous";  // This enables CORS
  img.src = url.value;
  img.onload = function () {
    var ratio = this.height / this.width;
    canvas.height = canvas.width * ratio;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img,0,0,canvas.width, canvas.height);
    overlay.style = "display: none;";
    uploaded = "image";
  };
};

canvasWidthInput = document.getElementById("canvasWidth");
canvasHeightInput = document.getElementById("canvasHeight");
loadBlank = document.getElementById("loadBlank");

loadBlank.addEventListener('click', function() {
  canvas.width = canvasWidthInput.value;
  canvas.height = canvasHeightInput.value;
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,canvasWidthInput.value, canvasHeightInput.value);
  overlay.style = "display: none;";
  uploaded = "blank";
});

loadURL.addEventListener('click', getImage);

uploadTool.addEventListener('click', function() {
  overlay.style = "display: flex;";
  selectMenu.style = "display: flex;";
  selectMenu2.style = "display: none;";
  selectMenu3.style = "display: none;";
});

var container = document.getElementById("container");

var download = document.getElementById("download");
var adjustments = document.getElementById("adjustments");
var text = document.getElementById("text");
var paint = document.getElementById("paint");

download.addEventListener("click", function() {
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = canvas.toDataURL();
  link.click();
});

var prop1 = document.getElementById("prop1");
var prop2 = document.getElementById("prop2");
var prop3 = document.getElementById("prop3");
var open1 = false;
var open2 = false;
var open3 = false;

adjustments.addEventListener("click", function() {
  if (open1 === true) {
    prop1.style = "margin-left: -240px;";
    adjustments.classList.remove("line");
    open1 = false;
  }
  else if (open1 === false) {
    prop1.style = "margin-left: 50px;";
    adjustments.classList.add("line");

    prop2.style = "margin-left: -240px;";
    text.classList.remove("line");
    prop3.style = "margin-left: -240px;";
    paint.classList.remove("line");
    open1 = true;
    open2 = false;
    open3 = false;
  }
});

text.addEventListener("click", function() {
  if (open2 === true) {
    prop2.style = "margin-left: -240px;";
    text.classList.remove("line");
    open2 = false;
  }
  else if (open2 === false) {
    prop2.style = "margin-left: 50px;";
    text.classList.add("line");

    prop1.style = "margin-left: -240px;";
    adjustments.classList.remove("line");
    prop3.style = "margin-left: -240px;";
    paint.classList.remove("line");
    open1 = false;
    open2 = true;
    open3 = false;
  }
});

paint.addEventListener("click", function() {
  if (open3 === true) {
    prop3.style = "margin-left: -240px;";
    paint.classList.remove("line");
    open3 = false;
  }
  else if (open3 === false) {
    prop3.style = "margin-left: 50px;";
    paint.classList.add("line");

    prop1.style = "margin-left: -240px;";
    adjustments.classList.remove("line");
    prop2.style = "margin-left: -240px;";
    text.classList.remove("line");
    open1 = false;
    open2 = false;
    open3 = true;
  }
});



var contrast = document.getElementById("contrast");
var brightness = document.getElementById("brightness");
var saturation = document.getElementById("saturation");
var hue = document.getElementById("hue");
var grayscale = document.getElementById("grayscale");
var sepia = document.getElementById("sepia");

var slider1 = contrast.value;
var slider2 = brightness.value;
var slider3 = saturation.value;
var slider4 = hue.value;
var slider5 = grayscale.value;
var slider6 = sepia.value;

function effect() {
  slider1 = contrast.value;
  slider2 = brightness.value;
  slider3 = saturation.value;
  slider4 = hue.value;
  slider5 = grayscale.value;
  slider6 = sepia.value;
  if (uploaded == "image") {
    ctx.filter = "contrast(" + slider1 + ") brightness(" + slider2 + ") saturate(" + slider3 + ") hue-rotate(" + slider4 + "deg" + ") grayscale(" + slider5 + ") sepia(" + slider6 + ")";
    ctx.drawImage(img,0,0, canvas.width, canvas.height);
  }
}

contrast.oninput = function() {
  effect();
  applyText();
};

brightness.oninput = function() {
  effect();
  applyText();
};

saturation.oninput = function() {
  effect();
  applyText();
};

hue.oninput = function() {
  effect();
  applyText();
};

grayscale.oninput = function() {
  effect();
  applyText();
};

sepia.oninput = function() {
  effect();
  applyText();
};

var textInput = document.getElementById("textInput");
var textBox;
var colorInput = document.getElementById("colorInput")
var textColor;
var fontSizeInput = document.getElementById("fontSizeInput")
var fontSize = document.getElementById("fontInput")

function applyText() {
  textBox = textInput.value;
  textColor = colorInput.value;
  fontSize = fontSizeInput.value;
  fontFamily = fontInput.value
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (uploaded == "image") {
    ctx.drawImage(img,0,0,canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvasWidthInput.value, canvasHeightInput.value);
  }
  ctx.textAlign = "center";
  ctx.fillStyle = textColor;
  ctx.font = fontSize + "px " + fontFamily;
  ctx.fillText(textBox, canvas.width/2, canvas.height-32);
}

textInput.oninput = function() {
  applyText();
};

colorInput.oninput = function() {
  applyText();
};

fontSizeInput.oninput = function() {
  applyText();
};

fontInput.oninput = function() {
  applyText();
};

var lineColorInput = document.getElementById("lineColorInput");
var lineSizeInput = document.getElementById("lineSizeInput");

var pos = { x: 0, y: 0 };

document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

function setPosition(e) {
  var rect = canvas.getBoundingClientRect();
  pos.x = e.clientX - rect.left
  pos.y = e.clientY - rect.top
}

function draw(e) {
  if (open3 == true) {
    canvas.style.cursor = "pointer";
    if (e.buttons !== 1) return;
    console.log(pos.x)
    ctx.beginPath();

    lineColorInput = document.getElementById("lineColorInput");
    lineSizeInput = document.getElementById("lineSizeInput");

    ctx.lineWidth = lineSizeInput.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColorInput.value;

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
  }
  else {
    canvas.style.cursor = "default";
  }
}

uploadImage = document.getElementById("uploadImage");
createBlank = document.getElementById("createBlank");

selectMenu = document.getElementById("selectMenu")
selectMenu2 = document.getElementById("selectMenu2")
selectMenu3 = document.getElementById("selectMenu3")

uploadImage.addEventListener("click", function() {
  selectMenu.style = "display: none;"
  selectMenu2.style = "display: flex;"
});

createBlank.addEventListener("click", function() {
  selectMenu.style = "display: none;"
  selectMenu3.style = "display: flex;"
});
