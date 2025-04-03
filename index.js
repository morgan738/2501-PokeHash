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
    allPokeDiv.innerHTML = pokeList.join("")

    const name = window.location.hash.slice(1)
    console.log(name)

    const singlePoke = pokemons.find((poke) => {
        return poke.name === name
    })
    console.log(singlePoke)

    if(singlePoke){
        const pokeData = await fetch(singlePoke.url)
        const singlePokeData = await pokeData.json()
        console.log(singlePokeData)

        singlePokeDiv.innerHTML = `
            <h2>Selected Pokemon</h2>
            <h2>${singlePokeData.name}</h2>
            <img src=${singlePokeData.sprites.back_default} />
        `

    }

}

const fetchAllPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const data = await response.json()
    console.log(data.results)
    pokemons = data.results
    render()
}

fetchAllPokemons()