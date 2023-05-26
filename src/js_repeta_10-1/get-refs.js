// Пишем код функции, которая будет экспортировать объект с набором ссылок на элементы находящиеся в HTML документе.
export default function getRefs() {
  return {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form'),
  };
}
