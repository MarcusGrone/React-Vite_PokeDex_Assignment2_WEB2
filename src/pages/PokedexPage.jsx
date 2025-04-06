import { useEffect, useState } from "react"
import PokemonCard from "../components/PokemonCard"
import PaginationControls from "../components/PaginationControls"
import TypeFilter from "../components/TypeFilter"

const POKEMON_PER_PAGE = 15
const MAX_POKEMON_ID = 151

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [types, setTypes] = useState([])
  const [selectedType, setSelectedType] = useState("all")


  useEffect(() => {
    async function fetchTypes() {
      const res = await fetch("https://pokeapi.co/api/v2/type")
      const data = await res.json()
      setTypes(
        data.results
          .map(t => t.name)
          .filter(name => !["dark", "stellar", "unknown"].includes(name))
      )
    }
    fetchTypes()
  }, [])
  


  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true)
      try {
        if (selectedType !== "all") {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
          const data = await res.json()
          const filteredPokemon = data.pokemon.map(p => p.pokemon).slice(0, MAX_POKEMON_ID)

          const detailedPromises = filteredPokemon.map(p =>
            fetch(p.url).then(res => res.json())
          )
          const detailed = await Promise.all(detailedPromises)
          const filteredGen1 = detailed.filter(p => p.id <= MAX_POKEMON_ID)
          setPokemonList(filteredGen1)
          setTotalPages(1)
        } else {
          const offset = currentPage * POKEMON_PER_PAGE
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`)
          const data = await res.json()

          setTotalPages(Math.ceil(MAX_POKEMON_ID / POKEMON_PER_PAGE))

          const detailedPromises = data.results.map(p =>
            fetch(p.url).then(res => res.json())
          )
          const detailed = await Promise.all(detailedPromises)
          const filtered = detailed.filter(p => p.id <= MAX_POKEMON_ID)
          setPokemonList(filtered)
        }
      } catch (err) {
        console.error("Failed to fetch Pokémon:", err)
      }
      setLoading(false)
    }

    fetchPokemon()
  }, [currentPage, selectedType])

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <TypeFilter
          types={types}
          selectedType={selectedType}
          onTypeSelect={(type) => {
            setSelectedType(type)
            setCurrentPage(0)
          }}
        />
  
        <main style={{ flex: 1 }}>
          <h2>Pokédex {selectedType !== "all" && `— ${selectedType}`}</h2>
  
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          }}>
            {pokemonList.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
  
          {selectedType === "all" && (
            <PaginationControls
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  )
}
