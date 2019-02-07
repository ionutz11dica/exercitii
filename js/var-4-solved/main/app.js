/*
 - funcția translate primește ca parametrii un string și un obiect
 - funcția aruncă excepții dacă tipurile nu sunt respectate
 - obiectul dicționar are în cheie valoarea inițială și în valoare traducerea ei
 - valorile din dicționar sunt string-uri
 - funcția înlocuiește fiecare cheie din dicționar găsită în textul inițial cu valoarea tradusă
*/

function translate(text, dictionary){
	if (typeof text !== 'string'){
		throw new Error('TypeError')
	}
	if (typeof dictionary !== 'object' || !dictionary){
		throw new Error('TypeError')
	}
	for (let prop in dictionary){
		if (typeof dictionary[prop] !== 'string'){
			throw new Error('TypeError')
		}
	}
	let result = text.split(' ')
	for (let prop in dictionary){
		let position = result.indexOf(prop)
		if (position !== -1){
			result[position] = dictionary[prop]
		}	
	}
	return result.join(' ')
}


module.exports.translate = translate