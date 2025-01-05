import axios from "axios";
import { useEffect, useState } from "react";

export default function Hello() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function getMessage() {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL+'/';
        const res = await axios.get(url);
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
      }
    }
    getMessage();
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}