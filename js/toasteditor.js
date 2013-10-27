

// global variables

// source point from the tiles canvas
// in the format (col, row)
var srcPoint = new Point(0,0);
// point to draw the square in the
// tileset
var squarePoint = new Point(0,0);
var tileW = 0;
var tileH = 0;
var tilesetArray = [];
var editorTilesPerRow = 8;
var emptyChar = 0;

/* 
	bool to check if currently selected tile is transparent:
   	this feature has been discontinued because of cross-origin
   	data problems
*/
//var isSelectedTileTransparent=false;

// tells if a tile has
// already been selected
var isTileSelected=false;

var isEraserSelected=false;

// array that stores the current level
var levelTiles = [];

function printOgmoProject()
{
	var string = "";

	string += "<?xml version=\"1.0\"?>\n";
	string += "<project xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n";
	string += "<OgmoVersion>2.1.0.6</OgmoVersion>\n";
	string += "<Name>New Project</Name>\n";
	string += "<BackgroundColor A=\"255\" R=\"125\" G=\"160\" B=\"255\" />\n";
	string += "<GridColor A=\"255\" R=\"255\" G=\"240\" B=\"90\" />\n";
	string += "<LevelDefaultSize>\n";
	string += "<Width>"+ levelTiles[0].length * tileW +"</Width>\n";
	string += "<Height>"+ levelTiles.length * tileH +"</Height>\n";
	string += "</LevelDefaultSize>\n";
	string += "<LevelMinimumSize>\n";
	string += "<Width>"+ levelTiles[0].length * tileW +"</Width>\n";
	string += "<Height>"+ levelTiles.length * tileH +"</Height>\n";
	string += "</LevelMinimumSize>\n";
	string += "<LevelMaximumSize>\n";
	string += "<Width>"+ levelTiles[0].length * tileW +"</Width>\n";
	string += "<Height>"+ levelTiles.length * tileH +"</Height>\n";
	string += "</LevelMaximumSize>\n";
	string += "<Filename>project.oep</Filename>\n";
	string += "<AngleMode>Radians</AngleMode>\n";
	string += "<CameraEnabled>false</CameraEnabled>\n";
	string += "<CameraSize>\n";
	string += "<Width>"+ levelTiles[0].length * tileW +"</Width>\n";
	string += "<Height>"+ levelTiles.length * tileH +"</Height>\n";
	string += "</CameraSize>\n";
	string += "<ExportCameraPosition>false</ExportCameraPosition>\n";
	string += "<LevelValueDefinitions />\n";
	string += "<LayerDefinitions>\n";
	string += "<LayerDefinition xsi:type=\"TileLayerDefinition\">\n";
	string += "<Name>Tiles</Name>\n";
	string += "<Grid>\n";
	string += "<Width>"+ tileW +"</Width>\n";
	string += "<Height>"+ tileH +"</Height>\n";
	string += "</Grid>\n";
	string += "<ScrollFactor>\n";
	string += "<X>1</X>\n";
	string += "<Y>1</Y>\n";
	string += "</ScrollFactor>\n";
	string += "<ExportMode>CSV</ExportMode>\n";
	string += "</LayerDefinition>\n";
	string += "</LayerDefinitions>\n";
	string += "<Tilesets>\n";
	string += "<Tileset>\n";
	string += "<Name>Tileset</Name>\n";
	string += "<FilePath>"+tilesetFileName+"</FilePath>\n";
	string += "<TileSize>\n";
	string += "<Width>"+ tileW +"</Width>\n";
	string += "<Height>"+ tileH +"</Height>\n";
	string += "</TileSize>\n";
	string += "<TileSep>0</TileSep>\n";
	string += "</Tileset>\n";
	string += "</Tilesets>\n";
	string += "<EntityDefinitions />\n";
	string += "</project>\n";

	return string;
}

function printOgmoLevel()
{
	var string = "";

	string += "<level width=\""+ levelTiles[0].length * tileW +"\" height=\""+ levelTiles.length * tileH +"\">\n";
	string += "<Tiles tileset=\"Tileset\" exportMode=\"CSV\">";

	for(var i=0; i < levelTiles.length; i++)
	{
		//string += "[";

		for(var j=0; j < levelTiles[i].length; j++)
		{
			string += levelTiles[i][j];

			if(j < levelTiles[i].length - 1)
				string += ", ";
		}

		if(i < levelTiles.length - 1)
			string += "\n";
	}

	string += "</Tiles>\n";
	string += "</level>\n";

	return string;
}

function printLevelCpp()
{
	var string = "";

	string += "// An awesome array ready to be loaded in your code \\m/ \n\n";

	string += "int level["+levelTiles.length+"]["+levelTiles[0].length+"] = \n";
	string += "{\n";

	for(var i=0; i < levelTiles.length; i++)
	{
		string += "{";

		for(var j=0; j < levelTiles[i].length; j++)
		{
			string += levelTiles[i][j];

			if(j < levelTiles[i].length - 1)
				string += ", ";
		}

		if(i < levelTiles.length - 1)
			string += "}, \n";
		else
			string += "} \n";
	}

	string += "};";

	return string;
}

function printLevelAS3()
{
	var string = "";

	string += "// An awesome array ready to be loaded in your code \\m/ \n\n";

	string += "var level:Array = \n";
	string += "[\n";

	for(var i=0; i < levelTiles.length; i++)
	{
		string += "[";

		for(var j=0; j < levelTiles[i].length; j++)
		{
			string += levelTiles[i][j];

			if(j < levelTiles[i].length - 1)
				string += ", ";
		}

		if(i < levelTiles.length - 1)
			string += "], \n";
		else
			string += "] \n";
	}

	string += "];";

	return string;

	return string;
}

function printLevelToast()
{
	var string = "";

	string += "// Add this code to an Entity's subclass (e.g. in the constructor) \n\n";

	string += "std::string level = ";
	for(var i=0; i < levelTiles.length; i++)
	{
		string += "\"";

		for(var j=0; j < levelTiles[i].length; j++)
		{
			string += levelTiles[i][j];

			if(j < levelTiles[i].length - 1)
				string += ", ";
		}

		if(i < levelTiles.length - 1)
			string += "\\n\" \n";
		else
			string += "\\n\"";
	}

	string += "; \n\n";

	string += "Tilemap* tilemap = new Tilemap(\""+tilesetFileName+"\", "+
				levelTiles[0].length * tileW + ", " + 
				levelTiles.length * tileH + ", " + tileW+", "+tileH+");" + "\n";

	string += "tilemap->loadFromString(level);\n"
	string += "graphic = tilemap;\n";

	return string;
}

function printLevelFlashPunk()
{
	var string = "";

	string += "var level:String = ";
	for(var i=0; i < levelTiles.length; i++)
	{
		string += "\"";
		
		for(var j=0; j < levelTiles[i].length; j++)
		{
			string += levelTiles[i][j];

			if(j < levelTiles[i].length - 1)
				string += ",";
		}

		if(i < levelTiles.length - 1)
			string += "\\n\"+\n";
	}

	string += "\"\n\n";

	string += "var tilemap:Tilemap = new Tilemap(\""+tilesetFileName+"\", "+
				levelTiles[0].length * tileW + ", " + 
				levelTiles.length * tileH + ", " + tileW+", "+tileH+");" + "\n\n";

	string += "tilemap.loadFromString(level, \",\", \"\\n\");";

	return string;
}

// little Point class helper
function Point(x, y)
{
	this.x = x;
	this.y = y;
}

// global helper methods
var getMousePos = function (canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return [evt.clientX - rect.left, evt.clientY - rect.top];
};

// mouse helpers
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
};

document.body.onmouseup = function() {
  --mouseDown;
};


function clearCanvas(canvas, color) 
{
	if(canvas.getContext) 
	{
		// Initaliase a 2-dimensional drawing context
		var context = canvas.getContext('2d');
		//Canvas commands go here

		context.fillStyle = color;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function clearCanvasTransparent(canvas) 
{
	if(canvas.getContext) 
	{
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}


function ToastCanvas()
{
	this.rows = 0;
	this.cols = 0;
	this.tileWidth = 0;
	this.tileHeight = 0;
	this.width = 0;
	this.height = 0;
}

/*
*	Canvas for the map	
*/
function MapCanvas(cols, rows, tileWidth, tileHeight)
{
	this.rows = rows;
	this.cols = cols;
	tileW = tileWidth;
	tileH = tileHeight;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;

	// local width and height
	var width = cols * tileWidth;
	var height = rows * tileHeight;
	// public variables
	this.width = width;
	this.height = height;

	// public methods
	//this.clearCanvas = clearCanvas;
	this.resizeCanvas = resizeCanvas;
	this.drawGrid = drawGrid;

	var mapCanvas = document.getElementById('mapCanvas');

	// mapCanvas clicked
	mapCanvas.addEventListener('mousedown', function(evt) {

		if(isTileSelected)
		{
			mouseDown=0;
			var mousePos = getMousePos(mapCanvas, evt);
			var col = Math.floor(mousePos[0] / tileWidth);
			var row = Math.floor(mousePos[1] / tileHeight);

			updateLevel(col, row);

			if(mapCanvas.getContext) 
			{
				var img = document.getElementById("tileset");
				var ctx = mapCanvas.getContext("2d");

				if(!isEraserSelected)
				{
					ctx.fillRect(col*tileW, row*tileH, tileW, tileH);
					ctx.drawImage(img, srcPoint.x * tileW, srcPoint.y * tileH, tileW, tileH, col * tileW, row * tileH, tileW, tileH);
				}
				else
				{
					ctx.fillRect(col*tileW, row*tileH, tileW, tileH);
				}

				//drawGrid();
			}
		}

	}, false);
	
	mapCanvas.addEventListener('mousemove', function(evt) {

		if(mouseDown && isTileSelected)
		{
			var mousePos = getMousePos(mapCanvas, evt);
			var col = Math.floor(mousePos[0] / tileWidth);
			var row = Math.floor(mousePos[1] / tileHeight);

			updateLevel(col, row);

			if(mapCanvas.getContext) 
			{
				var ctx = mapCanvas.getContext("2d");
				var img = document.getElementById("tileset");

				if(!isEraserSelected)
				{
					ctx.fillRect(col*tileW, row*tileH, tileW, tileH);
					ctx.drawImage(img, srcPoint.x * tileW, srcPoint.y * tileH, tileW, tileH, col * tileW, row * tileH, tileW, tileH);
				}
				else
				{
					ctx.fillRect(col*tileW, row*tileH, tileW, tileH);
				}

				//drawGrid();
			}
			
		}

	}, false);

	// redraw grid when mouse is up
	mapCanvas.addEventListener('mouseup', function(evt) {
		drawGrid();
	}, false);
	

	var defaultColor = "#000";

	// gives the canvas the new size
	// and creates the array to store
	// the level
	resizeCanvas(this.width, this.height);
	drawGrid();

	function updateLevel(col, row)
	{
		var img = document.getElementById("tileset");
		// storing value inside level array
		var tilesetCols = (img.width / tileW);

		if(!isEraserSelected)
		{
			levelTiles[row][col] = (srcPoint.y * tilesetCols) + srcPoint.x;
		}
		else
		{
			levelTiles[row][col] = emptyChar;
		}

		/*
		console.log("\n");
		for(var i=0; i < levelTiles.length; i++)
		{
			console.log(levelTiles[i]);
		}
		*/
		
	}

	function resizeCanvas(width, height)
	{
		mapCanvas.width = width;
		mapCanvas.height = height;
		clearCanvas(mapCanvas, defaultColor);

		// creating the level map
		levelTiles = new Array(rows);
		for(var i=0; i < rows; i++)
		{
			levelTiles[i] = new Array(cols);
		}

		for(var i=0; i < rows; i++)
		{
			for(var j=0; j < cols; j++)
			{
				levelTiles[i][j] = emptyChar;
			}
		}
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

function TilesCanvas()
{
	var clearColor = "#eee";
	var canvas = document.getElementById('tilesCanvas');
	//drawTileset();

	var img = document.getElementById("tileset");

	// read the entire tileset, create Tile objects and save them in an array
	readTileset();
	// draw Tile objects in a the canvas one by one
	drawTileset();
	
	canvas.addEventListener('click', function(evt) {

		isTileSelected=true;
		//isSelectedTileTransparent=false;
		var mousePos = getMousePos(canvas, evt);
		var col = Math.floor(mousePos[0] / tileW);
		var row = Math.floor(mousePos[1] / tileH);
		// updating src point
		// to render on map canvas

		/*
		srcPoint.x = col;
		srcPoint.y = row;
		*/

		var tilesetIndex = row * editorTilesPerRow + col;
		// src point (col,row) from which to draw
		var point = tilesetArray[tilesetIndex];
		srcPoint.x = point.x;
		srcPoint.y = point.y;

		squarePoint.x = col;
		squarePoint.y = row;

		var centerPointX = (squarePoint.x * tileW) + tileW/2;
		var centerPointY = (squarePoint.y * tileH) + tileH/2;
		
		// check to see if selected tile
		// is transparent
		if(canvas.getContext) 
		{
			// WARNING - this code may explode!
			// Please leave the following code commented.
			// It works only when the editor
			// is running from a server
			// WARNING
			/*
			var ctx = canvas.getContext("2d");
			var imageData = ctx.getImageData(centerPointX, centerPointY, 1, 1).data;
			console.log("ALPHA = "+imageData[3]);

			// if pixel is transparent
			// (thus the tile is transparent)
			if(imageData[3] == 0)
			{
				isSelectedTileTransparent=true;
			}
			*/
		}
		

		drawSquare();

		// debug
		/*
		if(canvas.getContext) 
		{
			var ctx = canvas.getContext("2d");
			ctx.fillStyle="#FF0000";
			ctx.fillRect(centerPointX, centerPointY, 5, 5);
		}
		*/

		//var message = '[TilesCanvas] Mouse position: ' + col + ',' + row;
		//console.log(message);

	}, false);
	

	function readTileset()
	{
		if(canvas.getContext) 
		{
			var ctx = canvas.getContext("2d");

			var cols = Math.floor(img.width / tileW);
			var rows = Math.floor(img.height / tileH);

			for(var row=0; row < rows; row++)
			{
				for(var col=0; col < cols; col++)
				{
					var point = new Point(0,0);
					point.x = col;
					point.y = row;
					tilesetArray.push(point);
				}
			}

			// debug
			/*
			for(var i=0; i < tilesetArray.length; i++)
			{
				var point = tilesetArray[i];
				console.log(point);
			}
			*/
		}

		canvas.width = editorTilesPerRow * tileW;
		canvas.height = parseInt(tileH) + parseInt(Math.floor(tilesetArray.length / editorTilesPerRow) * tileH);
		
		clearCanvasTransparent(canvas);

		// reset previous style
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#ffff00";
	}

	function drawTileset()
	{
		console.log("Draw tileset function ");
		
		// draw Tile objects in a the canvas one by one
		for(var i=0; i < tilesetArray.length; i++)
		{
			var point = tilesetArray[i];
			// % numTilesPerRow
			var destCol = (i % editorTilesPerRow);
			var destRow = Math.floor(i / editorTilesPerRow);

			//console.log(destCol + " " + destRow);

			if(canvas.getContext) 
			{
				console.log("Draw tile "+i);
				var ctx = canvas.getContext("2d");
				var img = document.getElementById("tileset");
				ctx.drawImage(img, point.x * tileW, point.y * tileH, tileW, tileH, destCol * tileW, destRow * tileH, tileW, tileH);
			}
		}
	}

	function drawSquare()
	{
		if(canvas.getContext)
		{
			var ctx = canvas.getContext("2d");
			//ctx.restore();
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#ffff00";

			clearCanvasTransparent(canvas);
			drawTileset();
			ctx.strokeRect(squarePoint.x * tileW + 0.5, squarePoint.y * tileH + 0.5, tileW, tileH);
		}
	}

	/*
	function drawTileset()	
	{
		if(canvas.getContext) 
		{
			var ctx = canvas.getContext("2d");
			var img = document.getElementById("tileset");

			//ctx.save();
			
			canvas.width = img.width;
			canvas.height = img.height;
			clearCanvas(canvas, clearColor);

			// reset previous style
			ctx.lineWidth = 3;
			ctx.strokeStyle = "#ffff00";

			ctx.drawImage(img, 0, 0);
		}
	}
	*/

}

TilesCanvas.prototype = new ToastCanvas();


















