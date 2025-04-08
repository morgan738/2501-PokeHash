const allPokeDiv = document.querySelector("#allPoke")
const singlePokeDiv = document.querySelector("#singlePoke")

let pokemons = []

window.addEventListener("hashchange", () => {
    render()
})

const render = async () => {
    const pokeList = pokemons.map((poke) => {
        return `
            <a href=#${poke.name} >${poke.name}</a>
        `
    })
    

    const name = window.location.hash.slice(1)
    console.log(name)

    const singlePoke = pokemons.find((poke) => {
        return poke.name === name
    })
    console.log(singlePoke)

    //if i found a single pokemon empty the allpokediv
    //else show me the list of pokemon

    allPokeDiv.innerHTML = singlePoke ? fetchSinglePokemon(singlePoke) : `<div id="pokeContainer">${pokeList.join("")}</div>`

}

const fetchAllPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=251&offset=0")
    const data = await response.json()
    console.log(data.results)
    //pokemons = data.results
    return data.results
    
}

const fetchSinglePokemon = async (singlePoke) => {

        const pokeData = await fetch(singlePoke.url)
        const singlePokeData = await pokeData.json()
        console.log(singlePokeData)
        renderSinglePokemon(singlePokeData)
       
}

const renderSinglePokemon = (singlePokeData) => {
     //console.log(singlePokeData.abilities)
     const abilites = singlePokeData.abilities.map((ability) => {
        //console.log(ability.ability.name)
        return `<p>${ability.ability.name}</p>`
    })

    allPokeDiv.innerHTML = `
        <h2>Selected Pokemon</h2>
        <h2>${singlePokeData.name}</h2>
        <img src=${singlePokeData.sprites.back_default} />
        <h3>Abilites: <h3>
    ` + abilites.join("") + `
        <p>Generation: ${singlePokeData.id*1 <= 151 ? "1": "2"}</p>
        <a href=#>Back to all Pokemon</a>
    `

}

const init = async () => {
    const pokeData = await fetchAllPokemons()
    console.log(pokeData)
    pokemons = pokeData
    render()
}
init()
