let pokeList = []

const limitFilter = document.getElementById('limitFilter')
const filterBtn = document.getElementById('filterBtn')



filterBtn.addEventListener('click', (event) => {
  event.preventDefault()
  changeLimitFilter()
})

let limit = limitFilter.value

window.onload = async function () {
  refreshCards()
}

async function getPokeJSON(url) {
  return fetch(url)
    .then(response => response.json())
    .then(pokeAPI => pokeAPI)
}

async function getPokeDetailsJSON(pokemon) {
  return fetch(pokemon.url)
    .then(x => x.json())
    .then(pokeDetails => pokeDetails)
}

async function getAllPokeDetailsJSON(url) {
  return fetch(url)
    .then(x => x.json())
    .then(allDetails => allDetails)
}

async function getTypes(url) {
  return fetch(url)
    .then(x => x.json())
    .then(types => types)
}


async function generateCard() {

  for (const pokemon of pokeList) {

    // Création des éléments HTML
    const divCol = document.createElement('div')
    const divCard = document.createElement('div')
    const imgCard = document.createElement('img')
    const divBodyCard = document.createElement('div')
    const titleCard = document.createElement('h5')
    const pCard = document.createElement('p')

    // Insérer les éléments dans les autres
    divCol.appendChild(divCard)
    divCard.appendChild(imgCard)
    divCard.appendChild(divBodyCard)
    divBodyCard.appendChild(titleCard)
    divBodyCard.appendChild(pCard)

    // Paramétrer les classes
    divCard.classList.add('col-md-2', 'mb-3')
    divCard.classList.add('card')
    imgCard.classList.add('card-img-top')
    divBodyCard.classList.add('card-body')
    titleCard.classList.add('card-title')
    pCard.classList.add('card-text')

    // Paramétrer les attributs
    imgCard.setAttribute('src', pokemon.details.sprites.front_default)
    imgCard.setAttribute('alt', pokemon.name)

    // Paramétrer le texte des éléments
    titleCard.innerHTML = pokemon.details.id + '# <br>'

    pokemon.allDetails.names.forEach(name => {
      if (name.language.name == 'fr') titleCard.innerHTML += name.name 
    });

    pCard.innerText = 'item'

    // Ajouter la card à la pokelist
    const pokeDiv = document.getElementById('pokeDiv')
    pokeDiv.appendChild(divCard)
  }
}


function changeLimitFilter() {
  limit = limitFilter.value !== '' ? limitFilter.value : 1
  refreshView()
  refreshCards()
}

async function initPokeList() {
  const POKE_API = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`

  const pokeJson = await getPokeJSON(POKE_API)

  limitFilter.setAttribute('max', pokeJson.count)
  limitFilter.setAttribute('min', 1)
  limitFilter.placeholder = 'max: ' + pokeJson.count


  for (const pokemon of pokeJson.results) {
    const pokeDetails = await getPokeDetailsJSON(pokemon)
    const allDetails = await getAllPokeDetailsJSON(pokeDetails.species.url)
    
    pokeList.push(
      { name: pokemon.name, url: pokemon.url, details: pokeDetails, allDetails: allDetails }
    )

  }
}

async function refreshCards() {
  await initPokeList()
  generateCard()
}

function refreshView() {
  const pokeDiv = document.getElementById('pokeDiv')
  while (pokeDiv.firstChild) {
    pokeDiv.removeChild(pokeDiv.firstChild)
  }
  pokeList = []
}