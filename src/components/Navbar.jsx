import { Link } from "react-router-dom"
import titleSound from "../media/title.mp3"
import battleSound from "../media/battle.mp3"
import { useRef, useState, useEffect } from "react"

export default function Navbar() {
  const titleAudio = useRef(new Audio(titleSound))
  const battleAudio = useRef(new Audio(battleSound))
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  function toggleAudio(target) {
    const audios = {
      title: titleAudio.current,
      battle: battleAudio.current
    }

    const selected = audios[target]

    if (currentlyPlaying === target) {
      selected.pause()
      selected.currentTime = 0
      setCurrentlyPlaying(null)
    } else {
      if (currentlyPlaying) {
        audios[currentlyPlaying].pause()
        audios[currentlyPlaying].currentTime = 0
      }
      selected.play()
      setCurrentlyPlaying(target)
    }
  }

  useEffect(() => {
    let flickerDiv = null
  
    if (currentlyPlaying === "battle") {
      flickerDiv = document.createElement("div")
      flickerDiv.className = "flicker-overlay"
      document.body.appendChild(flickerDiv)
  
      const timeout = setTimeout(() => {
        document.body.removeChild(flickerDiv)
      }, 2600)
  
      return () => {
        clearTimeout(timeout)
        if (flickerDiv && document.body.contains(flickerDiv)) {
          document.body.removeChild(flickerDiv)
        }
      }
    }
  }, [currentlyPlaying])
  

  return (
    <nav style={{
      padding: "1rem",
      borderBottom: "1px solid gray",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem"
    }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/about" className="nav-button">About</Link>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => toggleAudio("title")}
          title="Click here for nostalgia"
          className="nav-button"
        >
          🎵 Nostalgia
        </button>
        <button
          onClick={() => toggleAudio("battle")}
          title="Click here for hard nostalgia"
          className="nav-button"
        >
          🎶 Hard Nostalgia
        </button>
      </div>
    </nav>
  )
}
