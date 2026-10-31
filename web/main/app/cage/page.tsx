"use client";

import { useEffect, useState } from "react";

export default function Cage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("/api/cage")
      .then((res) => {
        if (!res.ok) throw new Error("Falha na API");
        return res.json();
      })
      .then((data) => setImage(data.image))
      .catch(console.error);
  }, []);

  return image ? <img src={image} alt="Nicolas Cage" /> : <p></p>;
}
