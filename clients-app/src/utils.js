export const fetchRequest = (url, successFunction, errorFunction) => {
    fetch(url)
    .then(res => res.json())
    .then(data => successFunction(data))
    .catch(e => errorFunction(e));
}