let pokeList = []

window.onload = function () {

  const POKE_API = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150'

  // traduction de l'objet reçu en objet javascript

  fetch(POKE_API)
    .then(x => x.json())
    .then(y => {
      y.results.forEach(pokemon => {
        pokeList.push(pokemon)
      });

      generateCard()
    })
}

function generateCard() {

  console.log('pokeList :>> ', pokeList);

  pokeList.forEach(pokemon => {

    fetch(pokemon.url)
      .then(x => x.json())
      .then(pokeDetails => {
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
        divCard.classList.add('col-md-3', 'mb-3')
        divCard.classList.add('card')
        imgCard.classList.add('card-img-top')
        divBodyCard.classList.add('card-body')
        titleCard.classList.add('card-title')
        pCard.classList.add('card-text')

        // Paramétrer les attributs
        imgCard.setAttribute('src', pokeDetails.sprites.front_default)
        imgCard.setAttribute('alt', pokeDetails.name)

        // Paramétrer le texte des éléments
        titleCard.innerText = pokeDetails.id + '# ' + pokeDetails.name
        pCard.innerText = ''

        // Ajouter la card à la pokelist
        const pokeDiv = document.getElementById('pokeDiv')
        pokeDiv.appendChild(divCard)

        console.log("Card créée");
      })


  });

}