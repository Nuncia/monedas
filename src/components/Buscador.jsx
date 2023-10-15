import PropTypes from 'prop-types';

const Buscador = ({ busqueda , setBusqueda}) => {
    
  return (
    <div style={{display: 'flex',}}>
        <input 
          className="form-control me-2" 
          type="search" 
          placeholder="Buscar..." 
          aria-label="Search" 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)}/>
    </div>
  )
};

Buscador.propTypes = {
  busqueda: PropTypes.string.isRequired,
  setBusqueda: PropTypes.func.isRequired,
};

export default Buscador