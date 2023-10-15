import { Chart as ChartJS, LineElement, PointElement, LineController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registro de componentes para el gráfico
ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

import PropTypes from 'prop-types';

const Grafico = ({ data }) => {
    // Aquí se extraen las fechas y los valores de la serie de datos de cada moneda
    const labels = data.map((item) => new Date(item.fecha).toLocaleDateString());
    const values = data.map((item) => item.valor);

    // Creamos un objeto de datos para pasarlos al gráfico
    const graficoDatos = {
        labels: labels,
        datasets: [
            {
                label: "Valor",
                data: values,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            }
        ]
    };

    // Configurando opciones para el gráfico
    const options = {
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                beginAtZero: false,
            },
        },
        plugins: {
          legend: {
              display: false
          }
      }
    };

    return (
        <div>
            <Line data={graficoDatos} options={options} />
        </div>
    );
};

Grafico.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Grafico;