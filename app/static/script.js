// document.addEventListener('DOMContentLoaded', function() {
//     // Seleciona o elemento select
//     const selectElement = document.getElementById('carrossel');

//     // Adiciona um event listener para o evento 'change'
//     selectElement.addEventListener('change', function(event) {
//         // Obtém o id do item selecionado
//         const selectedId = event.target.value;
        
//         // Verifica se o id não é 'Escolha um alimento'
//         if (selectedId !== "Escolha um alimento") {
//             // Envia o id para o Flask usando uma requisição fetch
//             fetch('/buscar_dados', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ id: selectedId })
//             })
//             .then(response => {
//                 let html = '<table border="1"><tr><th>PRODUTO</th><th>VALOR</th><th>QUANTIDADE</th></tr>';
//             data.forEach(item => {
//                 html += `
//                     <tr>
//                         <td>${item.nome}</td>
//                         <td>${item.porção}</td>
//                         <td>${item.proteinas}</td>
//                         <td${item.gorduras}<td>
//                         <td${item.carboidratos}<td>
//                     </tr>
//                 `;
//             });
//             html += '</table>';
//             })
//             .catch(error => {
//                 console.error('Erro ao enviar requisição:', error);
//             });
//         }
//     });
// });


document.getElementById('busProd').addEventListener('click', function() {
    fetch('/buscar_dados')
        .then(response => response.json())
        .then(data => {
            console.log('data>>', data)
            let html = '<table border="1"><tr><th>ALIMENTO</th><th>CARBOIDRATOS</th><th>PROTEÍNAS</th><th>GORDURAS</th><th>PORÇÃO</th></tr>';
            data.forEach(item => {
                html += `
                    <tr>
                        <td>${item.nome}</td>
                        <td>${item.carboidrato}</td>
                        <td>${item.proteina}</td>
                        <td>${item.gordura}</td>
                        <td>${item.porcao}</td>
                    </tr>
                `;
            });
            html += '</table>';
            
            document.getElementById('quadrado').innerHTML = html;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
