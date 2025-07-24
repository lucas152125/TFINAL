function createFilterButtons() {
    const content = document.getElementById('content');
    if (!content) return;

    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';

    const filters = [
        { name: 'Todo', type: 'all' },
        { name: 'Series', type: 'series' },
        { name: 'Películas', type: 'movies' },
        { name: 'TV en Vivo', type: 'live' }
    ];

    filterContainer.innerHTML = filters.map(filter => `
        <button class="tv-button filter-btn" data-type="${filter.type}">
            ${filter.name}
        </button>
    `).join('');

    // Insertar al inicio del contenedor
    if (content.firstChild) {
        content.insertBefore(filterContainer, content.firstChild);
    } else {
        content.appendChild(filterContainer);
    }

    // Eventos para filtros con clase activa
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const type = btn.dataset.type;
            filterPlatforms(type);
        });
    });
}

function filterPlatforms(type) {
    const cards = document.querySelectorAll('.platform-card');
    cards.forEach(card => {
        const cardType = card.dataset.type;
        card.style.display = (type === 'all' || cardType === type) ? 'block' : 'none';
    });
}
