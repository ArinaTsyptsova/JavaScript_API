(function () {
    const apiKey = 'wBZBYNpXdRU9GJQK1GGtXCww-pGL2kxfCZUr3CJHkFU';

    async function loadRandomPhoto() {
        try {
            const response = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${apiKey}&orientation=landscape`,
                { mode: 'cors' }
            );
            const data = await response.json();

            // Изображение и автор
            document.getElementById('photo').src = data.urls.regular;
            document.getElementById('author').innerText = data.user.name;

            // Количество лайков из локального хранилища
            const likes = localStorage.getItem('likes');
            document.getElementById('likes').innerText = likes ? likes : 0;

            // Добавление изображения в историю просмотров
            addToHistory(data.urls.small, data.user.name);
        } catch (error) {
            console.error('Ошибка при получении фотографии:', error);
        }
    }

// Функция увеличения количества лайков
function incrementLikes() {
    const likesCount = parseInt(document.getElementById('likes').innerText) + 1;
    document.getElementById('likes').innerText = likesCount;
    localStorage.setItem('likes', likesCount);
}

// Функция добавления изображения в историю просмотров
function addToHistory(imageUrl, photographer) {
    const historyItems = JSON.parse(localStorage.getItem('history')) || [];

    // Ограничиваем историю до 5 последних изображений
    if (historyItems.length >= 5) {
        historyItems.shift(); // Удаляем самый старый элемент
    }

    // Добавляем новое изображение в начало массива
    historyItems.unshift({ imageUrl, photographer });

    // Сохраняем обновлённый массив в локальное хранилище
    localStorage.setItem('history', JSON.stringify(historyItems));

    renderHistory();
}

// Функция истории просмотров
function renderHistory() {
    const historyItems = JSON.parse(localStorage.getItem('history')) || [];
    const historyContainer = document.getElementById('history');

    historyContainer.innerHTML = '';

    historyItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';

        const photo = document.createElement('img');
        photo.src = item.imageUrl;
        photo.alt = 'Изображение';

        const authorSpan = document.createElement('span');
        authorSpan.textContent = `Фотограф: ${item.photographer}`;

        itemDiv.appendChild(photo);
        itemDiv.appendChild(authorSpan);
        historyContainer.appendChild(itemDiv);
    });
}

window.onload = loadRandomPhoto;

renderHistory();
})();