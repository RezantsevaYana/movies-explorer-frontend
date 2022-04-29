// запросы к стороннему апи
class MoviesApi {
    constructor({ headers }) {
        this._headers = headers;
    };

    // запрос, который рендерит фильмы на основную страницу
    getInitialCards() {
        return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
            headers: this._headers
        })
            .then(this._checkResult);
    }


    // проверка ответа
    _checkResult = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}


const moviesApi = new MoviesApi({
    headers: { 'Content-Type': 'application/json' }
});

export default moviesApi;