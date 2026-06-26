export interface Banner {
  id: number;
  imagem: string;
  titulo: string;
  subtitulo: string;
  textoBotao: string;
}

export const banners: Banner[] = [
  {
    id: 1,
    imagem: "/publicidades/arduino.jpg",
    titulo: "Placas Arduino",
    subtitulo: "Microcontroladores para todos os teus projetos eletrônicos.",
    textoBotao: "Ver Ofertas",
  },
  {
    id: 2,
    imagem: "/publicidades/raspberryPi.jpg",
    titulo: "Raspberry Pi",
    subtitulo: "Mini computadores para automação, IoT e muito mais.",
    textoBotao: "Comprar Agora",
  },
  {
    id: 3,
    imagem: "/publicidades/processadores.jpg",
    titulo: "Processadores e Semicondutores",
    subtitulo: "Componentes essenciais para os teus circuitos.",
    textoBotao: "Ver Novidades",
  },
  {
    id: 4,
    imagem: "/publicidades/placas-personalizadas.jpg",
    titulo: "Placas Personalizadas",
    subtitulo: "Fabricamos PCBs sob medida para o teu projeto.",
    textoBotao: "Aproveitar",
  },
];

export const objetivoLoja = "Componentes eletrônicos para os teus projetos — Resistores, capacitores, semicondutores, placas e muito mais. Tudo o que precisas para dar vida aos teus circuitos.";