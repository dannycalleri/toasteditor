
function ToastCanvas()
{
	this.rows = 0;
	this.cols = 0;
	this.tileWidth = 0;
	this.tileHeight = 0;
	this.width = 0;
	this.height = 0;
	this.coppola = "di badda";

	this.greet = greet;

	function greet() {
        console.log("Hi, I'm " + this.coppola);
    };

    this.getMousePos = function (canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return [evt.clientX - rect.left, evt.clientY - rect.top];
	};
}

/*
ToastCanvas.prototype.getMousePos = function (canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return [evt.clientX - rect.left, evt.clientY - rect.top];
};
*/

/*
ToastCanvas.prototype = {
	getMousePos: function(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return [evt.clientX - rect.left, evt.clientY - rect.top];
	}
};
*/

/*
*	Canvas for the map	
*/
function MapCanvas(cols, rows, tileWidth, tileHeight)
{
	this.coppola = "di cazzu";
	this.rows = rows;
	this.cols = cols;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;

	// local width and height
	var width = cols * tileWidth;
	var height = rows * tileHeight;
	// public variables
	this.width = width;
	this.height = height;

	// public methods
	this.clearCanvas = clearCanvas;
	this.resizeCanvas = resizeCanvas;
	this.drawGrid = drawGrid;

	var mapCanvas = document.getElementById('mapCanvas');

	mapCanvas.addEventListener('click', function(evt) {

		var mousePos = getMousePos(mapCanvas, evt);
		var col = Math.floor(mousePos[0] / tileWidth);
		var row = Math.floor(mousePos[1] / tileHeight);
		var message = 'Mouse position: ' + col + ',' + row;
		console.log(message);

	}, false);

	var defaultColor = "#000";
	resizeCanvas(this.width, this.height);
	drawGrid();

	function clearCanvas(color) 
	{
		if(mapCanvas.getContext) 
		{
			// Initaliase a 2-dimensional drawing context
			var context = mapCanvas.getContext('2d');
			//Canvas commands go here

			context.fillStyle = color;
			context.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
		}
	}

	function resizeCanvas(width, height)
	{
		mapCanvas.width = width;
		mapCanvas.height = height;
		clearCanvas(defaultColor);
	}

	function drawGrid()
	{
		if(mapCanvas.getContext) 
		{
			var ctx = mapCanvas.getContext('2d');
			ctx.lineWidth = 1;
			ctx.strokeStyle="#333";

			// drawing with 0.5 offset
			// for pixel perfect lines
			// (OpenGL style)
			for(var i=1; i < rows; i++)
			{
				ctx.moveTo(0.5, i*tileHeight + 0.5);
				ctx.lineTo(width + 0.5, i*tileHeight + 0.5);
				ctx.stroke();
			}


			for(var i=1; i < cols; i++)
			{
				ctx.moveTo(i*tileWidth + 0.5, 0.5);
				ctx.lineTo(i*tileWidth + 0.5, height + 0.5);
				ctx.stroke();
			}
			
		}
	}

	/*
	function getMousePos(canvas, evt) 
	{
		var rect = canvas.getBoundingClientRect();
		return [evt.clientX - rect.left, evt.clientY - rect.top];
	}
	*/
}

MapCanvas.prototype = new ToastCanvas();
//MapCanvas.prototype.constructor = MapCanvas;

function TilesCanvas()
{
	var canvas = document.getElementById('tilesCanvas');
	if(canvas.getContext) 
	{
		var ctx = canvas.getContext("2d");
		var img = document.getElementById("tileset");
		ctx.drawImage(img, 0, 0);
	}
}

TilesCanvas.prototype = new ToastCanvas();
//TilesCanvas.prototype.constructor = TilesCanvas;

var mapCanvas = new MapCanvas(20, 15, 32, 32);
var tilesCanvas = new TilesCanvas();

mapCanvas.greet();
tilesCanvas.greet();

//console.log("MAP CANVAS: " + mapCanvas.coppola);
//console.log("TILES CANVAS: " + tilesCanvas.coppola);

/*
var Person = function() {
    this.canTalk = true;
    this.greet = function() {
        if (this.canTalk) {
            console.log("Hi, I'm " + this.name);
        }
    };
};

var Customer = function(name) {
    this.name = name;
};
Customer.prototype = new Person();

var person = new Person();
var customer = new Customer("Danny");

person.greet();
customer.greet();
*/

//mapCanvas.createGrid();



