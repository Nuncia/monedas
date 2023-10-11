const Card = ({item}) => {
  return (
        <div className="card  cardStyle shadow-sm p-3 mb-5" >
            <h2>{item.codigo}</h2>
            <p className="">{item.nombre}</p>
            <div>
              <p>{item.valor}</p>
            </div>
        </div>
  );
}

export default Card;