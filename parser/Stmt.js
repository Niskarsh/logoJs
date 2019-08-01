

var Stmt = function() {

	

	Stmt.prototype.Expression = function(expression) {
		self = this	
			
		self.expression = expression

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Print = function(expression) {
		self = this
		
		self.expression = expression;

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Var = function(name, initializer) {
		self = this

		self.name = name
		self.initializer = initializer
		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Block = function(statements) {
		self = this

		self.statements = statements
		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.If = function(condition, thenBlock) {
		self = this

		self.condition = condition
		self.thenBlock = thenBlock

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.IfElse = function(condition, thenBlock, elseBlock) {
		self = this

		self.condition = condition
		self.thenBlock = thenBlock
		self.elseBlock = elseBlock


		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Repeat = function(condition, block) {
		self = this

		self.condition = condition
		self.block = block

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.While = function(condition, block) {
		self = this

		self.condition = condition
		self.block = block

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Forwards = function(value, forward) {
		self = this

		self.value = value
		self.forward = forward

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Right = function(value, forward) {
		self = this

		self.value = value
		self.forward = forward

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Pen = function(pd) {
		self = this

		self.pd = pd

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.Turtle = function(tl) {
		self = this

		self.tl = tl

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.PenColor = function(color) {
		self = this

		self.color = color
		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}

	Stmt.prototype.PenSize = function(pensize) {
		self = this

		self.pensize = pensize

		
		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	}
}

exports.Stmt = Stmt;