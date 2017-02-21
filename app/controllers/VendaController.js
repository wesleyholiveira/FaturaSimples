const	config = require('../config/config.js'),
		objEnvio = {};

module.exports = {
	cadastrarVenda: (rl, service) => {
		// Pega a data atual
		const data = new Date();
		// Retorno da data em ISO 8601
		objEnvio.data = data.toISOString().slice(0, 10);
		// Não emite NFS-e
		objEnvio.emissao_nfse = 0;
		// Define o meio de pagamento
		objEnvio.meio_pagamento = 'Novo meio de pagamento';

		// Pede ao usuário para digitar o nome do cliente para criar uma nova venda
		rl.question('Digite o nome ou o código do cliente cadastrado no Fatura Simples\n', (nome) => {
		
			objEnvio.cliente = nome;
			rl.question('Digite o tipo de serviço que foi oferecido\n', (servico) => {
				objEnvio.servico = servico;
				rl.question('Digite o valor do boleto\n', (valor) => {
					
					objEnvio.valor_venda = parseFloat(valor);
					// Serviço que se comunica com a API da Fatura Simples para criar uma nova venda
					service.novaVenda(config.getUrl(), config.getAuth(), function(error, response, body) {
						
						// Verifica se a requisição foi bem sucedida
						if(!error && response.statusCode === 200) {
							// Transforma o retorno em objeto
							const resp = JSON.parse(body);
							// Imprime o link do boleto gerado
							console.log('Link do boleto gerado:\n');
							for(boleto of resp.boletos)
								console.log(boleto + '\n');
						}

					})
					// Objeto que será enviado por POST para a API da Fatura Simples
					.form(objEnvio)
					// Evento que irá capturar erros caso ocorra algum durante a requisição
					.on('error', (err) => console.log(err))

					// Libera o handler do readline
					rl.close();

				});
			});

		});
	},
	listarVendas: (rl, service) => {
		// Pede ao usuário para digitar o código da venda
		rl.question('Digite o código da venda\n', (codVenda) => {
			codVenda = parseInt(codVenda);
			// Serviço que se comunica com a API da Fatura Simples
			service.listarVendas(config.getUrl(), codVenda, config.getAuth(), (error, response, body) => {
				// Verifica se contém erro e se a requisição foi bem sucedida
				if(!error && response.statusCode === 200) {
					// Transforma o retorno em objeto
					const resp = JSON.parse(body);
					// Loop que irá imprimir todos os boletos para aquele código
					for(boleto of resp.boletos)
						console.log(boleto + '\n');
				} else
					// Se a requisição não for bem sucedida retorna 'Código inválido' ao usuário
					console.log('Código inválido.');

				// Libera o handler do readline
				rl.close();
			});
		});
	}
}
