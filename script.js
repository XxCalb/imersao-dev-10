let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Carrega os dados iniciais quando a página é carregada
window.onload = async () => {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    printarCards(dados);
}

function iniciarBusca() {
    // Pega o termo digitado e converte para minúsculas para uma busca não sensível a maiúsculas/minúsculas
    const termoBusca = campoBusca.value.toLowerCase();

    // Filtra o array de dados
    const dadosFiltrados = dados.filter(dado => {
        // Converte nome e descrição para minúsculas
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        // Converte o array de tags em uma string única, em minúsculas
        const tags = dado.tags.join(' ').toLowerCase();

        // Retorna true se o nome, a descrição ou as tags incluírem o termo da busca
        return nome.includes(termoBusca) || 
               descricao.includes(termoBusca) || 
               tags.includes(termoBusca);
    });

    // Renderiza os cards com os dados filtrados
    printarCards(dadosFiltrados);
}

function printarCards(dadosParaPrintar) {
    // Limpa o container de cards antes de adicionar os novos resultados
    cardContainer.innerHTML = '';

    for(let dado of dadosParaPrintar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <p id="tags">${dado.tags}</p>
        <p>${dado.ano}</p>
        <p>${dado.Preco}</p> 
        <a href="${dado.link}" target="_blank">Leia mais</a>
        `
        cardContainer.appendChild(article);
    }
}