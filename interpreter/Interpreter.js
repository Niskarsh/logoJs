
const { Expr } = require ("../parser/Expr")
const { Stmt } = require ("../parser/Stmt")
const { TokenType } = require ("../lexer/constants")
const { RuntimeError } = require ("../errorHandlers/RuntimeError")
const { Environment } = require ("./Environment")
const { Graphics } = require ("./Graphics")
const { Logo } = require ("../Logo")
// import java.lang.Math;

var Interpreter = function () {

	self = this

	self.environment = new Environment(null);

	self.print = function (expr) {
		return expr.accept(self);
	}

	//wrapper around over-riding methods to provide exception handling
	self.interpret = function (statements) {
		try {

			for(var statement in statements) {
				self.execute(statement);
			}
			// Object value = evaluate (expression);
			// System.out.println(stringify(value));
		} catch (error) {
			Logo.runtimeError(error);
		}

	}

	self.execute = function (stmt) {
		stmt.accept(self);
	}

	self.stringify = function (value) {
		if (value == null) return "null";
		// if (value instanceof Double) {
		// 	String text = value.toString();
		// 	if (text.endsWith(".0")) {
		// 		text = text.substring(0, text.length()-2);
		// 	}
		// 	return text;
		// }

		return value.toString();
	}

	//Overriding Expression interface methods

	self.visitLiteralExpr = function (expr) {
		return expr.value;
	}

	sel.visitGroupingExpr = function (expr) {
		return self.evaluate(expr.expression);
	}	

	self.evaluate = function (expr) {
		return expr.accept(this);
	}

	self.visitUnaryExpr = function (expr) {
		var right = self.evaluate(expr.right);

		switch (expr.operator.type) {
			case MINUS:
				self.checkNumberOperand(expr.operator, right);
				return -(double)right;
			case BANG:
				return !self.isTruthy(right);
		}

		//for java syntax
		return null;
	}

	//Logical operators
	self.visitLogicalExpr = function (expr) {
		var left = self.evaluate(expr.left);

		if (expr.operator.type == TokenType.OR) {
			if (self.isTruthy(left)) return left;
		} else {
			if (!self.isTruthy (left)) return left;
		}

		return self.evaluate(expr.right);
	}


	self.visitRandomExpr = function (expr) {
		
		var limit = self.evaluate(expr.limit);
		// limit = Math.random()*limit;



		return limit;

	}

	self.checkNumberOperand = function (operator, operand) {
		if (operand instanceof Double) return;
		throw new RuntimeError(operator, "Operand must be a number");

	}

	self.isTruthy = function (object) {

		if(object==null) return false;
		if(object instanceof Boolean) return (boolean)object;
		return true;

	}

	self.visitBinaryExpr  = function (expr) {
		left = self.evaluate(expr.left);
		right = self.evaluate(expr.right);

		switch (expr.operator.type) {
			case MINUS:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left-(double)right;
			case PLUS:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left+(double)right;
			case SLASH:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left/(double)right;
			case STAR:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left*(double)right;
			case GREATER:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left>(double)right;
			case GREATER_EQUAL:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left>=(double)right;
			case LESS:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left<(double)right;
			case LESS_EQUAL:
				self.checkNumberOperands(expr.operator, left, right);
				return (double)left<=(double)right;
			case BANG_EQUAL: return !self.isEqual(left, right);
      		case EQUAL_EQUAL: return self.isEqual(left, right);

		}

		//Unreachable
		return null;

	}

	self.visitVariableExpr = function (expr) {
		return self.environment.get (expr.name);

	}

	self.checkNumberOperands = function(operator, left, right) {   
	    if (left instanceof Double && right instanceof Double) return;
	    
	    throw new RuntimeError(operator, "Operands must be numbers");
  	} 

	self.isEqual = function (left, right) {
		if (left == null && right == null) return true;
		if (left==null) return false;

		return left.equals(right);
	}


	//Overriding Statements interface methods

	//Evalutes expressions
	self.visitExpressionStmt = function (stmt) {
		self.evaluate(stmt.expression);
		return null;

	}

	// Evalutes printing statements
	self.visitPrintStmt = function (stmt) {

		var value = self.evaluate(stmt.expression);
		System.out.println(self.stringify(value));
		return null;
		
	}


	//Stores variables
	@Override
	public Void visitVarStmt (Stmt.Var stmt) {

		Object value = null;
		if (stmt.initializer !=null) {
			value = evaluate (stmt.initializer);
		}

		environment.define(stmt.name.lexeme, value);
		return null;
	}

	//excutes block and introduces new scope
	@Override
	public Void visitBlockStmt (Stmt.Block stmt) {

		executeBlock(stmt.statements, new Environment(environment));
 		return null;
	}

	void executeBlock (List<Stmt> statements, Environment environment) {

		Environment previous = this.environment;
		try {
			this.environment = environment;
			for (Stmt statement: statements) {
				execute (statement);
			}
		} finally {
			this.environment = previous;
		}

	}

	@Override
	public Void visitIfStmt (Stmt.If stmt) {

		if (isTruthy(evaluate(stmt.condition))) {
			executeBlock (stmt.thenBlock, new Environment(environment));
		}

		return null;

	}

	@Override
	public Void visitIfElseStmt (Stmt.IfElse stmt) {

		if (isTruthy(evaluate(stmt.condition))) {
			executeBlock (stmt.thenBlock, new Environment(environment));
		} else {
			executeBlock (stmt.elseBlock, new Environment(environment));
		}

		return null;

	}

	@Override
	public Void visitWhileStmt (Stmt.While stmt) {
		
		while (isTruthy(evaluate(stmt.condition))) {
	    	executeBlock(stmt.block, new Environment(environment));                       
	    }                                           
	    return null; 

	}

	@Override
	public Void visitRepeatStmt (Stmt.Repeat stmt) {
		double i=0;
		double condtn = (double)evaluate(stmt.condition);
		while (i<condtn) {
			executeBlock (stmt.block, new Environment(environment));
			++i;
		}

		return null;

	}

	@Override
	public Void visitForwardsStmt (Stmt.Forwards stmt) {
		Logo.hasGraphics = true;
		if (stmt.forward) {
			Logo.graphicSets.add (new Graphics((double)evaluate(stmt.value), 0, Logo.pd, Logo.turtle, Logo.color, Logo.pensize));	
		} else {
			Logo.graphicSets.add (new Graphics(-(double)evaluate(stmt.value), 0, Logo.pd, Logo.turtle, Logo.color, Logo.pensize));
		}
		
		return null;
	}

	@Override
	public Void visitRightStmt (Stmt.Right stmt) {
		Logo.hasGraphics = true;
		if (stmt.forward) {
			Logo.graphicSets.add (new Graphics(0,(double)evaluate(stmt.value), Logo.pd, Logo.turtle, Logo.color, Logo.pensize));	
		} else {
			Logo.graphicSets.add (new Graphics(0,-(double)evaluate(stmt.value), Logo.pd, Logo.turtle, Logo.color, Logo.pensize));
		}
		
		return null;
	}

	@Override
	public Void visitPenStmt (Stmt.Pen stmt) {
		Logo.hasGraphics = true;
		Logo.pd = stmt.pd;
		
		return null;
	}

	@Override
	public Void visitTurtleStmt (Stmt.Turtle stmt) {
		Logo.hasGraphics = true;
		Logo.turtle = stmt.tl;
		
		return null;
	}

	@Override
	public Void visitPenColorStmt (Stmt.PenColor stmt) {
		Logo.hasGraphics = true;
		Logo.color = (double)evaluate(stmt.color);
		
		return null;
	}

	@Override
	public Void visitPenSizeStmt (Stmt.PenSize stmt) {
		Logo.hasGraphics = true;
		Logo.pensize = (double)evaluate(stmt.pensize);
		
		return null;
	}

	

}

exports.Interpreter = Interpreter
