import React, { useEffect, useState } from "react";
import Modal from "./Modal";


export default function Numeros() {
  const [resultado, setResultado] = useState<string>("");
  const [cpfPesquisado, setCpfPesquisado] = useState<string>("");
  const [numerosPorCpf, setNumerosPorcpf] = useState<NumeroRifa[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen1, setIsModalOpen1] = useState<boolean>(false);
  const [data, setData] = useState<NumeroRifa[]>([]);
  const [numeroSelecionado, setNumeroSelecionado] = useState<number | null>(null)

  function selecionarNumero(numero:number) {
    setNumeroSelecionado(numero)
    setIsModalOpen1(true) 
  }
  
  interface NumeroRifa {
    id: number;
    numero: number;
    tipo: "pago" | "disponivel" | "reservado";
    comprador: string;
    cpf: string;
    celular: number;
  }

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

  async function dados(): Promise<{ dados: NumeroRifa[] }> {
    const response = await fetch("http://localhost:3001/api/dados");
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dados();
        if (Array.isArray(response.dados) && response.dados.every(isNumeroRifa)) {
          setData(response.dados);
        } else {
          console.error("Dados inválidos");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const numerosRifa: NumeroRifa[] = data;

  function pago() {
    setResultado("pago");
  }
  function todos() {
    setResultado("");
  }
  function disponivel() {
    setResultado("disponivel");
  }
  function reservado() {
    setResultado("reservado");
  }

  const numero: NumeroRifa[] = numerosRifa.filter((numero) =>
    numero.tipo.toLowerCase().includes(resultado.toLowerCase())
  );

  function ocultaNumero(telefone: number) {
    if (telefone < 10) {
      return "Telefone inválido";
    }
    const primeirosDigitos = telefone.toString().substring(0, 4);
    const numerosOcultos = "***";
    const ultimosDigitos = telefone.toString().substring(7, 9);
    const numeroOculto = primeirosDigitos + numerosOcultos + ultimosDigitos;
    return numeroOculto;
  } 

 localStorage.setItem("cpf", cpfPesquisado )

  function pesquisaPorCpf() {
    const numerosPorCpf = numerosRifa.filter(
      (numero) => numero.cpf === cpfPesquisado
    );
    setNumerosPorcpf(numerosPorCpf);
    setIsModalOpen(true);
  }

  

  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);


  return (
    <article className="p-4 border-t-4 border-white m-4">
      <div className=" my-4 flex justify-center flex-wrap">
        <button className=" bg-white text-gray-950 p-4 m-2" onClick={todos}>
          Todos
        </button>
        <button className=" p-4 bg-red-600 m-2" onClick={pago}>
          Pago
        </button>
        <button className=" p-4 bg-slate-400 m-2" onClick={reservado}>
          Reservados
        </button>
        <button className=" p-4 bg-green-500 m-2" onClick={disponivel}>
          Disponivel
        </button>
        <button className="p-4 bg-amber-500  m-2" onClick={pesquisaPorCpf}>
          Meus numeros
        </button>

        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <h2>Estes são os números encontrados para o CPF {cpfPesquisado}</h2>

          <form action="" onSubmit={(e) => {e.preventDefault();
          pesquisaPorCpf()}}>
            <label htmlFor="cpf">CPF: </label>
            <input
              type="text"
              id="cpf"
              className="border m-4 p-2"
              value={cpfPesquisado}
              onChange={(e) => setCpfPesquisado(e.target.value)}
            />
            <button
              onClick={pesquisaPorCpf}
              className="bg-amber-500 p-2 text-white"
            >
              <strong>Pesquisar</strong>
            </button>
          </form>

          <ul className="flex flex-wrap mx-auto">
            {numerosPorCpf.map((numero) => (
              <li
                key={numero.id}
                className="text-center p-4 m-1 h-16 w-16 bg-red-500"
              >
                {numero.numero}
              </li>
            ))}
          </ul>

          <div className="flex justify-between m-4">
            <button className="bg-lime-500 p-4 text-white mx-4">
              <strong>Comprar</strong>
            </button>

            <button className="bg-red-500 p-4 text-white" onClick={() => setIsModalOpen(false)}>
              <strong>Fechar</strong>
            </button>
          </div>
        </Modal>
      </div>

      <ul className="flex flex-wrap mx-auto">
        {numero.map((numero) => {
          const isDisponivel = numero.tipo === "disponivel";
          const bgColorClass = isDisponivel
            ? "bg-green-500"
            : numero.tipo === "pago"
            ? "bg-red-600"
            : "bg-slate-400";

          return (
            <li
              key={numero.id}
              className={`text-center p-4 m-1 h-16 w-16 relative group ${bgColorClass}`}
            >
              {isDisponivel ? (
                <div>
                  <button onClick={() => selecionarNumero(numero.numero)}>{numero.numero}</button>
                  <Modal isOpen={isModalOpen1} closeModal={closeModal1}>
                    <h2 className="m-4">Comprar o numero</h2>
                   <div className="flex justify-center align-middle">  
                   <span className="text-white bg-lime-500 text-center p-4 m-1 h-16 w-16">{numeroSelecionado !== null ? numeroSelecionado: ''}</span>
                   </div>
                    <form action="" method="post" className="flex flex-col">
                      <label className="my-2">Nome Completo</label>
                      <input type="text" className="p-2"/>
                      <label className="my-2">E-mail</label>
                      <input type="email" className="p-2"/>
                      <label className="my-2">Confirme o E-mail</label>
                      <input type="email" className="p-2"/>
                      <label className="my-2">Telefone</label>
                      <input type="phone" className="p-2"/>
                    </form>
                    <div className="flex justify-between m-4">
                      <button className="bg-lime-500 p-4 text-white m-4">
                        <strong>Comprar</strong>
                      </button>

                      <button
                        className="bg-red-500 p-4 text-white m-4"
                        onClick={closeModal1}
                      >
                        <strong>Fechar</strong>
                      </button>
                    </div>
                  </Modal>
                </div>
              ) : (
                <span>{numero.numero}</span>
              )}
              {!isDisponivel && (
                <div className="hidden group-hover:block absolute z-50 border-2 border-white bg-red-600 text-white top-10 left-10 p-4">
                  {numero.tipo === "pago" ? (
                    <p>Comprador: {numero.comprador}</p>
                  ) : (
                    <p>Reservado: {numero.comprador}</p>
                  )}
                  <p>Telefone: {ocultaNumero(numero.celular)}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
