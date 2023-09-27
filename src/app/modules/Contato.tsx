import { PhoneFilled, GithubOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";


export default function Contato () {
    return(
        <section className="border-t-4 border-white p-10 text-center">
          <PhoneFilled style={{ fontSize: '35px'}}/>
          <p>
            Está com <span className=" text-red-500">Dúvidas?</span>
          </p>
          <div>
            Fale com <strong>Josoel Vieira</strong>
            <p>Contato:</p>
            <a className="font-bold text-xl text-cyan-500" href="">
              (41) 99882-8433
            </a>
          </div>
          <div className="flex justify-center mt-10">
            <a href=""><GithubOutlined style={{ fontSize: '35px'}}/> </a>
            <a href=""><InstagramOutlined style={{ fontSize: '35px'}} className="mx-4"/> </a>
            <a href=""><WhatsAppOutlined style={{ fontSize: '35px'}} /></a>
            </div>
        </section>
    )
}