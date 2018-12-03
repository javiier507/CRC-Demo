function convertirPolinomioEnBinario(formula)
{
	let resultado = [];

	//console.log(`\nFORMULA = ${formula}`);

	let listaVariables = formula.split('+');

	//console.log(`\nVARIABLES = ${listaVariables}`);

	let listaExponentes = listaVariables.map((item) => {

		let variableItem = item.split('^');

		//console.log(`\nVARIABLES ITEM = ${variableItem}`);

		let exponente = -1;
		let flagNumber = false;

		if(variableItem.length === 1) {
			
			flagNumber = isNaN(variableItem[0]); //	FALSE = NUMBER

			if(flagNumber == true) {
				exponente = 1;
			}
			else {
				exponente = 0;
			}

		}
		else if(variableItem.length === 2) {

			flagNumber = isNaN(variableItem[1]); //	FALSE = NUMBER

			if(!flagNumber) {
				exponente = variableItem[1];
				exponente = parseInt(exponente);
			}

		}

		//console.log(`EXPONENTE ITEM = ${exponente}`);

		return exponente;
	});

	//console.log(`\nEXPONENTES = ${listaExponentes}`);

	let maximo = Math.max(...listaExponentes);

	//console.log(`\nMAX = ${maximo}`);

	//console.log('\nTRANSFORMACION A BINARIO');

	if(maximo >= 0 && maximo <= 32) {

		let binary;

		for(let number = maximo; number >= 0; number--) {
			
			if(listaExponentes.includes(number)){
				binary = 1;	
			}
			else {
				binary = 0;
			}

			//console.log(`ELEMENTO = ${number} ; ${binary}`);

			resultado.push(binary);

		}

		//console.log(`\nRESULTADO = ${formula} = ${resultado}`);
	}
	return resultado;
}

/* let formula = 'X^3+2';

convertirPolinomioEnBinario(formula); */

export default convertirPolinomioEnBinario;

