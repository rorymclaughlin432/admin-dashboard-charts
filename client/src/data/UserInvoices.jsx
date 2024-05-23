import { useEffect, useState } from "react";

export default function UserInvoices() {
  const [records, setRecords] = useState([]);
  const reactUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${reactUrl}userInvoices/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length, reactUrl]);

  return records;

}