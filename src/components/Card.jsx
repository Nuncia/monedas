import PropTypes from 'prop-types';

const Card = ({item}) => {
  return (
        <div className="card  cardStyle shadow-sm p-3 mb-3" style={{width: '18rem'}}>
            <h2 style={{color: 'green'}}>{item.valor}</h2>
            <p style={{color: 'rgb(175, 154, 67)', fontSize: '14px'}}>{item.nombre}</p>
        </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired
};

export default Card;