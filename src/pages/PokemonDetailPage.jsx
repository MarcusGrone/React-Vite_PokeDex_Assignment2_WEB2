import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function PokemonDetailPage() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true)
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        if (!res.ok) throw new Error("Pokémon not found")
        const data = await res.json()
        setPokemon(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setPokemon(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [id])

  if (loading) return <p style={{ textAlign: 'center' }}>Loading Pokémon #{id}...</p>
  if (error) return <p style={{ textAlign: 'center' }}>Error: {error}</p>
  if (!pokemon) return null

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <h2>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{ imageRendering: "pixelated", width: "120px" }}
        />

        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Type(s):</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Base Stats</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
