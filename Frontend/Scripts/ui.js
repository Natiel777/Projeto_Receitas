function createRecipeCard(receita) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.setAttribute('data-id', receita.id);

    card.innerHTML = `
        <img src="${receita.imagem || '/assets/images/placeholder.jpg'}" alt="Imagem da receita ${receita.titulo}">
        <h3>${receita.titulo}</h3>
        <p>${receita.descricao.substring(0, 100)}...</p>
        <button onclick="window.location.href='/recipe-details.html?id=${receita.id}'">Ver Receita</button>
    `;

    return card;
}

export function renderReceitas(receitas) {
    const container = document.getElementById('recipes-container');
    
    if (!container) {
        console.error("Erro: O elemento com id 'recipes-container' não foi encontrado no DOM.");
        return;
    }

    container.innerHTML = ''; 

    if (!receitas || receitas.length === 0) {
        container.innerHTML = '<p>Nenhuma receita encontrada. Tente carregar novamente!</p>';
        return;
    }

    receitas.forEach(receita => {
        const cardElement = createRecipeCard(receita);
        container.appendChild(cardElement);
    });
}