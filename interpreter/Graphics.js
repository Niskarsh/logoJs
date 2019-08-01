
var Graphics = function (move, turn, pd, turtle, color, pensize) {

	self = this
	
	self.move = move;
	self.turn = turn;
	self.pd = pd;
	self.turtle = turtle;
	self.color = color;
	self.pensize = pensize;

	self.toString = function () {                                      
    	return move + " " + turn + " " + pd+ " " + turtle+ " " + color+ " " + pensize;                   
  	}
}

exports.Graphics = Graphics