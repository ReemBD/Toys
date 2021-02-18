export const utilService = {
    getRandomInt,
    makeId,
    formatTime
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 4) {
    var text = "";
    var possible = "1234567890";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return +text;
}

function formatTime(timestamp) {
    const date = new Date(timestamp).toLocaleDateString();
    return date;
}
