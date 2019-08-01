
const {RuntimeError} = require ("../errorHandlers/RuntimeError")

var Environment = function (enclosing) {

	self = this

	self.enclosing = enclosing
	self.values = new Map();


	self.define = function (name, value) {
		self.values.set (name, value);
	}

	self.get = function (name) {
		if (self.values.has(name.lexeme.substring(1))) {
			return self.values.get(name.lexeme.substring(1));
		}

		if (self.enclosing!=null) return self.enclosing.get(name);

		throw new RuntimeError (name, "Undefined variable :" + name.lexeme.substring(1));
	}

	self.assign = function (name, value) {            
	
	    if (self.values.has(name.lexeme.substring(1))) {           
	    	self.values.set(name.lexeme.substring(1), value);                
	    	return;                                        
	    }

	    throw new RuntimeError(name, "Undefined variable '" + name.lexeme + "'.");
	}
}
