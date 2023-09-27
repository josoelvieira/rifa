export default function Header() {
    return (
        <header className="order-last flex justify-between borded align-middle">
        <span className="md:mt-10 mt-4 ms-10 text-4xl font-serif">MinhaSorte rifas</span>
        <nav className="m-4">
          <ul className="flex flex-row">
            <li className="block bg-slate-500 p-4 basis-3 shadow hover:shadow-lg">
              <a href="">Home</a>
            </li>
            <li className="block bg-slate-500 mx-2 p-4 shadow hover:shadow-lg">
              <a href="">Sorteados</a>
            </li>
            <li className="block bg-slate-500 p-4 shadow hover:shadow-lg">
              <a href="">Contato</a>
            </li>
          </ul>
        </nav>
      </header>
    )
}