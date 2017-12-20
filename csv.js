var fs = require('fs');
var parse = require('csv-parse');
var csvData=[];

module.exports = new Promise((resolve) => {
	fs.createReadStream('./sc.csv')
		.pipe(parse({delimiter: ';'}))
		.on('data', function(csvrow) {
		//	console.log(csvrow[0]);
			//do something with csvrow
			csvData.push(csvrow[0]);
		})
		.on('end',function() {
			//do something wiht csvData
			//console.log(csvData);
			resolve(csvData);
		});
});


