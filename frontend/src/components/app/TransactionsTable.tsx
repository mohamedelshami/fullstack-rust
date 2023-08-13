import Link from "next/link";
import React, { useState, useEffect } from "react";

// Define TypeScript interfaces
interface ITransaction {
  _id: {
    $oid: string;
  };
  sender: string;
  receiver: string;
  amount: number;
  transaction_type: string;
}

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  //console.log(`http://${publicRuntimeConfig}/transactions`)
  useEffect(() => {
    fetch(`http://localhost:8787/transactions`, {
      /*headers: {
          'Content-Type': 'application/json', // TODO: Allow json content type in Axum Cors policy
        },*/
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!transactions) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transactions</h1>
      <table className="border border-sky-500">
        <thead className="border border-sky-500">
          <tr className="border border-sky-500">
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody className="border border-sky-500">
          {transactions.map((transaction) => (
            <tr className="border border-sky-500" key={transaction._id.$oid}>
              <td>
                <Link href={`/transaction_detail/${transaction._id.$oid}`}>
                  {transaction._id.$oid}
                </Link>
              </td>
              <td>{transaction.sender}</td>
              <td>{transaction.receiver}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transaction_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
