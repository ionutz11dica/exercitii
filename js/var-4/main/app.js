/*
 - funcția translate primește ca parametrii un string și un obiect
 - funcția aruncă excepții dacă tipurile nu sunt respectate (mesajul "InvalidType")
 - obiectul dicționar are în cheie valoarea inițială și în valoare traducerea ei
 - valorile din dicționar sunt string-uri
 - funcția înlocuiește fiecare cheie din dicționar găsită în textul inițial cu valoarea tradusă
*/

/*
 - the translate function receives as parameters a string and an object
 - the function throws exceptions if the types are not the required ones (message is "InvalidType")
 - the dictionary object has in its keys the inital values and in its values the translation of the key
 - the values in the dictionary are strings
 - the function replaces each dictinary key found in the initial text with the value in the dictionary corresponding to the key
*/


function translate(text, dictionary){
	// TODO: implementați funcția
	// TODO: implement the function
	
	
		if (typeof text !== 'string'){
			throw new Error("InvalidType")
		}
		if (typeof dictionary !== 'object' || !dictionary){
			throw new Error("InvalidType")
		}
		// for (let prop in dictionary){
		// if (typeof dictionary[prop] !== 'string'){
		// 	throw new Error('InvalidType')
		// }
		// }
		for(let i =0;i<dictionary.length;i++){
			if(typeof dictionary[i] !== 'string'){
				throw new Error("InvalidType")
			}
		}
		
	
	let value = text.split(' ')

	for (let index in dictionary){
		let position = value.indexOf(index)
		if (position !== -1){
			value[position] = dictionary[index]
		}	
	}
	return value.join(' ')
}


module.exports.translate = translate