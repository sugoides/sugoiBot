export function formatTimestamp(date) {
    return `<t:${Math.floor(date.getTime() / 1000)}:R>`;
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
