interface Produto {
    id: number;
    nome: string;
    preco: number;
    precoOriginal?: number;
    descricao: string;
    imagem: string;
}

export const produtos: Produto[] = [
    {
        id: 1,
        nome: "Power Bank",
        preco: 88.90,
        precoOriginal: 120.00,
        descricao: "Power bank portátil de alta capacidade, ideal para carregar seus dispositivos em movimento.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsPdNYrHHdheBP0SIBHZ5bFO-V_B_bQFrr_FiNpIK7QGEpCvU9YJaQ_XuU&s=10"
    },
    {
        id: 2,
        nome: "Joystick PS5",
        preco: 399.90,
        descricao: "Controle sem fio com resposta tátil e gatilhos adaptáveis.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0E-kKwX4kMnvcTd_B7beqpci8pm7XA2MqzuN-NFVRNdABqjWnFKvxP8U&s=10"
    },
    {
        id: 3,
        nome: "Mini Caixa Zenite",
        preco: 30.90,
        precoOriginal: 49.00,
        descricao: "Caixa de som portátil Bluetooth com graves potentes.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ggTcEY4KjUSjiuVBKwiNC6QWmvwKeC85Gz16r8PHfA&s=10"
    },
    {
        id: 4,
        nome: "Fone Bluetooth",
        preco: 149.90,
        precoOriginal: 199.90,
        descricao: "Fone sem fio com cancelamento de ruído ativo.",
        imagem: "https://picsum.photos/400/400?random=4"
    },
    {
        id: 5,
        nome: "Mouse Gamer RGB",
        preco: 179.90,
        descricao: "Mouse com sensor de 16000 DPI e iluminação personalizável.",
        imagem: "https://picsum.photos/400/400?random=5"
    },
    {
        id: 6,
        nome: "Teclado Mecânico",
        preco: 249.90,
        precoOriginal: 299.90,
        descricao: "Teclado mecânico switch azul com retroiluminação LED.",
        imagem: "https://picsum.photos/400/400?random=6"
    },
    {
        id: 7,
        nome: "Smartwatch Pro",
        preco: 459.90,
        descricao: "Relógio inteligente com monitor cardíaco e GPS integrado.",
        imagem: "https://picsum.photos/400/400?random=7"
    },
    {
        id: 8,
        nome: "Hub USB-C 7 em 1",
        preco: 129.90,
        precoOriginal: 169.90,
        descricao: "Adaptador USB-C com HDMI, leitor de cartão e 3 portas USB.",
        imagem: "https://picsum.photos/400/400?random=8"
    },
    {
        id: 9,
        nome: "Webcam Full HD",
        preco: 199.90,
        descricao: "Câmera para streaming com microfone integrado e autofoco.",
        imagem: "https://picsum.photos/400/400?random=9"
    }
];