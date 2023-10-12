const Card = ({item}) => {
  return (
        <div className="card  cardStyle shadow-sm p-3 mb-3" style={{width: '18rem'}}>
            <h2 style={{color: 'green'}}>{item.valor}</h2>
            <p style={{color: 'yellow', fontSize: '14px'}}>{item.nombre}</p>
            <div>
              {/* <p>{item.identificador}</p> */}
            </div>
        </div>
  );
}

export default Card;