/*
Exista un tip obiectual definit (Widget)
Funcția decorate adaugă la Widget o metodă numită enhance, care crește mărimea unui widget cu "n"
Dacă parametrul trimis nu este un număr, se aruncă o excepție ("InvalidType")
Metoda funcționează și asupra Widget-urilor deja declarate
*/

class Widget {
	constructor(name, size){
		this.name = name
		this.size = size
	}

	getDescription(){
		return `a ${this.name} of size ${this.size}`
	}
}

function decorate(){
	Widget.prototype.enhance = function (n){
		if (typeof n !== 'number'){
			throw new Error("InvalidType")
		}
		this.size += n
	}
}


module.exports.decorate = decorate
module.exports.Widget = Widget