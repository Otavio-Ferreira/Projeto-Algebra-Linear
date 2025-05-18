// Adiciona eventos aos campos que recebem a quantidade de linha e quantidade de colunas, ai clicar nelas chama a função gerarCamposMatriz()
document.getElementById("qtd_colunas").addEventListener("input", gerarCamposMatriz);
document.getElementById("qtd_linhas").addEventListener("input", gerarCamposMatriz);

// Função que gera os campos para inserir os componentes da matriz 
function gerarCamposMatriz() {
    // Chama a função clear() que limpa a div que contém a matriz na forma linha degrau reduzida
    clear();

    // Captura os valores digitados para quantidade de linhas e colunas
    const colunas = parseInt(document.getElementById("qtd_colunas").value);
    const linhas = parseInt(document.getElementById("qtd_linhas").value);

    // Breve validação para limitar em 10 a quantidade de linhas e colunas, a fim de não causar lentidão na aplicação
    if ((linhas < 1 || linhas > 10)) {
        validate(document.getElementById("qtd_linhas"), "Linhas não pode ser menor que 1 ou maior que 10");
    }

    if ((colunas < 1 || colunas > 10)) {
        validate(document.getElementById("qtd_colunas"), "Colunas não pode ser menor que 1 ou maior que 10.");
    }

    // Captura a div que receberá os campos para digitar a matriz
    const matrizDiv = document.getElementById("matriz");

    // Se colunas e linhas não forem válidas exibe essa menssagem
    if (isNaN(colunas) || isNaN(linhas) || colunas <= 0 || linhas <= 0) {
        matrizDiv.innerHTML = "<div class='alert alert-warning' role='alert'>Informe valores válidos para linhas e colunas.</div>";
        return;
    }

    // Escreve um cabeçalho para essa área com um botão para gerar L.D.R (Linha degrau reduzida)
    let html = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-primary m-0">Digite os elementos da matriz (${linhas}x${colunas}):</h5>
            <button type="button" onclick="salvarMatrizOculta()" class="btn btn-primary fw-bold">Gerar L.D.R</button>
        </div>
    `;

    // Constrói uma tabela onde cada td recebe um imput para receber um número
    html += `<div class="table-responsive"><table class="table border-primary table-bordered bg-transparent text-white">`;

    for (let i = 0; i < linhas; i++) {
        html += "<tr>";
        for (let j = 0; j < colunas; j++) {
            html += `<td class='bg-transparent'><input type="number" class="border border-0 form-control bg-dark text-white text-center" name="a_${i}_${j}" placeholder="a${i + 1}${j + 1}"></td>`;
        }
        html += "</tr>";
    }

    html += "</table></div>";

    // Insere o html gerado na div da matriz
    matrizDiv.innerHTML = html;
}

// Dispara uma menssagem da biblioteca sweetalert de validação quando chamada
function validate(input, message) {
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        showCloseButton: true
    });

    Toast.fire({
        icon: "error",
        title: message,
    });

    input.value = 0;
}

function clear() {
    const resultado = document.getElementById("rref-result");
    resultado.innerHTML = ''
}

// Ao clicar no botão Gerar L.D.R chama essa função que salva os números digitados para gerar a matriz e salva em um campo oculto, esse campo é um textarea, dessa forma facilita para capturar os dados para calcular a forma linha degrau reduzida
function salvarMatrizOculta() {
    // Atribuido elementos e valores à variáveis
    const matrizDiv = document.getElementById("matriz");
    const inputs = matrizDiv.querySelectorAll("input[type='text'], input[type='number']");

    let linhas = parseInt(document.getElementById('qtd_linhas').value);
    let colunas = parseInt(document.getElementById('qtd_colunas').value);

    let resultado = "";
    let contador = 0;

    // Para cada input da matriz, concatena o valor dele à resultado, incrementa contador, se o resto da divisão dele pela coluna for igual a zero, concatena uma quebra de linha, se não só dá um espaço
    inputs.forEach((input, index) => {
        resultado += input.value.trim();
        contador++;

        if (contador % colunas === 0) {
            resultado += "\n";
        } else {
            resultado += " ";
        }
    });

    // Remove última quebra de linha, se houver
    resultado = resultado.trim();

    // Salva no textarea escondido matriz-input, assim teremos a matriz em um formato mais amigável
    document.getElementById("matriz-input").value = resultado;

    // Chama a função que centraliza o cálculo da forma linha degrau reduzida 
    gerarResultados(linhas, colunas);
}