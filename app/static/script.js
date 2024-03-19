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
    // Obter o valor digitado na caixa de texto
    var inputValue = document.querySelector('.busProdclass').value;

    // Enviar o valor para a rota /buscar_dados
    fetch('/buscar_dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alimento: inputValue }) // Enviar o valor como um objeto JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('data>>', data);
        let html = '<table border="1"><tr><th>Porção</th><th>Calorias</th><th>Gorduras</th><th>Carboidratos</th><th>Proteina</th><th>Sodium</th><th>Calcium</th><th>Magnesium</th><th>Potassium</th><th>Ferro</th><th>Zinco</th></tr>';
        
        html += `
            <tr>
                <td>100G</td>
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
        
        document.getElementById('quadrado').innerHTML = html;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
