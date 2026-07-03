async function carregarMensagens() {

    try {

        const resposta = await fetch(
            'http://localhost:3000/dashboard/mensagens'
        );

        const dados = await resposta.json();

        document.getElementById(
            'totalMensagens'
        ).textContent = dados.total;

    } catch (erro) {

        console.error(
            'Erro ao carregar mensagens:',
            erro
        );

    }

}

carregarMensagens();