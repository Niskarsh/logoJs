
var Expr = function() {
	
	Expr.prototype.Binary = function(left, operator, right) {
		self = this

		self.left = left
		self.operator = operator
		self.right = right

		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	    
	}


	Expr.prototype.Grouping = function(expression) {
		self = this

		self.expression = expression

		self.accept = function (visitor) {
			return visitor.visit(this)
		}
	  		
	}	

	Expr.prototype.Literal = function(value) {
		self = this

		self.value = value

		self.accept = function (visitor) {
			return visitor.visit(this)
		}

	}

	Expr.prototype.Unary = function(operator, right) {
		self = this

		
		self.operator = operator
		self.right = right

		self.accept = function (visitor) {
			return visitor.visit(this)
		}

	}

	Expr.prototype.Variable = function(name) {
		self = this

		self.name = name

		self.accept = function (visitor) {
			return visitor.visit(this)
		}

	}

	Expr.prototype.Logical = function(left, operator, right) {
		self = this

		self.left = left
		self.operator = operator
		self.right = right

		self.accept = function (visitor) {
			return visitor.visit(this)
		}

	}

	Expr.prototype.Random = function(limit) {
		self = this

		self.limit = limit

		self.accept = function (visitor) {
			return visitor.visit(this)
		}

	}

}

exports.Expr = Expr