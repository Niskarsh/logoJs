//Token info  	

var Token = function (type, lexeme, literal, line) {
	self = this

	self.type = type
	self.lexeme = lexeme 
	self.literal = literal
	self.line = line

	self.toString = function () {
		return (self.type+" "+self.lexeme+" "+self.literal)	
	}  
}

// var b = new Token('a','a', 2,4)
// console.log(b.toString())
exports.Token = Token
