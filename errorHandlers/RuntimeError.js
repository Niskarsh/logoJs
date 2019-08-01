

var RuntimeError = function(token, message) {

	self = this
	self.token = token
	self.message = message
}

exports.RuntimeError = RuntimeError