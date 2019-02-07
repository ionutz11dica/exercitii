/*
 - funcția capitalize primește ca parametrii un string și un array
 - dicționarul conține o serie de termeni
 - in textul ințial cuvintele sunt separate de spațiu
 - fiecare termen din dicționar trebuie să apară capitalizat în rezultat
 - rezultatul este un string nou, fără modificarea celui inițial
 - dacă textul nu este un string sau dicționarul nu este un array de string-uri se va arunca o excepție
*/
function capitalize(text, dictionary){
	if (typeof text !== 'string'){
		throw new Error('TypeError')
	}
	if (!Array.isArray(dictionary)){
		throw new Error('TypeError')
	}
	if (dictionary.filter((e) => typeof e !== 'string').length){
		throw new Error('TypeError')		
	}
	let result = text
	let items = result.split(' ')
	for (let i = 0; i < items.length; i++){
		if (dictionary.indexOf(items[i]) !== -1){
			items[i] = items[i][0].toUpperCase() + items[i].slice(1, items[i].length)
		}
	}
	return items.join(' ')
}


module.exports.capitalize = capitalize