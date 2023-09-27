"use client"
import Carrosel from "./modules/Carrossel";
import Footer from "./modules/Footer";
import Contato from "./modules/Contato";
import Numeros from "./modules/Numeros";
import Promocao from "./modules/Promocao";
import Regulamento from "./modules/Regulamento";
import Titulo from "./modules/Titulo";
import Header from "./modules/Header";

export default function Home() {
  
  return (
    <div>

      <Header />

      <div className=" w-9/12 mx-auto">
        <main>
          <section>
            <Titulo titulo="PlayStation 5" />

            <div className="md:flex justify-center">

                <Carrosel />

              <Regulamento />

            </div>
          </section>
          <section>

            {/* <Promocao /> */}
            <Numeros />

          </section>
        </main>

        <Contato />

      </div>

      <Footer />

    </div>
  );
}

