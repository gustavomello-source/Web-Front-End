document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const clearButton = document.getElementById('clear_button');
    const deleteAllButton = document.getElementById('delete_all_button');
    const searchInput = document.getElementById('search_input');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const discord = document.getElementById('discord').value;
        const email = document.getElementById('email').value;
        const options = document.getElementById('options').value;
        const comentary = document.getElementById('comentary').value;

        const formData = {
            username,
            discord,
            email,
            options,
            comentary,
            date: new Date().toLocaleString()
        };

        saveFormData(formData);

        form.reset();

        displaySubmittedData();
    });

    function saveFormData(formData) {
        if (typeof Storage !== 'undefined') {

            const storedData = JSON.parse(localStorage.getItem('formData')) || [];

            storedData.push(formData);

            localStorage.setItem('formData', JSON.stringify(storedData));
        } 
        
        else {
            console.error('LocalStorage is not supported');
        }
    }


    function displaySubmittedData() {
        const submittedDataContainer = document.getElementById('submitted_data');
        const storedData = JSON.parse(localStorage.getItem('formData'));

        if (submittedDataContainer && storedData) {
            submittedDataContainer.innerHTML = '<h2>Lista de Submissões:</h2><ul>';
            
            // Cria lista dos objetos armazenados
            storedData.forEach((data, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Data:</strong> ${data.date}<br>
                    <strong>Nome:</strong> ${data.username}<br>
                    <strong>Discord:</strong> ${data.discord}<br>
                    <strong>E-mail:</strong> ${data.email}<br>
                    <strong>Atividade Favorita:</strong> ${data.options}<br>
                    <strong>Comentário:</strong> ${data.comentary}<br>
                    <button class="delete_button" data-index="${index}">Excluir</button>
                    <br>
                    _____________
                    <br>
                `;
                submittedDataContainer.appendChild(listItem);
            });

            submittedDataContainer.innerHTML += '</ul>';
        }
    }

    displaySubmittedData();


    if (clearButton) {
        clearButton.addEventListener('click', function () {

            form.reset();

            const formsFooter = document.getElementById('forms_footer');
            formsFooter.innerHTML = '';

            const submittedDataContainer = document.getElementById('submitted_data');
            submittedDataContainer.innerHTML = '';
        });
    }


    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete_button')) {
            const index = event.target.getAttribute('data-index');
            deleteItem(index);
        }
    });


    function deleteItem(index) {
        const storedData = JSON.parse(localStorage.getItem('formData'));


        storedData.splice(index, 1);


        localStorage.setItem('formData', JSON.stringify(storedData));


        displaySubmittedData();
    }


    if (deleteAllButton) {
        deleteAllButton.addEventListener('click', function () {

            localStorage.removeItem('formData');

            const submittedDataContainer = document.getElementById('submitted_data');
            submittedDataContainer.innerHTML = '';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            searchItems(searchTerm);
        });
    }

    function searchItems(searchTerm) {
        const storedData = JSON.parse(localStorage.getItem('formData'));
        const submittedDataContainer = document.getElementById('submitted_data');

        if (storedData && submittedDataContainer) {
            submittedDataContainer.innerHTML = '<h1>Lista de Submissões:</h1><ul>';
            
            // Criar lista com itens
            storedData.forEach((data, index) => {
                const dataValues = Object.values(data).map(value => value.toString().toLowerCase());
                if (dataValues.some(value => value.includes(searchTerm))) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>Data:</strong> ${data.date}<br>
                        <strong>Nome:</strong> ${data.username}<br>
                        <strong>Discord:</strong> ${data.discord}<br>
                        <strong>E-mail:</strong> ${data.email}<br>
                        <strong>Atividade Favorita:</strong> ${data.options}<br>
                        <strong>Comentário:</strong> ${data.comentary}<br>
                        <button class="delete_button" data-index="${index}">Excluir</button>
                        -------------------------
                    `;
                    submittedDataContainer.appendChild(listItem);
                }
            });

            submittedDataContainer.innerHTML += '</ul>';
        }
    }
});

/*
Ao enviar os dados do formulário, esses deverão ser visualizados em uma lista,
contendo em cada linha a data de envio e ao menos 2 campos do formulário.
Essa lista deve ser apresentada logo abaixo do formulário ou em uma nova página.

Além da inclusão de um item na lista, também deverão ser criadas as seguintes
funcionalidades:
    ○ Opção de limpar campos do formulário;
    ○ Opção de excluir item da lista, excluindo da lista e do Local Storage;
    ○ Opção de excluir todos os itens da lista, excluindo da lista e do Local
Storage;
    ○ Opção de pesquisa dos itens da lista, permitindo ao usuário pesquisar um
dos campos do formulário.
    ● Para realizar tais funcionalidades, deverão ser utilizadas as API’s DOM HTML e Web
Storage. Qualquer outra biblioteca utilizada será desconsiderada da avaliação. Se
for constatada cópia de artefatos de outros projetos, será atribuída nota zero.
*/