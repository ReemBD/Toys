export const storageService = {
    store,
    load,
    clear,
    saveToLocalStorage,
    loadFromLocalStorage
}


function clear() {
    sessionStorage.clear();
}

function store(key, value) {
    sessionStorage[key] = JSON.stringify(value);
}

function load(key, defaultValue = null) {
    var value = sessionStorage[key];
    if (!value) return defaultValue
    else return JSON.parse(value);
}
function saveToLocalStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromLocalStorage(key, defaultValue = null) {
    var value = localStorage[key];
    if (!value) return defaultValue
    else return JSON.parse(value);
}

