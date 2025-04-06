import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'


import App from './App.jsx'
import PokedexPage from './pages/PokedexPage.jsx'
import PokemonDetailPage from './pages/PokemonDetailPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <PokedexPage /> },
      { path: '/pokemon/:id', element: <PokemonDetailPage /> },
      { path: '/about', element: <AboutPage /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
