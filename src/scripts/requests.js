
async function consomePokeAPI() {
    const loading = document.querySelector('#loading')

    const pokemonsDaAPI = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
    .then(response => response.json())
    .catch(error => console.log(error))

    loading.classList.add('hidden')

    return pokemonsDaAPI
}
consomePokeAPI()


async function buscaPokeAPI (inputValue){
    

    const endPoint = inputValue.toLowerCase().trim()
    const pokemonSearch = await fetch(`https://pokeapi.co/api/v2/pokemon/${endPoint}`)
    .then(resp => resp.json())
    .catch(error => console.log(error))

    
    return pokemonSearch
}


async function infoPokeAPI (inputValue){
    const loading2 = document.querySelector('#loading-2')
    // const loading3 = document.querySelector('#loading-3')
    
    const endPoint = inputValue
    const pokemonSearch = await fetch(`https://pokeapi.co/api/v2/pokemon/${endPoint}`)
    .then(resp => resp.json())
    .catch(error => console.log(error))

    loading2.classList.add('hidden')
    // loading3.classList.add('hidden')
    return pokemonSearch
}