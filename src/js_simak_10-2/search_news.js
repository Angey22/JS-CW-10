//! Видео - 0:17:45...0:00:00

// Импортируе класс из внешнего файла. 
import NewsApi from './NewsApi';
import LoadMoreBtn from './components/LoadMoreBtn';

// Создаем переменную-ссылку на тег-<form>
const form = document.getElementById('form');

// Создаем новый экземпляр класса.
const loadMoreBtn = new LoadMoreBtn('#loadMoreBtn');

// Вешаем слушатель на форму по регистрации события "submit".
form.addEventListener('submit', onSubmit);

// Вешаем слушатель на кнопку "Load more" по регистрации события "click".
loadMoreBtn.button.addEventListener('click', fetchNews);

// Создаем экземпляр класса.
const newsApi = new NewsApi();


function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    newsApi.serchQuery = form.elements.news.value.trim();
    clearNewsList();

    newsApi.resetPage();
    loadMoreBtn.show();
    fetchNews().finally(() => form.reset());
}

function fetchNews() {
    newsApi.getNews().then(({ articles }) => {
    
        if (articles.length === 0) throw new Error('No data');

        return articles.reduce((markup, article) => createMarkup(article) + markup, '');
    })
        .then(updateNewsList)
        .catch(onError);
}

function createMarkup({ author, title, description, url, urlToImage }) {
    return `
    <div class="aricle-card">
        <img src="${urlToImage}" class="article-img">
        <h2 class="aricle-title">${title}</h2>
        <h3 class="aricle-author">${author || 'Anonym'}</h3>
        <p class="article-description">${description}</p>
        <a href="${url}" class="article-link" target="_blank">Read more</a>
    </div>
    `;
}

function updateNewsList(markup) {
    document.getElementById('articlesWrapper').insertAdjacentHTML('beforeend', markup);
}

function clearNewsList() { 
    document.getElementById('articlesWrapper').innerHTML = '';
}

function onError(err) {
    console.error(err);
    updateNewsList('<h1>Articles not foude</h1>')
}

// Остановился на - 1:34:45, возникла ошибка и все сломалось...
