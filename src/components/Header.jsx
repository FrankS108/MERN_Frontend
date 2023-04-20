import React from 'react'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div className="header__block ">
        <p className="header__title">NotesAPP</p>
        <div className="navegation__block">
            <Link to="/users" className="navegation__link">Crear Usuario</Link>
            <Link to="/create" className="navegation__link">Crear Notas</Link>
            <Link to="/" className="navegation__link">Ver Notas</Link>
        </div>
    </div>
  )
}
