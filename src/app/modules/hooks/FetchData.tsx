import React, { useState, useEffect } from "react";

interface NumeroRifa {
    id: number;
    numero: number;
    tipo: "pago" | "disponivel" | "reservado";
    comprador: string;
    cpf: string;
    celular: number;
  }

function ParentComponent() {
  const [data, setData] = useState([]);
  
  function isNumeroRifa(obj: any): obj is NumeroRifa {
    return (
      obj &&
      typeof obj.id === "number" &&
      typeof obj.numero === "number" &&
      ["pago", "disponivel", "reservado"].includes(obj.tipo) &&
      typeof obj.comprador === "string" &&
      typeof obj.cpf === "string" &&
      typeof obj.celular === "number"
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/api/dados");
        const data = await response.json();
        if (Array.isArray(data) && data.every((item) => isNumeroRifa(item))) {
          setData(data);
        } else {
          console.error("Dados inválidos");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

}

export default ParentComponent;