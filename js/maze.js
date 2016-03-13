/*
* Random Maze Generator
* v0.3
*
* Copyright (c) 2010, David J. Rager
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met: 
* 
*     * Redistributions of source code must retain the above copyright notice,
*       this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of Fourth Woods Media nor the names of its
*       contributors may be used to endorse or promote products derived from
*       this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* This is a random maze generator based on a modified version of Kruskal's
* algorithm. This code is modeled roughly on the fast_maze program that can
* be found at http://nehe.gamedev.net written by smart_idiot. When I wanted to
* learn several years ago how maze generators worked, this was the algorithm
* learned.
*
* The motivation behind this was I wanted to create a program for my daughter
* that would generate mazes that could be printed out for her to solve.
* Originally I was going to create a Windows program but I didn't really feel
* like dealing with the windows GDI and printer quirks. Luckily for me, and all
* the other web developers in the world, web browsers happen to have printer
* support built in!
*
* This maze program requires a browser that supports HTML 5 and the 'canvas'
* element. This is basically any modern browser except Internet Explorer.
* (IE users can try to use excanvas.js but you're on your own.)
* 
* The maze generator consists of a Maze class and several helper classes. To
* create a new maze just instantiate the maze object:
*
* var theMaze = new Maze(canvas, width, height, level);
*
* The constructor takes the HTML canvas element on which the maze will be drawn
* a width and height. The optimal width and height would be about 80 x 60 cells
* though any rectangular dimensions will work. The constructor invokes the
* generate() method which may take less than a second or several seconds to
* complete, depending on the dimensions specified.
*
* Once the maze is constructed draw it by calling the draw() method:
*
* theMaze.draw();
*
* A new maze may be created by instantiating the maze object again or calling
* the generate() method directly:
*
* theMaze.generate(width, height);
*
* Alternately call the depth-first search generation algorithm which will
* produce somewhat more difficult mazes:
*
* theMaze.generateDFS(width, height);
*
* It is highly unlikley that you will ever see the same maze twice. (Unless of
* course your dimensions are extremely small.)
*
* This class also includes a solver that will perform a depth first search of
* the maze and draw the solution. To solve the maze call the solve() method:
*
* theMaze.solve();
*
* Finally the maze may be printed by calling the print() method:
*
* theMaze.print();
*
* The print() method will open a new browser window and redraw the maze, without
* the solution, in a window containing only the canvas element. Note that the
* canvas will not be split over multiple pages if the maze is very large. You
* may need to modify your browser's print settings to fit the maze on a single
* page. The largest maze I've printed was 160 x 120 cells.
*
* Have fun. Send any comments, bugs, contribs to rageratwork@gmail.com
*
* v0.3: added depth-first search generation algorithm
*/

// The Array class doesn't have a contains() method. We create one to make the
// code cleaner and more readable.
// Note, it seems that the decreasing while loop is the fastest way to iterate
// over a collection in javascript:
// http://blogs.sun.com/greimer/entry/best_way_to_code_a
//
// This method takes one parameter:
// 	obj - the object to search for in the array. the object must be of the
// 	      same type as the objects stored in the array.
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}

// The State class is used for storing the current traversal state while
// performing the depth first search in the solver.
//
// This constructor takes three parameters:
// 	x - the x position of the current cell in the maze.
// 	y - the y position of the current cell in the maze.
// 	dir - the direction of travel when entering the cell.
function State(x, y, dir) {
	this.x = x;
	this.y = y;
	this.dir = dir; //  0 = up, 1 = rt,  2 = dn, 3 = lt
	this.turn = -1; // -1 = lt, 0 = fwd, 1 = rt, 2 = back

	this.getDirection = function() {
		return (this.dir + 4 + this.turn) % 4;
	}
}

// The maze consists of a grid of w x h cells.
function Cell(row, col) {
	// the cells are grouped together as the walls between them are removed.
	// initially each cell belongs to its own group.
	this.grp = new Array();
	this.grp[0] = this;

	this.row = row;
	this.col = col;

	// each cell begins with 4 walls. the maze starts out as a grid with no
	// path from any node to any other node.
	this.edges = new Array(4);
	for(i = 0; i < 4; i++) this.edges[i] = true;

	this.picked = new Array(4);
	for(i = 0; i < 4; i++) this.picked[i] = false;

	this.pickEdge = function() {
		var arr = new Array();

		for(i = 0; i < 4; i++)
		{
			if(this.picked[i] == false)
				arr.push(i);
		}

		if(arr.length > 0)
		{
			var rnd = Math.floor(Math.random() * arr.length);
			this.picked[arr[rnd]] = true;
			return arr[rnd];
		}

		return -1;
	}
}

// This is the main maze class. Instantiation of this class will generate data
// for a maze. When this class is instantiated, the constructor automatically
// calls the generate() method to generate the data.
//
// The constructor takes three parameters:
// 	canvas - the HTML canvas element on which the maze will be drawn.
// 	w - the width in cells of the maze.
// 	h - the height in cells of the maze.
// 	level - the initial difficulty level for the maze.
function Maze(canvas, w, h, level) {
	// 'public' methods...

	// this method generates the maze data used to draw the maze using a
	// depth first search of the graph nodes. this method takes two
	// parameters:
	// 	w - the width in cells of the maze.
	// 	h - the height in cells of the maze.
	this.generateDFS = function(w, h) {
		if(w <= 0) w = 1;
		if(h <= 0) h = 1;

		// construct the w x h grid of cells
		this.rows = new Array(h);
		for(row = 0; row < h; row++) {
			this.rows[row] = new Array(w);
			for(col = 0; col < w; col++) {
				this.rows[row][col] = new Cell(row, col);
			}
		}

		var stack = new Array();

		var row = this.pickRow(h);
		var col = this.pickColumn(w);
		var c1 = this.at(col, row);
		var c2;

		stack.push(c1);
		while(stack.length > 0)
		{
			var edge = c1.pickEdge(); // 0 = up, 1 = right, 2 = down, 3 = left, -1 = done

			switch(edge) {
			case -1:
				c1 = stack.pop();
				break;
			case 0: // up
				// if we're in the top row it does not make
				// sense to remove the top wall of the cell. as
				// long as we are not in row 0:
				// 	- check if the cell above is in the same
				// 	group as this cell.
				// 	- if not, remove the top wall of the
				// 	cell and merge the cells into the same
				// 	group.
				//
				// follow this process for each of the other
				// cases.
				if(c1.row > 0) {
					c2 = this.at(c1.col, c1.row - 1);
					if(!c1.grp.contains(c2)) {
						c1.edges[0] = false;
						c2.edges[2] = false;
						this.merge(c1, c2);
						stack.push(c2);
						c1 = c2;
					}
				}
				break;
			case 1: // right
				// if we're in the last column we can't go right
				if(c1.col < w - 1) {
					c2 = this.at(c1.col + 1, c1.row);
					if(!c1.grp.contains(c2)) {
						c1.edges[1] = false;
						c2.edges[3] = false;
						this.merge(c1, c2);
						stack.push(c2);
						c1 = c2;
					}
				}
				break;
			case 2: // down
				// if we're in the last row we can't go down
				if(c1.row < h - 1) {
					c2 = this.at(c1.col, c1.row + 1);
					if(!c1.grp.contains(c2)) {
						c1.edges[2] = false;
						c2.edges[0] = false;
						this.merge(c1, c2);
						stack.push(c2);
						c1 = c2;
					}
				}
				break;
			case 3: // left
				// if we're in the first column we can't go left
				if(c1.col > 0) {
					c2 = this.at(c1.col - 1, c1.row);
					if(!c1.grp.contains(c2)) {
						c1.edges[3] = false;
						c2.edges[1] = false;
						this.merge(c1, c2);
						stack.push(c2);
						c1 = c2;
					}
				}
				break;
			}
		}

		this.start = this.pickRow(h);
		this.finish = this.pickRow(h);
	}

	// this method generates the maze data used to draw the maze using a
	// modified version of Kruskal's algorithm for creating a minimum
	// spanning tree. this method takes two parameters:
	// 	w - the width in cells of the maze.
	// 	h - the height in cells of the maze.
	this.generate = function(w, h) {
		if(w <= 0) w = 1;
		if(h <= 0) h = 1;

		// construct the w x h grid of cells
		this.rows = new Array(h);
		for(row = 0; row < h; row++) {
			this.rows[row] = new Array(w);
			for(cell = 0; cell < w; cell++) {
				this.rows[row][cell] = new Cell();
			}
		}

		// randomly hop around in the grid removing random walls until
		// there is exactly one path from any cell to any other cell.
		var done = false;
		while(!done) {
			var row = this.pickRow(h);
			var cell = this.pickColumn(w);
			var edge = this.pickEdge();

			// get a reference to the cell object we've chosen.
			var c1 = this.at(cell, row);
			var c2;

			switch(edge) {
			case 0: // up
				// if we're in the top row it does not make
				// sense to remove the top wall of the cell. as
				// long as we are not in row 0:
				// 	- check if the cell above is in the same
				// 	group as this cell.
				// 	- if not, remove the top wall of the
				// 	cell and merge the cells into the same
				// 	group.
				//
				// follow this process for each of the other
				// cases.
				if(row > 0) {
					c2 = this.at(cell, row - 1);
					if(!c1.grp.contains(c2)) {
						c1.edges[0] = false;
						c2.edges[2] = false;
						this.merge(c1, c2);
					}
				}
				break;
			case 1: // right
				// if we're in the last column we can't go right
				if(cell < w - 1) {
					c2 = this.at(cell + 1, row);
					if(!c1.grp.contains(c2)) {
						c1.edges[1] = false;
						c2.edges[3] = false;
						this.merge(c1, c2);
					}
				}
				break;
			case 2: // down
				// if we're in the last row we can't go down
				if(row < h - 1) {
					c2 = this.at(cell, row + 1);
					if(!c1.grp.contains(c2)) {
						c1.edges[2] = false;
						c2.edges[0] = false;
						this.merge(c1, c2);
					}
				}
				break;
			case 3: // left
				// if we're in the first column we can't go left
				if(cell > 0) {
					c2 = this.at(cell - 1, row);
					if(!c1.grp.contains(c2)) {
						c1.edges[3] = false;
						c2.edges[1] = false;
						this.merge(c1, c2);
					}
				}
				break;
			}

			// if all the cells are in the same group we are done.
			if(c1.grp.length == w * h)
				done = true;
		}

		// because there is exactly one path from any node to any other
		// node, it does not matter where we chose to enter the maze or
		// exit the maze. randomly choose a start and finish.
		this.start = this.pickRow(h);
		this.finish = this.pickRow(h);
	}

	// this method draws the maze on the canvas passed to the constructor.
	this.draw = function() {
		this.drawIt(this.canvas);
	}

	// this method performs a depth first search of the maze and draws the
	// solution.
	this.solve = function() {
		var h = this.rows.length;
		var w = this.rows[0].length;

		var s = 800 / w; // assuming 800 px wide (as in 800x600) for
				 // calculating the size of each cell

		if(s < 6) s = 6; // mininum 6x6 px cells

		if (this.canvas.getContext) {
			var x = 0;
			var y = this.start;
			var stack = new Array();

			// draw the line entering the maze.
			var ctx = this.canvas.getContext("2d");
			ctx.strokeStyle = '#00ff00';
			ctx.lineCap = 'square';
			ctx.beginPath();
			ctx.moveTo(0, y*s + s/2);
			ctx.lineTo(x*s + s/2, y*s + s/2); 
			ctx.stroke();

			// save the traversal state at the current cell.
			var state = new State(x, y, 1);

			// get the cell object so we can find the walls.
			cell = this.at(x, y);

			// the solver works by:
			// 	1 move into the cell and turn to the left.
			// 	2 if there is no wall, push the current state
			// 	and goto 1.
			// 	3 if there is a wall, turn to the right by one
			// 	(facing the original direction when entering the
			// 	cell).
			// 	4 if there is no wall, push the current state
			// 	and goto 1.
			// 	5 if there is a wall, turn to the right by one
			// 	again. (facing right now).
			// 	6 if there is no wall, push the current state
			// 	and goto 1.
			// 	7 if there is a wall, we've hit a dead end so
			// 	back out.
			//
			//	state.turn determines when left (-1), forward
			//	(0), and right (1) have been tried. the need to
			//	back out of a dead end is indicated by
			//	state.turn == 2.
			//
			var done = false;
			while(!done) {
				// if state.turn == 2 we've hit a dead end and
				// need to back out.
				if(state.turn == 2) {
					ctx.strokeStyle = '#ffffff';
					ctx.lineCap = 'square';
					ctx.beginPath();
					ctx.moveTo(x*s + s/2, y*s + s/2); 

					// pop the last saved state from the
					// stack and get the new cell position.
					state = stack.pop();
					x = state.x;
					y = state.y;
					// whatever the last turn was was a dead
					// end so turn right by one.
					state.turn++;

					// get the cell object so we can find
					// the walls.
					cell = this.at(x, y);

					// erase the line we drew into this
					// cell.
					ctx.lineTo(x*s + s/2, y*s + s/2); 
					ctx.stroke();
				} else {
					// we haven't hit a dead end just yet.
					// get the next direction we are going
					// to try based on the direction when we
					// entered and what direction we've
					// turned.
					var dir = state.getDirection();
					ctx.strokeStyle = '#00ff00';
					ctx.lineCap = 'square';
					ctx.beginPath();
					ctx.moveTo(x*s + s/2, y*s + s/2); 

					switch(dir) {
					case 0: // up
						// if there is no wall at the
						// top of the cell, push the
						// current state. calculate the
						// new y value and create a new
						// state.
						if(cell.edges[0] == false) {
							stack.push(state);
							y = y - 1;

							state = new State(x, y, 0);
						}
						else
						// otherwise, there was a wall
						// so we turn left by one.
							state.turn++;
						break;

						// follow this process for each
						// of the other cases.
					case 1:
						if(cell.edges[1] == false) {
							stack.push(state);
							x = x + 1;

							state = new State(x, y, 1);
						}
						else
							state.turn++;
						break;
					case 2:
						if(cell.edges[2] == false) {
							stack.push(state);
							y = y + 1;

							state = new State(x, y, 2);
						}
						else
							state.turn++;
						break;
					case 3:
						if(cell.edges[3] == false) {
							stack.push(state);
							x = x - 1;

							state = new State(x, y, 3);
						}
						else
							state.turn++;
						break;
					}

					// draw the line entering this cell.
					cell = this.at(state.x, state.y);
					ctx.lineTo(x*s + s/2, y*s + s/2); 
					ctx.stroke();

					// if we've reached the cell by the exit
					// then we are done.
					if ((x == w - 1) && (y == this.finish)) done = true;
				}
			}

			// draw the line exiting the maze.
			ctx.strokeStyle = '#00ff00';
			ctx.lineCap = 'square';
			ctx.beginPath();
			ctx.moveTo(x*s + s/2, y*s + s/2); 
			ctx.lineTo(x*s + s, y*s + s/2); 
			ctx.stroke();
		}
	}

	// This method opens a new window with a single canvas element in it and
	// draws the maze, without the solution, on that element.
	this.print = function() {
		var win = window.open("", "", "width=815, height=615");
		var canvas = document.createElement("canvas");

		theMaze.drawIt(canvas);

		win.document.body.appendChild(canvas);
		win.print();
	}

	// 'private' methods...

	// This helper method quickly merges two groups of cells into one.
	//
	// This method takes two parameters:
	// 	c1 - the source cell.
	// 	c2 - the cell to merge.
	this.merge = function(c1, c2) {
		// get the current cell groups.
		var grp1 = c1.grp;
		var grp2 = c2.grp;

		// add each cell in group 2 to group 1
		var i = grp2.length;
		while(i--)
		{
			// assign the group 1 array to each cell in group 2.
			grp2[i].grp = grp1;
			// add each cell in group 2 to the end of the group 1
			// array.
			grp1.push(grp2[i]);
		}

		// this method is much faster than using the Array concat()
		// method, though concat() would probably be more readable.
	}

	// This helper method returns the cell at a given location.
	//
	// This method takes two parameters:
	// 	x - the x position of the cell.
	// 	y - the y position of the cell.
	this.at = function(x, y) {
		return this.rows[y][x];
	}

	// This helper method actually draws the maze based on the grid data.
	//
	// This method takes one parameter:
	// 	canvas - the HTML canvas element on which the maze will be
	// 	drawn.
	this.drawIt = function(canvas) {
		var h = this.rows.length;
		var w = this.rows[0].length;

		var s = 800 / w; // assuming 800 px wide (as in 800x600) for
				 // calculating the size of each cell

		if(s < 6) s = 6; // mininum 6x6 px cells

		// resize the canvas to fit the maze (also clears the canvas if
		// it has already been drawn upon).
		canvas.width = w * s;
		canvas.height = h * s;

		if (canvas.getContext) {
			var ctx = canvas.getContext("2d");

			// draw the maze
			ctx.beginPath();
			for(y = 0; y < h; y++) {
				for(x = 0; x < w; x++) {
					// for each cell in the grid:
					// move to upper left of cell
					ctx.moveTo(x*s, y*s);

					// look at each side of the cell, if
					// there is a wall, draw it. otherwise,
					// just move the pen to where it would
					// be if the wall was drawn.
					var cell = this.at(x, y);
					if(cell.edges[0] == true)
						ctx.lineTo((x+1)*s, y*s);
					else
						ctx.moveTo((x+1)*s, y*s);

					// if drawing a left or right wall,
					// check if the cell is the start or
					// finish. we don't want to draw the
					// wall if that is the case.
					if((cell.edges[1] == true) && !((y == this.finish) && (x == w-1)))
						ctx.lineTo((x+1)*s, (y+1)*s);
					else
						ctx.moveTo((x+1)*s, (y+1)*s);

					if(cell.edges[2] == true)
						ctx.lineTo(x*s, (y+1)*s);
					else
						ctx.moveTo(x*s, (y+1)*s);

					if((cell.edges[3] == true) && !((y == this.start) && (x == 0)))
						ctx.lineTo(x*s, y*s);
					else
						ctx.moveTo(x*s, y*s);
				}
			}
			ctx.stroke();

			// draw a nice outer border. for some reason, firefox
			// draws a thinner outer border than the inner lines of
			// the maze. this evens that up a bit. however, in IE
			// with excanvas.js, this makes a thicker outer border.
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.moveTo(0, this.start*s);
			ctx.lineTo(0, 0);
			ctx.lineTo(w*s, 0);
			ctx.lineTo(w*s, this.finish*s);
			ctx.moveTo(w*s, (this.finish+1)*s);
			ctx.lineTo(w*s, h*s);
			ctx.lineTo(0, h*s);
			ctx.lineTo(0, (this.start+1)*s);
			ctx.stroke();
		}
	}

	// This helper method picks a row at random.
	//
	// This method takes one parameter:
	// 	height - the height of the grid in cells.
	this.pickRow = function(height) {
		return Math.floor(Math.random() * height);
	}

	// This helper method picks a column at random.
	//
	// This method takes one parameter:
	// 	width - the width of the grid in cells.
	this.pickColumn = function(width) {
		return Math.floor(Math.random() * width);
	}

	// This helper method picks an edge at random.
	this.pickEdge = function() {
		var rnd = Math.floor(Math.random() * 100);

		// these values may be modified to give preference to certain
		// edges or give each edge the same chance of being chosen.
		if(rnd < 30)  return 0; // up
		if(rnd < 50)  return 1; // right
		if(rnd < 80)  return 2; // down
		if(rnd < 100) return 3; // left
	}

	// initialize the maze

	// store the canvas.
	this.canvas = canvas;

	// generate the initial maze.
	if(level == 0)
		this.generate(w, h); // easy
	else
		this.generateDFS(w, h); // harder

	// end initialization
}

