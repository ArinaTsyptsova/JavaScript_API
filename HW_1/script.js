// Загружаем данные о занятиях
fetch('classes.json')
    .then(response => response.json())
    .then(classes => {
        // Отображаем занятия на странице
        displayClasses(classes);
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });

// Функция для отображения занятий
function displayClasses(classes) {
    const scheduleElement = document.getElementById('schedule');
    classes.forEach(classObj => {
        const card = document.createElement('div');
        card.className = 'card mb-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = classObj.name;

        const time = document.createElement('p');
        time.className = 'card-text';
        time.textContent = `Время: ${classObj.time}`;

        const participants = document.createElement('p');
        participants.className = 'card-text';
        participants.textContent = `Участники: ${classObj.currentParticipants}/${classObj.maxParticipants}`;

        const registerButton = document.createElement('button');
        registerButton.className = 'btn btn-primary';
        registerButton.textContent = 'Записаться';
        registerButton.disabled = classObj.currentParticipants >= classObj.maxParticipants;
        registerButton.addEventListener('click', () => {
            if (classObj.currentParticipants < classObj.maxParticipants) {
                classObj.currentParticipants++;
                updateClassInfo(classObj);
                participants.textContent = `Участники: ${classObj.currentParticipants}/${classObj.maxParticipants}`;
                registerButton.disabled = classObj.currentParticipants >= classObj.maxParticipants;
            }
        });

        const unregisterButton = document.createElement('button');
        unregisterButton.className = 'btn btn-danger ms-2';
        unregisterButton.textContent = 'Отменить запись';
        unregisterButton.addEventListener('click', () => {
            if (classObj.currentParticipants > 0) {
                classObj.currentParticipants--;
                updateClassInfo(classObj);
                participants.textContent = `Участники: ${classObj.currentParticipants}/${classObj.maxParticipants}`;
                registerButton.disabled = classObj.currentParticipants >= classObj.maxParticipants;
            }
        });

        cardBody.appendChild(title);
        cardBody.appendChild(time);
        cardBody.appendChild(participants);
        cardBody.appendChild(registerButton);
        cardBody.appendChild(unregisterButton);
        card.appendChild(cardBody);
        scheduleElement.appendChild(card);
    });
}

// Функция для обновления информации о занятии
function updateClassInfo(classObj) {
    fetch('classes.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classObj)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при обновлении данных');
        }
    }).catch(error => {
        console.error('Ошибка при обновлении данных:', error);
    });
}