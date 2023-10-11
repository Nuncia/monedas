const Card = ({item}) => {
  return (
        <div className="card  cardStyle shadow-sm p-3 mb-5" style={{width: '18rem'}}>
            <h2>{item.valor}</h2>
            <p >{item.nombre}</p>
            <div>
              {/* <p>{item.identificador}</p> */}
            </div>
        </div>
  );
}

export default Card;