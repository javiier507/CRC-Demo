//  ............................................................
//  ............................................................
//  FUNCTIONS
//  ............................................................
//  ............................................................

function startCRC(mensaje, bitsRedundante, generador) {
    let result = [];

    mensaje.push(...bitsRedundante);

    result.push(...[mensaje]);
    result.push(...[generador]);

    return result;
}

function calculateCRC(serie) {
    
    let serieLength1 = serie[0].length;
    let serieLength2 = serie[1].length;

    let x1 = 0, 
        x2 = serieLength2, 
        y1 = 0, 
        y2 = 1;

    let rowsResults = [];

    let limit = 32;

    for(let iteracion = 0; x2 <= serieLength1; iteracion++) {

        if(x2 > limit || iteracion > limit) {
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
        x1 = (x1 === -1) ? x2 : x1;
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

function getResidue(serie, size) {
    let result = [];

    let position = serie.length - 1;
    position = (position >= 0) ? position : 0;

    size -= 1;
    size = (size >= 0) ? size : 0;

    let row = serie[position];
    let dimension = row.length;
    let flagIndex = dimension - size;

    for (let index in row) {

        let item = row[index];
        let value = parseInt(item);

        if(index >= flagIndex && !isNaN(value)) {
            result.push(value);
        }
    }

    return result;
}

function getRedundantBits(size) {
    let result = [];

    size = (size >= 0) ? size : 0;

    for(let index = 1; index < size; index++) {
        result.push(0);
    }

    return result;
}

export default {
    startCRC,
    calculateCRC,
    getResidue,
    getRedundantBits
}

//  ............................................................
//  ............................................................
//  RUN
//  ............................................................
//  ............................................................

/* let mensaje = [1, 1, 0, 1, 0, 1];
let generador = [1, 0, 0, 1];
let bitsRedundante = getRedundantBits(generador.length);

let serie1 = [], serie2 = [];

serie1 = startCRC(mensaje.slice(), bitsRedundante, generador);
serie1 = calculateCRC(serie1.slice());

bitsRedundante = getResidue(serie1.slice(), generador.length);
serie2 = startCRC(mensaje.slice(), bitsRedundante, generador);
serie2 = calculateCRC(serie2.slice());

console.log(serie1);
console.log('\n');
console.log(serie2); */