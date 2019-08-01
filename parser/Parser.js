
const { TokenType } = require("../lexer/constants")
const { Stmt } = require("./Stmt")
const { Expr } = require("./Expr")
const { Logo } = require("../Logo")
const { ParseError } = require("../errorHandlers/ParseError")


var Parser = function(tokens) {

	self = this

	self.tokens = tokens
	self.current = 0

	self.match = function(...types) {


		for (var type in types) {           
	      if (self.check(type)) {                     
	        self.advance();                           
	        return true;                         
	      }                                      
    	}

    return false;  
	}

	self.check = function(type) {
		if(self.isAtEnd()) {
			return false;
		}
		if(self.peek().type==type) {
			return true;
		}
		return false;
	}

	self.isAtEnd = function() {
		return self.peek().type==TokenType.EOF;
	}

	self.advance  = function() {
		if (!self.isAtEnd()) {
			++self.current;
		}
		return self.previous();
	}

	self.peek = function () {
		return self.tokens.get(self.current);
	}

	self.previous = function () {
		return self.tokens.get(self.current-1);
	}

	//fns defined according to precedence and associativity


	self.parse = function() {

		var statements = []
		while (!self.isAtEnd()) {
			statements.push(self.declarations());


			// statements.add(statement());
		}

		return statements;
		// try {
		// 	return expression();
		// } catch (ParseError error) {
		// 	return null;
		// }
	}

	self.declarations = function() {
		try {
			if (self.match(TokenType.MAKE)) return self.varDeclaration(TokenType.MAKE)
			if (self.match(TokenType.LOCAL)) return self.varDeclaration(TokenType.LOCAL)

			return self.statement ();

		} catch (error) {
			self.synchronize();
			return null;
		}
	}

	self.varDeclaration = function (type) {

		var name = self.consume(TokenType.IDENTIFIER, "Expect variable name");

		var initializer = null;

		if (type==TokenType.MAKE) {
			initializer = self.expression();
		}

		return new Stmt.Var(name, initializer);
	}


	self.statement = function () {

		if (self.match(TokenType.FORWARD)) return self.forwardStatement(true);
		if (self.match(TokenType.BACK)) return self.forwardStatement(false);
		if (self.match(TokenType.RIGHT)) return self.rightStatement(true);
		if (self.match(TokenType.LEFT)) return self.rightStatement(false);
		if (self.match(TokenType.PENUP)) return self.penStatement(false);
		if (self.match(TokenType.PENDOWN)) return self.penStatement(true);
		if (self.match(TokenType.HIDE_TURTLE)) return self.turtleStatement(false);
		if (self.match(TokenType.SHOW_TURTLE)) return self.turtleStatement(true);
		if (self.match(TokenType.SETPENSIZE)) return self.pensizeStatement();
		if (self.match(TokenType.SETPENCOLOR)) return self.penColorStatement();
		if (self.match(TokenType.REPEAT)) return self.repeatStatement();
		if (self.match(TokenType.WHILE)) return self.whileStatement();
		if (self.match(TokenType.IF)) return self.ifStatement();
		// if (match(TokenType.TEST)) return self.testStatement();
		if (self.match(TokenType.IFELSE)) return self.ifElseStatement();
		if (self.match(TokenType.SHOW)) return self.printStatement();
		if (self.match(TokenType.LEFT_BRACE)) return new Stmt.Block(block());


		return self.expressionStatement();
	}

	self.penColorStatement = function() {
		var value = self.expression();
		return new Stmt.PenColor(value);
	}

	self.pensizeStatement = function() {
		var value = self.expression();
		return new Stmt.PenSize(value);
	}

	self.turtleStatement = function(tl) {
		return new Stmt.Turtle(tl);
	}

	self.penStatement = function(pd) {
		return new Stmt.Pen(pd);
	}

	self.rightStatement = function(forward) {
		var value = self.expression();
		return new Stmt.Right(value, forward);
	}

	self.forwardStatement = function(forward) {
		var value = self.expression();
		return new Stmt.Forwards(value, forward);
	}

	self.repeatStatement = function () {
		var condition = self.expression();
		self.consume (TokenType.LEFT_BRACE, "Expected '[ before block'");
		var block = self.block();
		return new Stmt.Repeat(condition, block);
	}

	self.whileStatement = function () {
		var condition;
		if (self.match (TokenType.LEFT_BRACE)) {
			condition = self.expression();
			self.consume (TokenType.RIGHT_BRACE, "Expected ']' at end of condition");
		} else {
			condition = self.expression();
		}

		self.consume (TokenType.LEFT_BRACE, "Expected '[' before block");
		var block = self.block();
		return new Stmt.While(condition, block);
	}



	self.ifStatement = function () {
		var condition;
		if (self.match (TokenType.LEFT_BRACE)) {
			condition = self.expression();
			self.consume (TokenType.RIGHT_BRACE, "Expected ']' at end of condition");
		} else {
			condition = self.expression();
		}

		self.consume (TokenType.LEFT_BRACE, "Expected '[' before true block");
		var thenBlock = self.block();
		return new Stmt.If(condition, thenBlock);

	}

	self.ifElseStatement = function () {
		var condition;
		
		if (self.match (TokenType.LEFT_BRACE)) {
			condition = self.expression();
			self.consume (TokenType.RIGHT_BRACE, "Expected ']' at end of condition");
		} else {
			condition = self.expression();
		}

		self.consume (TokenType.LEFT_BRACE, "Expected '[' before true block");
		var thenBlock = self.block();
		self.consume (TokenType.LEFT_BRACE, "Expected '[' before false block");
		var elseBlock = self.block();
		return new Stmt.IfElse(condition, thenBlock, elseBlock);

	}

	self.block = function () {
		var statements = []
		while(!self.check(TokenType.RIGHT_BRACE)&&!self.isAtEnd()) {
			statements.push (self.declarations());
		}

		self.consume (TokenType.RIGHT_BRACE, "Expected ']' at closing of the block");
		return statements;
	}

	//printing work
	self.printStatement = function() {
		var value = self.expression();
		//blank space after it ends
		return new Stmt.Print(value);
	}

	//default statement
	self.expressionStatement = function() {
		var value = self.expression();
		//blank space after it ends
		return new Stmt.Expression(value);
	}

	//expression = equality
	self.expression = function () {
		return self.random();
	}

	self.random = function () {
		var expr = self.or();
		while (self.match(TokenType.RANDOM)) {
			expr = new Expr.Random (expr);
		}
		return expr;
	}

	self.or = function () {
		var expr = self.and();

		while (self.match (TokenType.OR)) {
			var operator = self.previous();
			var right = self.and();
			expr =  new Expr.Logical (expr, operator, right);
		}

		return expr;
	}

	self.and = function () {
		var expr = self.equality();

		while (self.match (TokenType.AND)) {
			var operator = self.previous();
			var right = self.equality();
			expr =  new Expr.Logical (expr, operator, right);
		}

		return expr;

	}

	//equality/=comparision((!=|==)comparision)*
	self.equality = function() {
		var expr = self.comparision ();
		
		while (self.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
			var operator = self.previous();
			var right = self.comparision();
			expr = new Expr.Binary(expr, operator, right);
		}

		return expr;
	}

	//comparison = addition ( ( ">" | ">=" | "<" | "<=" ) addition )*

	self.comparision = function() {
		var expr = self.addition ();

		while (self.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
			var operator = self.previous();
			var right = self.addition();
			expr = new Expr.Binary(expr, operator, right);
		}

		return expr;
	}

	// addition=multiplication ( ( "-" | "+" ) multiplication )* ;
	
	self.addition = function () {
		var expr = self.multiplication ();

		while (self.match(TokenType.MINUS, TokenType.PLUS)) {
			var operator = self.previous();
			var right = self.multiplication();
			expr = new Expr.Binary(expr, operator, right);
		}

		return expr;
	}	
	
	//multiplication = unary ( ( "/" | "*" ) unary )* ;

	self.multiplication = function () {
		var expr = self.unary ();

		while (self.match(TokenType.SLASH, TokenType.STAR)) {
			var operator = self.previous();
			var right = self.unary();
			expr = new Expr.Binary(expr, operator, right);
		}

		return expr;
	}
	
	//unary= ( "!" | "-" ) unary | primary ;

	self.unary = function() {                     

	    if (self.match(TokenType.BANG, TokenType.MINUS)) {                
			var operator = self.previous();           
			var right = self.unary();                  
			return new Expr.Unary(operator, right);
	    }

	    return self.primary();                        
  	}
	
	//primary = NUMBER | STRING | "false" | "true" | "null" | "(" expression ")" | IDENTIFIER 

	self.primary = function() {
		if (self.match(TokenType.FALSE)) {
			return new Expr.Literal(false);
		}
		if (self.match(TokenType.TRUE)) {
			return new Expr.Literal(true);
		}
		if (self.match(TokenType.NULL)) {
			return new Expr.Literal(null);
		}
		if (self.match(TokenType.NUMBER, TokenType.STRING)) {
			return new Expr.Literal(self.previous().literal);
		}
		if (self.match(TokenType.LEFT_BRACE)) {
			var expr = self.expression ();
			self.consume (TokenType.RIGHT_BRACE, "Expecting ] after expression");
			return new Expr.Grouping(expr);
		}
		//for identifiers
		if (self.match(TokenType.IDENTIFIER)) {
			return new Expr.Variable(self.previous());
		}

		if (self.match(TokenType.RANDOM)) {
			return new Expr.Random(self.expression());
		}

		throw self.error(self.peek(), "Expect expression");
	}

	self.consume = function(type, errorMessage) {

		if(self.check(type)) {
			return self.advance();
		}
		throw self.error(self.peek(), errorMessage);
	}

	self.error = function (token, errorMessage) {
		Logo.error(token, errorMessage);
		return new ParseError();
	}

	self.synchronize = function() {
		self.advance();

		while (!self.isAtEnd()) {
			if (self.previous().line != self.peek().line ) {
				return;
			}

			switch (self.peek().type) {
				case IF:
				case FOR:
				case UNTIL:
				case DOUNTIL:
				case WHILE:
				case DOWHILE:
				case REPEAT:
				case RUN:
				case FOREVER:
				case FORWARD:
				case BACK:
				case RIGHT:
				case LEFT:
				case CS:
				case CLEARSCREEN:
				case TO:
				case END:
				case SHOW:
				case MAKE:
					return;
			}

			self.advance();
		}
	}

}

exports.Parser = Parser