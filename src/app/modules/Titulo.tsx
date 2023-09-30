interface TituloProps {
    titulo: string;
}

export default function Titulo(props: TituloProps) {

    
    return (
        <h1 className=" text-center text-4xl my-4">{props.titulo}</h1>
    )
    
}