import { Chart as ChartJS, BarElement, Tooltip,Legend, CategoryScale, LinearScale } from 'chart.js';
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

const Grafico = (item) => {
    
      return (
        <div>
          <h2>Gráfico de Ventas Mensuales</h2>
          <Bar data={data} />
        </div>
      );
}

export default Grafico