const millisToMinutesAndSeconds = (millis) => {
    const minutes = parseInt(millis / 60000);
    const seconds = parseInt((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

module.exports = { millisToMinutesAndSeconds };
