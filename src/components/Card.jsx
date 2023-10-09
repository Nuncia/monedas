const Card = ({item}) => {
  return (
        <div className="card  cardStyle shadow-sm p-3 mb-5" >
            <p>{item.date}</p>
            <p className="">{item.title}</p>
            <div>
              <p>{item.extra}</p>
            </div>
        </div>
  );
}

export default Card;