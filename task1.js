const fs = require('fs');
const percentile = require('percentile');
const math = require('mathjs');

let nodePath = process.argv[0];
let appPath = process.argv[1];
let numfile = process.argv[2];

fs.readFile(numfile, 'utf8', (err, content) => {

    let arr = [];

    if (err) throw err;

    let array = content.toString().split("\n");
    for (i in array) {
        arr.push(array[i]);
    }

    let result = [];

    result.push(Number.parseInt(percentile(90, arr)));
    result.push(math.median(arr));
    result.push(Math.max.apply(null, arr));
    result.push(Math.min.apply(null, arr));
    result.push(math.mean(arr));

    if (result[2] > 32767 || result[3] < -32768) {
        console.log('Must be [-32768, 32767)');
    } else {
        for (i in result) {
            console.log(result[i].toFixed(2));
        }
    }

});