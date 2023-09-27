import { FC, useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";

interface Slide {
  url: string;
}

const Carrosel: FC = () => {
  // Defina os slides
  const slides: Slide[] = [
    {
      url:
        "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1307&q=80",
    },
    {
      url:
        "https://images.unsplash.com/photo-1605296830714-7c02e14957ac?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    },
    {
      url:
        "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Função para navegar para o slide anterior
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setPreviewIndex(newIndex);
  };

  // Função para navegar para o próximo slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setPreviewIndex(newIndex);
  };

  // Função para navegar diretamente para um slide
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setPreviewIndex(slideIndex);
  };

  // Função para avançar automaticamente os slides
  const autoAdvanceSlide = () => {
    nextSlide();
  };

  // Efeito para avançar automaticamente os slides a cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(autoAdvanceSlide, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [autoAdvanceSlide, currentIndex]);

  return (
    <div className="md:w-full max-w-[1400px] h-[600px] px-4 m-4 mb-28 relative group">
      {/* Slide atual */}
      <div className="w-full h-full bg-center bg-cover duration-500">
        <Image
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
        />
      </div>

      {/* Botões de navegação */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5  text-2xl rounded-full p-3 bg-black/20 text-white cursor-pointer">
        <LeftOutlined onClick={prevSlide} style={{ fontSize: "30px" }} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5  text-2xl rounded-full p-3 bg-black/20 text-white cursor-pointer">
        <RightOutlined onClick={nextSlide} style={{ fontSize: "30px" }} />
      </div>
      {/* Visualização de miniatura */}
      <div className="w-full h-20 bg-black/20 flex items-center justify-center mt-4">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slideIndex}
            src={slide.url}
            alt={`Preview ${slideIndex + 1}`}
            width={64}
            height={64}
            className={`object-cover cursor-pointer mx-2 ${
              slideIndex === previewIndex ? "border-4 border-blue-500" : ""
            }`}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrosel;
