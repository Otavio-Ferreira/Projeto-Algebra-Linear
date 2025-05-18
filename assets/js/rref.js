// Função que centraliza o cálculo da forma linha degrau reduzida, executada ao apertar o botão "Gerar L.D.R logo após a função salvarMatrizOculta() ser executada"
function gerarResultados(linhas, colunas) {

    // Pega o valor do campo oculto "matriz-input" que contém a matriz
    const input = document.getElementById("matriz-input").value;
    // Matriz recebe o resultado da função parseMatriz que recebe input como parâmetro
    const matriz = parseMatriz(input);
    // Resultado recebe o resultado da função rref que recebe matriz como parâmetro
    const resultado = rref(matriz);

    // Cria uma tabela, cada td recebe um valor de resultado que já é da forma linha degrau reduzida
    let html = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-danger m-0">Forma Linha Degrau Reduzida (RREF):</h5>
            <button type="button" onclick="gerarGraficos()" class="btn btn-danger">Gerar Imagens</button>
        </div>
    `;

    html += `<div class="table-responsive"><table class="table border-danger fw-bold table-bordered bg-transparent text-white">`;

    for (let i = 0; i < linhas; i++) {
        html += "<tr>";
        for (let j = 0; j < colunas; j++) {

            html += `<td class='bg-transparent text-center text-white'>
                <input type="text" class="border border-0 form-control bg-dark text-white text-center" disable value='${resultado[i][j].toFixed(2).padStart(6)}'></td>`;

        }
        html += "</tr>";
    }

    html += "</table></div>";

    document.getElementById("rref-result").innerHTML = html;
}

// Função que recebe uma string de texto contendo a matriz vinda de um campo oculto textarea, processo esse texto removendo os espaços em brancos do início e do fim, divido o texto em linha, remove os espaços extras retornando um array, ou seja faz uma conversão do texto em um array
function parseMatriz(text) {
    return text.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
}

// Função que de fato escalona a matriz recebida
function rref(matriz) {
    // Faz uma cópia da matriz dada
    const m = JSON.parse(JSON.stringify(matriz));
    // Referência
    let lead = 0;
    // pega a quantidade de linhas da matriz
    const rowCount = m.length;
    // pega a quantidade de colunas da matriz
    const columnCount = m[0].length;

    // Enquanto 0 = r < quantidade de colunas
    for (let r = 0; r < rowCount; r++) {
        // Se quantidade de coluna = lead significa que a matriz tem 0 colunas
        if (columnCount <= lead) return m;
        let i = r;
        // Enquanto o número de m na posição [i][lead] for igual a 0, incremento i, se i for igual a quantidade de linhas, i recebe r novamente, incremento lead, se quantidade de colunas for igual a lead retorno m
        while (m[i][lead] === 0) {
            i++;
            if (i === rowCount) {
                i = r;
                lead++;
                if (columnCount === lead) return m;
            }
        }
        // Troca a linha atual (m[i]) com a linha r (m[r]) assim garante que o pivô lead não seja zero, se possível
        [m[i], m[r]] = [m[r], m[i]];

        // Armazena o valor do pivô
        let val = m[r][lead];

        // Divide todos os elementos da linha r pelo pivô, para que o pivô se torne 1
        m[r] = m[r].map(x => x / val);

        // Para cada linha da matriz, exceto a linha r
        for (let i = 0; i < rowCount; i++) {
            // Pula a linha r que é a linha do pivô
            if (i === r) continue;

            // Armazena o valor da coluna lead na linha atual
            let val = m[i][lead];

            // Subtrai da linha atual a linha do pivô multiplicada por esse valor e isso vai zerar o elemento da coluna lead fora da linha do pivô
            m[i] = m[i].map((x, j) => x - val * m[r][j]);
        }

        // Avança para a próxima coluna lead para continuar o processo de escalonamento
        lead++;

    }
    // Por fim retorna m, que é a matriz escalonada
    return m;
}

