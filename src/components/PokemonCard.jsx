import { Link } from "react-router-dom"

export default function PokemonCard({ pokemon }) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      style={{
        display: "block",
        textAlign: "center",
        padding: "1rem",
        border: "1px solid gray",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="96"
        height="96"
      />
      <p>#{pokemon.id} {pokemon.name}</p>
    </Link>
  )
}
