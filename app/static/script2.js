document.getElementById('botaoEnviar').addEventListener('click', enviarJSON);

    function enviarJSON() {
        var campos = document.querySelectorAll('.campo-texto input[type="text"], .campo-texto input[type="number"]');
        var dadosJSON = {};

        campos.forEach(function(campo, index) {
            if (index % 2 === 0) {
                var nomeCampo = campo.value;
                var valorCampo = campo.type === 'number' ? parseFloat(campos[index + 1].value) : campos[index + 1].value;
                dadosJSON[nomeCampo] = valorCampo;
            }
        });

        fetch('/buscar_dieta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosJSON)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            exibirDadosRecebidos(data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
    }

    function exibirDadosRecebidos(data) {
        let html = '<table border="1"><tr><th>CARBOIDRATOS</th><th>PROTEÍNAS</th><th>GORDURAS</th></tr>';
        data.forEach(item => {
            html += `
                <tr>
                    <td>${item.carboidrato}</td>
                    <td>${item.proteina}</td>
                    <td>${item.gordura}</td>
                </tr>
            `;
        });
        html += '</table>';
    
        var dadosRecebidosDiv = document.getElementById('dadosRecebidos');
        dadosRecebidosDiv.innerHTML = html;
    }
    

    function adicionarCampos() {
        var container = document.querySelector('.campos');
        var novoCampo = document.createElement('div');
        novoCampo.classList.add('campo-texto');
        novoCampo.innerHTML = `
            <input type="text" placeholder="Nome do Alimento">
            <input type="number" placeholder="Gramas">
        `;
        container.insertBefore(novoCampo, document.getElementById('botaoAdicionar'));
    }

    function removerCampo() {
        var campos = document.querySelectorAll('.campo-texto');
        if (campos.length > 1) {
            campos[campos.length - 1].remove();
        }
    }