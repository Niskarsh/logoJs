const { TokenType, keywords } = require("./constants.js")
const { Token } = require("./token.js")

//Scanner class
var Scanner = function(source) {

  self = this

		self.source = source
		self.tokens=[]
		self.start=0
		self.current=0
		self.line=1


	self.scanTokens = function () {

    	while (!this.isAtEnd()) {                            
      // We are at the beginning of the next lexeme.
	      this.start = this.current;                              
	      this.scanToken();                                  
	    }

	    this.tokens.push(new Token(TokenType.EOF, "", null, this.line));     
	    return this.tokens;                                  
  	}

	self.isAtEnd = function() {
		return this.current>=this.source.length
	}

	self.advance = function() {
		this.current+=1
		return this.source.charAt(this.current-1)
	}

	self.addToken = function(type) {                
    	this.addToken(type, null);                                
	}                                                      

  self.addToken = function(type, literal) {
 	  var text = this.source.substring(this.start, this.current);      
  	this.tokens.push(new Token(type, text, literal, this.line));    
  }  

  self.match = function(expected) {
  	if(this.source.charAt(this.current)!==expected) {
  		return false
  	}
  	this.current+=1
  	return true
  }

  self.peek = function() {
  	if(this.isAtEnd()) {
  		return '\0'
  	}
  	return this.source.charAt(this.current)
  }

  self.handleString = function () {
  	var st=''
  	while(this.peek()!=' ' && !this.isAtEnd()) {
  		if (this.peek()=='\n') {
  			this.line+=1
  		}
  		this.advance()
  	}

  	st = this.source.substring(this.start+1, this.current)
  	this.addToken(TokenType.STRING, st)
  }

  self.isDigit = function(c) {
    return (c >= '0' && c <= '9')   
  } 

  self.number = function() {                                     
    while (this.isDigit(this.peek())) {
    	this.advance()
    }

    // Look for a fractional part.                            
    if (this.peek() == '.' && this.isDigit(this.peekNext())) {               
      // Consume the "."                                      
      this.advance()                                              

      while (this.isDigit(this.peek())) {
      	this.advance()                    
      }
    }                                                         

    this.addToken(TokenType.NUMBER, parseFloat(this.source.substring(this.start, this.current)))
  } 

  self.peekNext = function() {                         
    if (this.current + 1 >= this.source.length) return '\0';
    return this.source.charAt(this.current + 1);              
  } 

  self.isColon = function (c) {
  	if(c==':') {
  		return true
  	}
		return false
  }

  self.isAlphaNumeric = function (c) {
    return this.isAlpha(c) || this.isDigit(c);      
  }

  self.isAlpha = function(c) {       
    return ((c >= 'a' && c <= 'z') ||      
               (c >= 'A' && c <= 'Z') ||      
                c == '_')                     
  }

  self.identifier = function () {
  	while (this.isAlphaNumeric(this.peek())) {
  		this.advance()
  	}
  	var text = this.source.substring(this.start, this.current);
		this.addToken(TokenType.IDENTIFIER, text)
  }

	self.scanToken = function () {
		var c = this.advance()
		switch (c) {
			case '[': this.addToken(TokenType.LEFT_BRACE); break;
			case ']': this.addToken(TokenType.RIGHT_BRACE); break;
			case ',': this.addToken(TokenType.COMMA); break;          
	    case '-': this.addToken(TokenType.MINUS); break;          
	    case '+': this.addToken(TokenType.PLUS); break;           
	    case '*': this.addToken(TokenType.STAR); break; 

	    case '!': this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG); break;      
	    case '=': this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL); break;    
	    case '<': this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS); break;      
	    case '>': this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER); break;

	    case '/':                                                       
	        if (this.match('/')) {
	          // A comment goes on until the end of the line.                
	          while (this.peek() != '\n' && !this.isAtEnd()) {
	          	this.advance()
	          }
	        } else {                                                      
	          this.addToken(TokenType.SLASH)                                            
	        }                                                             
      break

      case ' ':                                    
      case '\r':                                   
      case '\t':                                   
        // Ignore whitespace,tabs
      break

      case '\n':                                   
        this.line+=1                                    
      break  

      case '"':
      	this.handleString()
    	break

    	default:                                     
				if (this.isDigit(c)) {                          
          this.number()
        } else if (this.isColon(c)) {
        	this.identifier()                                   
        } else {
        	while (this.isAlphaNumeric(this.peek())) {
			  		this.advance()
			  	}
			  	var text = this.source.substring(this.start, this.current);
			  	var type = keywords.get(text)
			  	if(type!==null) {
			  		this.addToken(type)
			  	}
        }                                   
        break

		}

	}
}

exports.Scanner = Scanner

var chk = new Scanner("to tree :size\nif :size < 5 [forward :size back :size stop]\nforward :size/3\nleft 30 tree :size*2/3 right 30\nforward :size/6\nright 25 tree :size/2 left 25\nforward :size/3\nright 25 tree :size/2 left 25\nforward :size/6\nback :size\nend\nclearscreen\ntree 150")
console.log(chk.scanTokens())