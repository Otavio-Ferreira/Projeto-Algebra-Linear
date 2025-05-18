
---
## 📊 Projeto de Álgebra Linear — UFCA

Este projeto foi desenvolvido como parte da disciplina de **Álgebra Linear** da **Universidade Federal do Cariri (UFCA)**. Seu objetivo é oferecer uma ferramenta visual e interativa para estudar conceitos como **espaços gerados pelas colunas, linhas, núcleo da matriz e núcleo da transposta** por meio de gráficos vetoriais no plano e no espaço.

---

### ✅ Tecnologias e bibliotecas utilizadas

Este projeto é **100% client-side**, ou seja, você pode executá-lo simplesmente **abrindo o arquivo `index.html` em qualquer navegador moderno**. As bibliotecas utilizadas foram:

#### 🔹 [ECharts](https://echarts.apache.org/en/index.html)

Biblioteca de gráficos interativos que permite a criação de gráficos vetoriais em 2D e 3D. É utilizada para exibir os vetores relacionados aos espaços coluna, linha e núcleos da matriz.

#### 🔹 [jQuery](https://jquery.com/)

Biblioteca JavaScript que simplifica manipulação de DOM, eventos e requisições. É exigida como dependência pelo ECharts e também facilita o controle dos elementos HTML no projeto.

#### 🔹 [SweetAlert2](https://sweetalert2.github.io/)

Biblioteca moderna para criar pop-ups bonitos e personalizáveis. É utilizada para exibir mensagens de erro, alerta e sucesso no sistema.

#### 🔹 [Bootstrap 5](https://getbootstrap.com/)

Framework CSS para estilização responsiva e moderna. Usado para criar a interface gráfica do sistema de forma limpa, acessível e amigável ao usuário.

---

### ▶️ Como usar o sistema

1. **Abrir o projeto**

   * Baixe ou clone o repositório.
   * Abra o arquivo `index.html` em qualquer navegador moderno (como Chrome, Firefox, Edge).

2. **Definir a dimensão da matriz**

   * Selecione o número de linhas e colunas da matriz usando os controles disponíveis na interface.

3. **Digitar os elementos da matriz**

   * Insira os números da matriz manualmente nos campos exibidos.

4. **Gerar L.D.R (Linhas, colunas, núcleo)**

   * Clique em **“Gerar L.D.R”** para calcular a forma linha degrau reduzida da matriz.

5. **Gerar imagens**

* Clique em **“Gerar Imagems”** para calcular e exibir os seguintes espaços:

   * `Col(A)` — Espaço gerado pelas colunas da matriz.
   * `Lin(A)` — Espaço gerado pelas linhas da matriz.
   * `Nul(A)` — Núcleo da matriz (soluções do sistema homogêneo Ax = 0).
   * `Nul(Aᵀ)` — Núcleo da matriz transposta.

   * Os vetores de cada espaço são plotados graficamente usando ECharts em gráficos separados, facilitando a interpretação geométrica dos resultados.

---

### 💡 Observações

* Os cálculos são feitos utilizando operações de escalonamento (forma reduzida por linhas, **RREF**).
* O sistema funciona totalmente offline, não exige servidor nem conexão com internet (exceto para carregar bibliotecas externas, se não estiverem em cache).
* O foco é **educacional**, voltado para ajudar estudantes a visualizar e entender conceitos fundamentais de Álgebra Linear.

---

### 👨‍💻 Autor

Este projeto foi desenvolvido por **\[Otavio da Silva Ferreira]** como parte da disciplina de Álgebra Linear — UFCA.

* GitHub: [github.com/seuusuario](https://github.com/Otavio-Ferreira)
* Projeto online: [seuusuario.github.io/nome-do-repositorio](https://seuusuario.github.io/nome-do-repositorio)

---
