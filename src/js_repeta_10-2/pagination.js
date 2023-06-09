//! Видео - 0:00:00...1:41:02

/*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

import articlesTpl from '../templates/articles.hbs';
import '../css/common.css';
import NewsApiService from '../js_repeta_10-2/news-service';
import LoadMoreBtn from '../js_repeta_10-2/components/load-more-btn';

//!============================================================

//! Документация сервиса - https://newsapi.org/docs/endpoints/everything

// Создаем переменную "options" для функции "fetch()", внутрь которой закладываем свойство заголовок - "headers" с обязательным для данного сервиса - ключом авторизации.
const options = {
  headers: {
    Authorization: '4330ebfabc654a6992c2aa792f3173a3',
  },
};

// Пишем код запроса с доп. параметром поиска "?q=cat", т.е. ищем любые статьи по ключевому слову "cat".
fetch('https://newsapi.org/v2/everything?q=cat', options).then(r => r.json()).then(a => console.log('"?q=cat" =>', a));

// Пишем код запроса с доп. параметрами поиска "?q=cat&language=ru", т.е. ищем любые статьи по ключевому слову "cat" на русском языке.
fetch('https://newsapi.org/v2/everything?q=cat&language=ru', options).then(r => r.json()).then(a => console.log('"?q=cat&language=ru" =>', a));

// Пишем код запроса с доп. параметрами поиска "?q=cat&language=ru&pageSize=5", т.е. ищем любые статьи по ключевому слову "cat" на русском языке, и просим первые пять найденных статей.
fetch('https://newsapi.org/v2/everything?q=cat&language=ru&pageSize=5', options).then(r => r.json()).then(a => console.log('"?q=cat&language=ru&pageSize=5" =>', a));

// Пишем код запроса с доп. параметрами поиска "?q=cat&language=ru&pageSize=5&page=2", т.е. ищем любые статьи по ключевому слову "cat" на русском языке, и просим следующие, после первых пяти найденых - пять статей.
fetch('https://newsapi.org/v2/everything?q=cat&language=ru&pageSize=5&page=2', options).then(r => r.json()).then(a => console.log('"?q=cat&language=ru&pageSize=5&page=2" =>', a));

//!============================================================

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
