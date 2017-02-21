const	readline = require('readline'),
		vendaService = require('./app/services/VendaService.js'),
		vendaController = require('./app/controllers/VendaController.js'),
		rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

// Responsável por ser o 'menu' do programa
rl.question('Digite uma das opções:\n1 - Visualizar boletos\n2 - Gerar novo boleto\n', (opt) => {
	
	if(opt === '1')
		vendaController.listarVendas(rl, vendaService);

	if(opt === '2')
		vendaController.cadastrarVenda(rl, vendaService);

});