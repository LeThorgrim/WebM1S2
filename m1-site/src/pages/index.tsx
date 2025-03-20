import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/hello") // Call backend API
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">{message || "Loading..."}</h1>
    </div>
  );
}
