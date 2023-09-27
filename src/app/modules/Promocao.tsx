export default function Promocao() {
    return (
        <article className="p-4">
              <h2 className="my-4 text-3xl">
                <span className="bg-red-500 p-3 ">$</span> Promocao de numeros
              </h2>
              <ul className="border-s-2 p-4">
                <li className=" m-4">1 Numeros por R$45,00</li>
                <li className=" m-4">2 Numeros por R$82,00</li>
                <li className=" m-4">4 Numeros por R$150,00</li>
              </ul>
            </article>
    )
}