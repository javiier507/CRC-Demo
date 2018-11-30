let generador = [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1];
let bitsRedundante = [0, 0, 0, 0];
let mensaje = [1, 0, 0, 1, 1];

let serieData = [];

function startCRC(generadorX, bitsRedundanteX, mensajeX) {
    let result = [];

    let generadorTmp = [];

    generadorTmp.push(...generadorX);
    generadorTmp.push(...bitsRedundanteX);

    result.push(...[generadorTmp]);
    result.push(...[mensajeX]);

    return result;
}

serieData = startCRC(generador, bitsRedundante, mensaje);

function calculateCRC(serie) {
    
    let serieLength1 = serie[0].length;
    let serieLength2 = serie[1].length;

    let x1 = 0, 
        x2 = serieLength2, 
        y1 = 0, 
        y2 = 1;

    let rowsResults = [];

    for(let iteracion = 0; x2 <= serieLength1; iteracion++) {

        if(x2 > 32 || iteracion > 32) {
            break;
        }

        //  ............................................................
        //  ............................................................
        //  PART 1
        //  ............................................................
        //  ............................................................

        for(let index = 0; index < serieLength1; index++) {

            let result;

            if(index >= x1 && index < x2) {

                let value1 = serie[y1][index];
                let value2 = serie[y2][index];

                value1 = parseInt(value1);
                value2 = parseInt(value2);

                if(!isNaN(value1) && !isNaN(value2)) {
                    
                    result = (value1 === value2) ? 0 : 1;
                }
                else {
                    result = '';
                }
                
            }
            else {
                result = '';
            }

            rowsResults.push(result);
        }

        serie.push(...[rowsResults]);

        if(x2 === serieLength1) {
            break;
        }

        //  ............................................................
        //  ............................................................
        //  PART 2
        //  ............................................................
        //  ............................................................

        x1 = rowsResults.findIndex( (item) => item === 1 );
        x1 = (x1 === -1) ? serieLength2 + 1 : x1;
        x2 = x1 + serieLength2;

        y2 = serie.length - 1;

        rowsResults = [];

        let indexSerie2 = 0;

        for(let index = 0; index < serieLength1; index++) {
            
            let result;

            if(index >= x1 && index < x2) {

                let value = serie[y2][index];
                value = parseInt(value);

                if(isNaN(value)) {
                    serie[y2][index] = serie[0][index];
                }

                if(indexSerie2 < serieLength2) {
                    result = serie[1][indexSerie2];
                    indexSerie2++;
                }
                else {
                    result = '';
                }
                
            }
            else {
                result = '';
            }

            rowsResults.push(result);
        }

        serie.push(...[rowsResults]);

        y2 = serie.length - 1;
        y1 = y2 - 1;

        rowsResults = [];
    }

    return serie;
}

serieData = calculateCRC(serieData);

console.log(serieData);

//  ............................................................
//  ............................................................
//  PART 2
//  ............................................................
//  ............................................................

console.log('PARTE 2');

function getResidue(serie) {
    let result = [];

    let position = serie.length - 1;
    position = (position >= 0) ? position : 0;

    let row = serie[position];
    let flag = false;

    for (let item of row) {

        let value = parseInt(item);

        if (!isNaN(value) && value === 1) {
            flag = true;
        }

        if (flag === true) {
            result.push(value);
        }

    }

    return result;
}

bitsRedundante = getResidue(serieData);

serieData = [];

serieData = startCRC(generador, bitsRedundante, mensaje);

serieData = calculateCRC(serieData);

console.log(serieData);

//  INVESTIGAR SOBRE BINDING DE PARAMETROS