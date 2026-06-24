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
    imagem: "https://picsum.photos/1200/400?random=10",
    titulo: "Promoção de Lançamento",
    subtitulo: "Aproveite até 30% de desconto em produtos selecionados",
    textoBotao: "Ver Ofertas",
  },
  {
    id: 2,
    imagem: "https://picsum.photos/1200/400?random=11",
    titulo: "Frete Grátis",
    subtitulo: "Para compras acima de R$ 200",
    textoBotao: "Comprar Agora",
  },
  {
    id: 3,
    imagem: "https://picsum.photos/1200/400?random=12",
    titulo: "Novos Produtos",
    subtitulo: "Confira os lançamentos da semana",
    textoBotao: "Ver Novidades",
  },
];