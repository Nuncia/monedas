import React from 'react'

const Buscador = ({busqueda, setBusqueda}) => {
    
  return (
    <div style={{display: 'flex',}}>
        <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
    </div>
  )
}

export default Buscador