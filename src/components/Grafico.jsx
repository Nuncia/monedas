import { Chart as ChartJS, BarElement, Tooltip,Legend, CategoryScale, LinearScale } from 'chart.js';
import {Bar, Line} from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
);

const Grafico = () => {
    let data = {
        type: 'line',
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Historico Monedas",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: [65, 59, 80, 81, 56],
          },
        ],
      };

      return (
        <div>
          {/* <h2>Gráfico de Ventas Mensuales</h2> */}
          <Bar data={data} />
        </div>
      );
}

export default Grafico