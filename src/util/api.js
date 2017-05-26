function buildHeaders() {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
}

function handleErrors(response) {
    if (!response.ok) {
        return response.json()
            .catch(() => Promise.reject({ message: response.statusText }))
            .then((res) => Promise.reject({ message: response.message }));
    }
    return response;
}

export function getPeople() {
    return fetch(`http://swapi.co/api/people/`, {
        method: 'GET',
        headers: buildHeaders()
    }).then(handleErrors)
        .then((response) => response.json());
}

export function callRoute(route) {
    return fetch(route, {
        method: 'GET',
        headers: buildHeaders()
    }).then(handleErrors)
        .then((response) => response.json());
}

export function searchPeople(name) {
    return fetch(`https://swapi.co/api/people/?search=${name}`, {
        method: 'GET',
        headers: buildHeaders()
    }).then(handleErrors)
        .then((response) => response.json());
}

export function getPerson(id) {
    return fetch(`http://swapi.co/api/people/${id}/`, {
        method: 'GET',
        headers: buildHeaders()
    }).then(handleErrors)
        .then((response) => response.json());
}