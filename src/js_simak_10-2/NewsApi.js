const ENDPOINT = 'https://newsapi.org/v2/everything';
const API_KEY = 'af0e766a1ccf475588965f28a4346fe4';

// "dd82ff3604224bf1b224da3ef75c9135" - ipy Key from Simaka;
// "af0e766a1ccf475588965f28a4346fe4" - ipy Key from Leo;
// "4330ebfabc654a6992c2aa792f3173a3" - ipy Key from Repeta.

export default class NewsApi {
    constructor() {
        this.queryPage = 1;
        this.serchQuery = '';
    }

    getNews() { 
    const url = `${ENDPOINT}?q=${this.serchQuery}&pageSize=5&page=${this.queryPage}`;
    const options = {
        headers: {
            "X-Api-Key": API_KEY,
            },
        };
    return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            this.incrementPage();
            return data;
        });
    }

    resetPage() {
        this.queryPage = 1;
    }

    incrementPage() {
        this.queryPage += 1;
    }
}





