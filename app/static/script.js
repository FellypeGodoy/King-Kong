document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o elemento select
    const selectElement = document.getElementById('carrossel');

    // Adiciona um event listener para o evento 'change'
    selectElement.addEventListener('change', function(event) {
        // Obtém o id do item selecionado
        const selectedId = event.target.value;
        
        // Verifica se o id não é 'Escolha um alimento'
        if (selectedId !== "Escolha um alimento") {
            // Envia o id para o Flask usando uma requisição fetch
            fetch('/buscar_dados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: selectedId })
            })
            .then(response => {
                // Trate a resposta do servidor aqui, se necessário
                console.log('Requisição enviada com sucesso');
            })
            .catch(error => {
                console.error('Erro ao enviar requisição:', error);
            });
        }
    });
});
