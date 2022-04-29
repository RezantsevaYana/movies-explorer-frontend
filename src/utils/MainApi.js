
// запросы к напсанному апи
export class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    };

    // регистрация 
    register({ email, password, name }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password, name }),
        }).then(this._checkResult)
    };

    // авторизация
    login({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(this._checkResult)
    };

    // проверка валидности токена и полученя email для вставки в шапку сайта
    checkToken = (jwt) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        }).then(this._checkResult);
    };

    // возвращает информацию о пользователе
    getUserInfo(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then(this._checkResult);
    };

    // обновляет информацию о пользователе (email и имя)
    updateUser({ jwt, name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                email: email,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(this._checkResult);
    };


    // удаляет сохранённый фильм по id
    deleteMovies({ movieId, jwt }) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        })
            .then(this._checkResult);
    }

    // сохраняет фильм
    savedMovies({ jwt, movie }) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: movie.trailerLink,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        }).then(this._checkResult);
    }

    // возвращает все сохранённые текущим  пользователем фильмы
    getSavedMovies(jwt) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        }).then(this._checkResult);
    }


    // проверка ответа
    _checkResult = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };
}


export const mainApi = new MainApi({
    baseUrl: 'https://api.rezantseva.movies.nomoredomains.xyz',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});
