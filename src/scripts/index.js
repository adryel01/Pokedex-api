
async function renderizaPokemons() {
    const titleList = document.querySelector('#title-list')

    const ulTag = document.querySelector('ul')

    const listaDePokemons = await consomePokeAPI()

    titleList.innerHTML = 'Lista de Pokemons'

    listaDePokemons.results.forEach(pokemon => {
        const numeroNaPokedex = pokemon.url.slice(34, -1)



        ulTag.insertAdjacentHTML('beforeend', `
        <li id="${numeroNaPokedex}">
            <img src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemon.name}>
            <h3>${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h3>
        </li>
        `)
    });
    renderModal()

}
renderizaPokemons()


async function inputSearch() {
    const buttonSearch = document.querySelector('.button-search')
    const input = document.querySelector('input')
    const ulTag = document.querySelector('ul')
    const listaDePokemons = await consomePokeAPI()
    const pokemonSearch = await buscaPokeAPI(input.value)
    console.log(pokemonSearch)
    buttonSearch.addEventListener('click', (e) => {
        e.preventDefault()
    })
    input.addEventListener('input', async () => {
        const liTag = document.querySelectorAll('li')
        const ulTag = document.querySelector('ul')


        if (input.value.length == 0) {
            if (liTag != null) {
                liTag.forEach(element => element.remove())
            }
            renderizaPokemons()

        } else {
            const pokemonFound = await buscaPokeAPI(input.value)
            console.log(pokemonFound)
            const numeroNaPokedex = pokemonFound.id
            if (liTag != null) {
                liTag.forEach(element => element.remove())
            }

            liTag.forEach(element => element.remove())
            ulTag.insertAdjacentHTML('beforeend', `
                <li id='${numeroNaPokedex}'>
                    <img src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemonFound.name}>
                    <h3>${pokemonFound.name[0].toUpperCase() + pokemonFound.name.substring(1)}</h3>
                </li>
            `)

            const pokemonModal = document.querySelector('.pokemon-modal')
        }
        renderModal()
    })
}
inputSearch()

function renderModal() {
    const modalSection = document.querySelector('.modal-container')
    const pokemonModal = document.createElement('img')
    const listaPokedex = document.querySelectorAll('li')

    pokemonModal.src = ''

    listaPokedex.forEach(element => {
        element.addEventListener('click', async (e) => {
            
            const idPokemon = Number(e.currentTarget.id)
            console.log(e.currentTarget)
            const pokemonFound = await infoPokeAPI(idPokemon)
            const infoPokemon = document.createElement('div')
            modalSection.appendChild(infoPokemon)
            infoPokemon.classList.add('poke-info')

            pokemonModal.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${idPokemon}.gif`

            pokemonModal.classList.add('pokemon-modal')

            modalSection.append(pokemonModal)

            infoPokemon.insertAdjacentHTML("beforeend", `
            <p class="infos-pokemons">Nome: ${pokemonFound.name[0].toUpperCase() + pokemonFound.name.substring(1)}</p>
            <p class="infos-pokemons">Num.: #${pokemonFound.id}</p>
            <p class="infos-pokemons">Tipo: ${pokemonFound.types[0].type.name[0].toUpperCase() + pokemonFound.types[0].type.name.substring(1)}</p>
            <p class="infos-pokemons">Altura: ${parseFloat(pokemonFound.height) / 10} m</p>
            <p class="infos-pokemons">Peso: ${parseFloat(pokemonFound.weight) / 10} Kg</p>
            `)

            const eventModal = document.querySelector('.modal-bg')
            eventModal.classList.toggle('modal')

        })
    })
}

function closeModal() {
    const closeButton = document.querySelector('.modal-button')
    const eventModal = document.querySelector('.modal-bg')
    const infoPokemon = document.querySelector('.poke-info')

    closeButton.addEventListener('click', () => {
        const pokemonModal = document.querySelector('.pokemon-modal')
        pokemonModal.remove()
        eventModal.classList.toggle('modal')
        infoPokemon.remove()
    })
}
closeModal()