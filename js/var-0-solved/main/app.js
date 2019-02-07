/*
 - funcția distance primește ca parametrii două array-uri
 - fiecare element poate apărea cel mult o dată într-un array
 - distanța dintre cele 2 array-uri este numărul de elemente diferite dintre ele
 - dacă parametrii nu sunt array-uri se va arunca o excepție ("InvalidType")
*/
function distance(first, second){
	if (!Array.isArray(first) || !Array.isArray(second)){
		throw new Error('InvalidType')
	}
	let me = [...new Set(first)]
	let other = [...new Set(second)]
	let diffCount = 0
	for (let item of me){
		if (other.indexOf(item) === -1){
			diffCount++
		}
		else{
			other.splice(other.indexOf(item), 1)			
		}
	}
	diffCount += other.length
	return diffCount
}


module.exports.distance = distance