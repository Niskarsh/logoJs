const LEFT_BRACE="LEFT_BRACE"
const RIGHT_BRACE="RIGHT_BRACE"
const COMMA="COMMA"
const MINUS="MINUS"
const PLUS="PLUS"
const SLASH="SLASH"
const STAR="STAR"
const DOT="DOT"
const COLON="COLON" 


// One or two character tokens.                  
const BANG="BANG"
const BANG_EQUAL="BANG_EQUAL"                                
const EQUAL="EQUAL"
const EQUAL_EQUAL="EQUAL_EQUAL"                              
const GREATER="GREATER"
const GREATER_EQUAL="GREATER_EQUAL"                          
const LESS="LESS"
const LESS_EQUAL="LESS_EQUAL"                                

// Literals.                                     
const IDENTIFIER="IDENTIFIER"
const STRING="STRING"
const NUMBER="NUMBER"                      

// Keywords.                                     

const ELSE="ELSE"
const FALSE="FALSE"
const IF="IF"
const FOR="FOR"
const UNTIL="UNTIL"
const DOUNTIL="DOUNTIL"
const WHILE="WHILE"
const DOWHILE="DOWHILE"
const REPEAT="REPEAT"
const RUN="RUN"
const FOREVER="FOREVER"
const REPCOUNT="REPCOUNT"
const TRUE="TRUE"    
const MOUSEPOS="MOUSEPOS"
const CLICKPOS="CLICKPOS"
const BACKGROUND="BACKGROUND"
const BG="BG"
const GETSCREENCOLOR="GETSCREENCOLOR"
const GETSC="GETSC"
const FD="FD"
const FORWARD="FORWARD"
const BK="BK"
const BACK="BACK"
const RT="RT"
const RIGHT="RIGHT"
const LT="LT"
const LEFT="LEFT"
const CS="CS"
const CLEARSCREEN="CLEARSCREEN"
const PU="PU"
const PENUP="PENUP"
const PD="PD"
const PENDOWN="PENDOWN"
const TO="TO"
const END="END"
const PENMODE="PENMODE"
const PAINT="PAINT"
const ERASE="ERASE"
const REVERSE="REVERSE"
const SETPENCOLOR="SETPENCOLOR"
const SETPENSIZE="SETPENSIZE"
const SETBACKGROUND="SETBACKGROUND"
const SETSCREENCOLOR="SETSCREENCOLOR"
const SETSC="SETSC"
const SETPOS="SETPOS"
const SETXY="SETXY"
const SETX="SETX"
const SETY="SETY"
const AND="AND"
const OR="OR"
const NOT="NOT"
const STOP="STOP"

//End of file
const EOF="EOF"

// Compiled

const TokenType = {
	LEFT_BRACE, RIGHT_BRACE, COMMA, MINUS, PLUS, SLASH, STAR, DOT, COLON, BANG, BANG_EQUAL, EQUAL, EQUAL_EQUAL, GREATER, GREATER_EQUAL,
	LESS, LESS_EQUAL, IDENTIFIER, STRING, NUMBER, ELSE, FALSE, IF, FOR,UNTIL, DOUNTIL, WHILE, DOWHILE, REPEAT, RUN, 
	FOREVER, REPCOUNT, TRUE, MOUSEPOS, CLICKPOS, BACKGROUND, BG, GETSCREENCOLOR, GETSC, FD, FORWARD, BK, BACK,
	RT, RIGHT, LT, LEFT, CS, CLEARSCREEN, PU, PENUP, PD, PENDOWN, TO, END, PENMODE, PAINT, ERASE, REVERSE, SETPENCOLOR,
	SETPENSIZE, SETBACKGROUND, SETSCREENCOLOR, SETSC, SETPOS, SETXY, SETX, SETY, AND, OR, NOT, EOF
}
var keywords = new Map()
keywords.set("else", ELSE)
keywords.set("false", FALSE)
keywords.set("if", IF)
keywords.set("for", FOR)
keywords.set("until", UNTIL)
keywords.set("dountil", DOUNTIL)
keywords.set("while", WHILE)
keywords.set("dowhile", DOWHILE)
keywords.set("repeat", REPEAT)
keywords.set("run", RUN)
keywords.set("forever", FOREVER)
keywords.set("repcount", REPCOUNT)
keywords.set("true", TRUE)
keywords.set("mousepos", MOUSEPOS)
keywords.set("clickpos", CLICKPOS)
keywords.set("background", BACKGROUND)
keywords.set("bg", BG)
keywords.set("getscreencolor", GETSCREENCOLOR)
keywords.set("getsc", GETSC)
keywords.set("fd", FORWARD)
keywords.set("forward", FORWARD)
keywords.set("bk", BACK)
keywords.set("back", BACK)
keywords.set("rt", RIGHT)
keywords.set("right", RIGHT)
keywords.set("lt", LEFT)
keywords.set("left", LEFT)
keywords.set("cs", CLEARSCREEN)
keywords.set("clearscreen", CLEARSCREEN)
keywords.set("pu", PENUP)
keywords.set("penup", PENUP)
keywords.set("pd", PENDOWN)
keywords.set("pendown", PENDOWN)
keywords.set("to", TO)
keywords.set("end", END)
keywords.set("penmode", PENDOWN)
keywords.set("paint", PAINT)
keywords.set("erase", ERASE)
keywords.set("reverse", REVERSE)
keywords.set("setpencolor", SETPENCOLOR)
keywords.set("setpensize", SETPENSIZE)
keywords.set("setbackground", SETBACKGROUND)
keywords.set("setscreencolor", SETBACKGROUND)
keywords.set("setsc", SETSC)
keywords.set("setpos", SETPOS)
keywords.set("setx", SETX)
keywords.set("sety", SETY)
keywords.set("and", AND)
keywords.set("or", OR)
keywords.set("not", NOT)
keywords.set("stop", STOP)

//Maximum munch

exports.keywords = keywords
exports.TokenType = TokenType
// LEFT_BRACE, RIGHT_BRACE, COMMA, MINUS, PLUS, SLASH, STAR, BANG, BANG_EQUAL, EQUAL, EQUAL_EQUAL, GREATER, GREATER_EQUAL,
// LESS, LESS_EQUAL, IDENTIFIER, STRING, NUMBER, ELSE, FALSE, IF, FOR,UNTIL, DOUNTIL, WHILE, DOWHILE, REPEAT, RUN, 
// FOREVER, REPCOUNT, TRUE, MOUSEPOS, CLICKPOS, BACKGROUND, BG, GETSCREENCOLOR, GETSC, FD, FORWARD, BK, BACKGROUND,
// RT, RIGHT, LT, LEFT, CS, CLEARSCREEN, PU, PENUP, PD, PENDOWN, TO, END, PENMODE, PAINT, ERASE, REVERSE, SETPENCOLOR,
// SETPENSIZE, SETBACKGROUND, SETSCREENCOLOR, SETSC, SETPOS, SETXY, SETX, SETY, AND, OR, NOT, EOF
