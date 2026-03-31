import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://127.0.0.1:3000/api/v1/transactions";

function App() {
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
        .then(res => settransactions(res.data))
        .catch(err => console.error(err));
  }, []);

  return (
      <div>
        <h1>transactions from Rails API</h1>
        {transactions.map(transaction => (
            <div key={transaction.description}>
                <ol>
                    <li>{transaction.description}</li>
                    <li>{transaction.amount}</li>
                    <li>{transaction.status}</li>
                    <li>{transaction.category}</li>
                </ol>
            </div>
        ))}
      </div>
  );
}

export default App;
