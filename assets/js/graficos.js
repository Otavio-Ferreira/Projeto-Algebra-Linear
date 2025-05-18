// Função que gera os gráficos ao clicar no botão gerar imagens
function gerarGraficos() {
    // Pega a div onde os gráficos vão ser exibidos
    const divGraficos = document.getElementById("graficos");
    // Pega o texto da matriz original inserido pelo usuário
    const input = document.getElementById("matriz-input").value;
    // Converte o texto em uma matriz de números
    const matriz = parseMatriz(input);

    // Calcula os espaços fundamentais associados à matriz A
    const colA = calcularColA(matriz);
    const linA = calcularLinA(matriz);
    const nulA = calcularNulA(matriz);
    const nulAt = calcularNulAt(matriz);

    // Mostra a div dos gráficos que está escondida
    divGraficos.classList.remove('d-none');

    // Desenha cada gráfico com o nome correspondente
    desenharGrafico("grafico-colA", colA, "Col(A)");
    desenharGrafico("grafico-linA", linA, "Lin(A)");
    desenharGrafico("grafico-nulA", nulA, "Nul(A)");
    desenharGrafico("grafico-nulAt", nulAt, "Nul(Aᵀ)");
}

// Função que calcula a coluna de A 
function calcularColA(matriz) {
    // Aplica a forma linha degrau na matriz original
    const r = rref(matriz);
    const pivots = [];

    // Identifica os índices das colunas que têm pivôs
    for (let i = 0; i < r.length; i++) {
        for (let j = 0; j < r[i].length; j++) {
            if (Math.abs(r[i][j]) > 1e-6) {
                pivots.push(j);
                // Sai do loop após encontrar o primeiro valor não-nulo pivô
                break;
            }
        }
    }

    // Remove colunas duplicadas de pivôs
    const uniquePivots = [...new Set(pivots)];

    // Retorna os vetores coluna da matriz original correspondentes aos pivôs
    return uniquePivots.map(j => matriz.map(row => row[j]));
}

// Função que calcula a linha de A 
function calcularLinA(matriz) {
    // Escalona a matriz
    const r = rref(matriz);
    // Filtra as linhas não-nulas
    return r.filter(row => !row.every(v => Math.abs(v) < 1e-6));
}

// Função que calcula o núcleo de A 
function calcularNulA(matriz) {
    // Resolve Ax = 0
    return resolverSistemaHomogeneo(matriz);
}

// Função que calcula o núcleo da transposta de A 
function calcularNulAt(matriz) {
    // Transpõe a matriz
    const transposta = matriz[0].map((_, i) => matriz.map(row => row[i]));
    // Resolve Atx = 0
    return resolverSistemaHomogeneo(transposta);
}

function resolverSistemaHomogeneo(matriz) {
    // Escalona a matriz
    const r = rref(matriz);
    const linhas = r.length;
    const colunas = r[0].length;
    const pivots = new Set();

    // Encontra as colunas que possuem pivôs
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if (Math.abs(r[i][j]) > 1e-6) {
                pivots.add(j);
                break;
            }
        }
    }

    // Identifica as variáveis livres colunas sem pivô
    const livres = [];
    for (let j = 0; j < colunas; j++) {
        if (!pivots.has(j)) livres.push(j);
    }

    const vetores = [];

    // Para cada variável livre, constrói um vetor solução
    for (let idx of livres) {
        // Inicializa o vetor com zeros
        const v = Array(colunas).fill(0);
        // Define a variável livre como 1
        v[idx] = 1;

        // Preenche os valores das variáveis dependentes com pivô
        for (let i = 0; i < linhas; i++) {
            let leadIdx = r[i].findIndex(val => Math.abs(val) > 1e-6);
            if (leadIdx !== -1 && leadIdx < idx) {
                v[leadIdx] = -r[i][idx];
            }
        }
        // Adiciona vetor à base do núcleo
        vetores.push(v);
    }

    return vetores;
}

// Função que gera o gráfico a partir da biblioteca echarts
function desenharGrafico(id, vetores, titulo) {
    const cores = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231"];

    const series = vetores.map((vetor, index) => ({
        type: 'line',
        name: `[${vetor.map(n => n.toFixed(1)).join(", ")}]`,
        data: [
            [0, 0],
            [vetor[0] || 0, vetor[1] || 0]
        ],
        lineStyle: {
            color: cores[index % cores.length],
            width: 2
        },
        symbol: 'circle',
        symbolSize: 6
    }));

    const chart = echarts.init(document.getElementById(id));
    chart.setOption({
        legend: {
            top: 0,
            left: 'center',
            textStyle: { color: '#fff' }
        },
        title: {
            text: titulo,
            top: 30,
            left: 'center',
            textStyle: { color: '#fff' }
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            top: 10,
            right: 10,
            feature: {
                saveAsImage: {
                    title: 'Salvar',
                    pixelRatio: 2
                }
            },
            iconStyle: {
                borderColor: '#fff'
            }
        },
        grid: {
            top: 70,
            bottom: 30,
            left: 40,
            right: 20
        },
        xAxis: {
            min: -5,
            max: 5,
            interval: 1,
            axisLine: { lineStyle: { color: '#fff' } },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed', // ou 'dotted' para pontilhado
                    color: '#6c757d'   // ou qualquer outra cor
                }
            }
        },
        yAxis: {
            min: -5,
            max: 5,
            interval: 1,
            axisLine: { lineStyle: { color: '#fff' } },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed', // ou 'dotted' para pontilhado
                    color: '#6c757d'   // ou qualquer outra cor
                }
            }
        },
        series
    });
}