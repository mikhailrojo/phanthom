const csv = require('./csv');
const parser = require('./f3');

(async () => {
	console.log('Начинаю парсинг внешних витрин...');
	const csvArray = await csv;

	parser(csvArray);
})();