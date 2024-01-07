import React, { useEffect, useState } from "react";
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,  
  Legend,  
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,  
  Legend,  
)

const Chart = ({ yearSelected }) => {
  const [transactions, setTransaction] = useState([]);
  const revenues = [
    {
      month: 1,
      amount: 0
    },
    {
      month: 2,
      amount: 0
    },
    {
      month: 3,
      amount: 0
    },
    {
      month: 4,
      amount: 0
    },
    {
      month: 5,
      amount: 0
    },
    {
      month: 6,
      amount: 0
    },
    {
      month: 7,
      amount: 0
    },
    {
      month: 8,
      amount: 0
    },
    {
      month: 9,
      amount: 0
    },
    {
      month: 10,
      amount: 0
    },
    {
      month: 11,
      amount: 0
    },
    {
      month: 12,
      amount: 0
    },
  ];

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/transactions");
        setTransaction(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTransaction();
  }, []);

  transactions.map((tran) => {
    const month = new Date(tran.created_at).getMonth(2);
    const year = new Date(tran.created_at).getFullYear(4);    
    const item = revenues.find((item) => item.month === month+1);
    if (item && year === 2023) {
      item.amount += tran.tran_total;
    }
    return revenues;
  })

  var data = {
    labels: revenues.map( x => "Tháng " + x.month),
    datasets: [{
      label: `${revenues.length} tháng`,
      data: revenues.map( x => x.amount),
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }]
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,       
        position: 'top',                
      }
    },
  }
    return (
        <div>
            <Bar
              data={data}
              height={400}              
              options={options}
            />
        </div>
    );
}

export default Chart;