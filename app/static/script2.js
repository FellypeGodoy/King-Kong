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
        let html = '<table border="1"><tr><th>Calorias</th><th>Gorduras</th><th>Carboidratos</th><th>Proteina</th><th>Sodium</th><th>Calcium</th><th>Magnesium</th><th>Potassium</th><th>Ferro</th><th>Zinco</th></tr>';
        
        html += `
            <tr>
                <td>${data.Calories}KCal</td>
                <td>${data.Gordura}G</td>
                <td>${data.Carbo}G</td>
                <td>${data.Proteina}G</td>
                <td>${data.Sodium}G</td>
                <td>${data.Calcium}G</td>
                <td>${data.Magnesium}G</td>
                <td>${data.Potassium}G</td>
                <td>${data.Ferro}G</td>
                <td>${data.Zinco}G</td>
            </tr>
        `;
    
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