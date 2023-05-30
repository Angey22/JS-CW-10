//! Видео - 0:37:20...0:00:00

// Подключаем объект из внешнего файла. 
import API from './api';


//! Проверяем как срабатывает подключаемая из файла "api.js" функция.
// API.getNews('js').then(console.log); //!!!

//! Проводим деструкторизацию получаемого от сервиса объекта и "вытягиваем" из него только одно свойство - "articles".
// API.getNews('js').then(({articles}) => console.log(articles)); //!!!


// Создаем переменную-ссылку на тег-<form>
const form = document.getElementById('form');

// Вешаем слушатель на форму по регистрации события "submit".
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const inputValue = form.elements.news.value;

    API.getNews(inputValue).then(({ articles }) => {
    if (articles.length === 0) { 
            throw new Error('No data');
        }

        // console.log(createMarkup(articles[0]));

        return articles.reduce((markup, article) => createMarkup(article) + markup, '');
    })
        .then(updateNewsList)
        .catch(onError)
        .finally(() => form.reset());
}

function createMarkup({ author, title, description, url, urlToImage }) {
    return `
    <div class="aricle-card">
        <h2 class="aricle-title">${title}</h2>
        <h3 class="aricle-author">${author || 'Anonym'}</h3>
        <img src="${urlToImage}" class="article-img">
        <p class="article-description">${description}</p>
        <a href="${url}" class="article-link" target="_blank">Read more</a>
    </div>
    `;
}

function updateNewsList(markup) {
    document.getElementById('articlesWrapper').innerHTML = markup;
}

function onError(err) {
    console.error(err);
    updateNewsList('<h1>Articles not foude</h1>')
}