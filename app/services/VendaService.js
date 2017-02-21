const request = require('request');

module.exports = {
	novaVenda: (url, auth, callback) => request.post(url + '/venda', auth, callback),
	listarVendas: (url, codVenda, auth, callback) => request.get(url + '/venda/' + codVenda, auth, callback)
};