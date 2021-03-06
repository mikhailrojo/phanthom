const phantom = require('phantom');

module.exports = async function init(array) {
	try {
		console.time('phantom');
		const instance = await phantom.create();
		const page = await instance.createPage();
		await createLoop(page, array);
		await instance.exit();
		console.timeEnd('phantom');
	} catch(e){
		console.log(e);
	}

};

async function createLoop(page, array) {
	const loop = [];
	for (let i = 0, len = array.length; i < len; i++) {
		loop.push(await createPage(array[i], page));
	}
	await Promise.all(loop);
}

async function createPage(id, page) {
	const base = 'https://www.ozon.ru/context/detail/id/135968167/';
	const status = await page.open(base);
	console.log(`${status} -> ${id}`);
	const title = await page.evaluate(function() {
		return document.title;
	});
	const titleEscaped = title.replace(/\//g, '');

	const render = await page.render(`./prod/ozon.png`);
	console.log(await title);
}


