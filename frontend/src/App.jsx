import { useEffect, useState, useMemo } from 'react';
import './App.css';

const API_URL = 'http://127.0.0.1:3000/api/v1/transactions';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(transactions.map((t) => t.category).filter(Boolean))];
    return ['All', ...unique.sort()];
  }, [transactions]);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return transactions;
    return transactions.filter((t) => t.category === selectedCategory);
  }, [transactions, selectedCategory]);

  const spentByCategory = useMemo(() => {
    const totals = {};
    transactions.forEach((t) => {
      const amt = parseFloat(t.amount);
      if (amt < 0) {
        const cat = t.category || 'Uncategorized';
        totals[cat] = (totals[cat] || 0) + amt;
      }
    });
    return totals;
  }, [transactions]);

  return (
    <div className="app">
      <h1>Transactions</h1>

      <div className="controls">
        <label htmlFor="category-filter">Filter by category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading transactions...</div>}

      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="empty">No transactions found.</p>
          ) : (
            <ul className="transaction-list">
              {filtered.map((t, i) => (
                <li key={t.id ?? i} className="transaction-item">
                  <span className="description">{t.description}</span>
                  <span className={`amount ${parseFloat(t.amount) < 0 ? 'negative' : 'positive'}`}>
                    {parseFloat(t.amount).toFixed(2)}
                  </span>
                  <span className="category">{t.category}</span>
                  <span className={`status status--${t.status?.toLowerCase()}`}>{t.status}</span>
                </li>
              ))}
            </ul>
          )}

          {Object.keys(spentByCategory).length > 0 && (
            <div className="summary">
              <h2>Total Spent by Category</h2>
              <ul className="summary-list">
                {Object.entries(spentByCategory)
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([cat, total]) => (
                    <li key={cat}>
                      <span>{cat}:</span>
                      <span className="amount negative">{total.toFixed(2)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
