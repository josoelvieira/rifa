import React, { useEffect, useState } from "react";
import Modal from "../modules/Modal";
import { DeleteOutlined } from "@ant-design/icons";

const API_URL = "http://localhost:3001/api/dados";

const NUMERO_MAXIMO = 100;

interface NumeroRifa {
  id: number;
  numero: number;
  tipo: "pago" | "disponivel" | "reservado";
  comprador: string;
  cpf: string;
  celular: number;
}

export default function Regulamento() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [numerosDisponiveis1, setNumerosDisponiveis1] = useState<number | null>(null);
  const [contador, setContador] = useState<number>(1);
  const [numerosSorteados, setNumerosSorteados] = useState<string[]>([]);
  const [data, setData] = useState<NumeroRifa[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const { dados } = await response.json();
        setData(dados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  const numerosRifa = data;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const arrayDisponiveis = numerosRifa.filter((numero) =>
    numero.tipo.toLocaleLowerCase().includes("disponivel")
  );

  function inc() {
    if (contador < NUMERO_MAXIMO) {
      setContador(contador + 1);
    }
  }

  function dec() {
    if (contador > 1) {
      setContador(contador - 1);
    }
  }

  function comprarAleatorio() {
    if (arrayDisponiveis.length < contador) {
      alert("Não há números suficientes para sortear.");
      return;
    }
    const numerosSorteados = [];

    const numerosDisponiveis = [...arrayDisponiveis];

    for (let i = 0; i < contador; i++) {
      const indiceSorteado = Math.floor(
        Math.random() * numerosDisponiveis.length
      );
      const numeroSorteado = numerosDisponiveis.splice(indiceSorteado, 1)[0];
      numerosSorteados.push(numeroSorteado.numero.toString());
    }

    setNumerosSorteados(numerosSorteados);
    openModal();
  }

  function comprarUm() {
    if (arrayDisponiveis.length === 0) {
      alert("Não há números disponíveis para sortear.");
      return;
    }

    const numeroSorteado = arrayDisponiveis[0].numero;
    setNumerosDisponiveis1(numeroSorteado);
    openModal2();
  }
  function handleDelete(numero: string) {
    const updatedNumerosSorteados = numerosSorteados.filter(
      (num) => num !== numero
    );
    setNumerosSorteados(updatedNumerosSorteados);
  }

  return (
      <article className="mx-4 w-full h-full mt-4 text-slate-950">
      <div className="bg-slate-100 p-4 ">
      
        <button
          onClick={comprarUm}
          className=" bg-lime-600 text-white block px-10 py-4 my-4 uppercase underline decoration-2 mx-auto"
        >
          <strong>Compre agora R$38</strong>
        </button>
        <p className="overflow-y-auto h-60">
          REGULAMENTO O Primeiro Prêmio leva um Ps5 novo lacrado na caixa. A
          DATA do SORTEIO será marcado após à venda e pagamento de todos os
          bilhetes! A data será previamente anunciada nos grupos de WhatsApp e
          Instagram da @Minhasorte. Os PAGAMENTOS podem ocorrer de 2 formas: 1)
          Para os transferências feita por PIX (fora do site) é necessário o
          envio do comprovante de transferência para o WhatsApp 41 99882-8433
          para que o mesmo seja computado para o comprador. 2) Para os
          pagamentos feitos pelo site, sendo PIX ou Cartões de credito NÃO é
          necessário o envio do comprovante, já que a baixa ocorrerá
          automaticamente. Números reservados e não pagos no prazo, serão
          liberados sem aviso prévio e AUTOMATICAMENTE BLOQUEADOS pelo sistema,
          não podendo participar novamente, SÓ RESERVE SE FOR FAZER O PAGAMENTO
          DENTRO DO PRAZO! A Rifa é composta por 100 bilhetes (000-99) sendo
          cada bilhete no valor de: 1 numero R$ 45,00 reais; promocionalmente 2
          numeros por R$ 82,00 reais, 5 numeros por R$ 180,00 reais e 10 numeros
          por R$ 390 reais. O SORTEIO será pela Loteria Federal, com base na
          extração seguinte à venda e pagamento de todos os bilhetes. O
          resultado da Loteria Federal poderá ser consultado no site da Caixa
          Econômica Federal ou solicitado em qualquer Casa Lotérica; O número
          contemplado será à primeira centena sorteada; Exemplo: 1º Prêmio:
          20761 2º Prêmio: 12767 3º Prêmio: 90821 4º Prêmio: 34238 5º Prêmio:
          21344 Na demonstração acima, o bilhete contemplado seria o 761! O
          carro se encontra em Curitiba Paraná e será entregue “no estado em que
          se encontra” e sem garantia; Após o sorteio o ganhador será contatado
          pelo telefone cadastrado no momento da compra. À retirada do prêmio,
          custas com transferência de propriedade e transporte ficam por conta
          do ganhador. Administração contato: 41 – 99882-8433 Boa sorte a todos!
        </p>
        <Modal isOpen={isModalOpen2} closeModal={closeModal2}>
          <h2>Este e o seu numero</h2>
          <ul className="flex flex-wrap justify-center">
            <li className="text-center p-4 m-1  bg-lime-500 flex">{numerosDisponiveis1}</li>
          </ul>
          <form action="" method="post" className="flex flex-col m-2">
                      <label className="my-2">Nome Completo</label>
                      <input type="text" className="p-2"/>
                      <label className="my-2">E-mail</label>
                      <input type="email" className="p-2"/>
                      <label className="my-2">Confirme o E-mail</label>
                      <input type="email" className="p-2"/>
                      <label className="my-2">Telefone</label>
                      <input type="phone" className="p-2"/>
                    </form>
          <div className="flex justify-center m-4">
            <button className="bg-lime-500 p-4 mx-4 text-white">
              <strong>Comprar</strong>
            </button>

            <button className="bg-red-500 p-4 text-white" onClick={closeModal2}>
              <strong>Fechar</strong>
            </button>
          </div>
        </Modal>

      </div>
      <div className="my-4 text-center flex flex-col justify-center text-white">
        <p>
          <strong>Compra Aleatória</strong>
        </p>
        <p>O site escolhe números aleatórios para você.</p>
        <div className="flex mx-auto">
          <button className=" bg-lime-500 p-4" onClick={inc}>
            +
          </button>
          <span className="w-full mx-4  py-4 px-20 bg-white text-black">{contador}</span>
          <button className=" bg-red-500 p-4" onClick={dec}>
            -
          </button>
        </div>
        <button onClick={comprarAleatorio} className="p-4 bg-amber-500 my-4">
          <strong>Comprar</strong>
        </button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>Estes foram os numeros aleatorios gerados pelo site:</h2>
        <ul className="flex flex-wrap justify-between">
          {numerosSorteados.map((numero) => (
            <li
              className="p-4 m-1 bg-lime-500 flex"
              key={numero}
            >
              {numero}<button onClick={() => handleDelete(numero)}><DeleteOutlined className="mx-2"/></button>
            </li>
          ))}
        </ul>
        <form action="" method="post" className="flex flex-col m-2">
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
          <button className="bg-lime-500 p-4 mx-4 text-white">
            <strong>Comprar</strong>
          </button>

          <button className="bg-red-500 p-4 text-white" onClick={closeModal}>
            <strong>Fechar</strong>
          </button>
        </div>
      </Modal>
    </article>
  );
}

