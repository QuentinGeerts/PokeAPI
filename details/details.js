const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const pokemonName = urlParams.get('pokemon')

console.log(queryString)
console.log(pokemonName);



