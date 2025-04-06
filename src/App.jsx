import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useState, useEffect } from "react"

export default function App() {
  const [battleMode, setBattleMode] = useState(false)

  useEffect(() => {
    const handleBattleToggle = (e) => {
      setBattleMode(e.detail === "on")
    }
    window.addEventListener("battle-mode", handleBattleToggle)
    return () => window.removeEventListener("battle-mode", handleBattleToggle)
  }, [])
  return (
    <>
      {battleMode && <div className="flicker-overlay" />}
      <Navbar />
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        minHeight: "100vh",
        padding: "1rem",
        boxSizing: "border-box"
      }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <Outlet />
        </div>
      </div>
    </>
  )
  
}
