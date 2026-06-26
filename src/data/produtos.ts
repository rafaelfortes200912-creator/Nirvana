interface Produto {
    id: number;
    nome: string;
    preco: number;
    precoOriginal?: number;
    descricao: string;
    imagem: string;
    categoria: string;
    estoque: number;
}

// Resistores
const resistores: Produto[] = [
    {
        id: 1,
        nome: "Kit de Resistores 200 Unidades",
        preco: 2500.00, precoOriginal: 3500.00,
        descricao: "Kit com 20 valores diferentes, 10 unidades cada. Ideal para iniciantes em eletrônica.",
        imagem: "/produtos/resistores/kit-resistor.png",
        categoria: "Resistores",
        estoque: 15,
    },
    {
        id: 2,
        nome: "Kit de Resistores 300 Unidades",
        preco: 3500.00, precoOriginal: 4500.00,
        descricao: "Kit com 30 valores diferentes, 10 unidades cada. Perfeito para projetos variados.",
        imagem: "/produtos/resistores/kit.resistor2.png",
        categoria: "Resistores",
        estoque: 10,
    },
    {
        id: 3,
        nome: "Kit de Resistores 600 Unidades",
        preco: 5500.00,
        descricao: "Kit completo com 30 valores, 20 unidades cada. Para quem precisa de quantidade.",
        imagem: "/produtos/resistores/kit-resistor3.png",
        categoria: "Resistores",
        estoque: 5,
    },
    {
        id: 4,
        nome: "Kit de Resistores 1200 Unidades",
        preco: 9500.00, precoOriginal: 12000.00,
        descricao: "Kit profissional com 60 valores, 20 unidades cada. Para laboratório e oficina.",
        imagem: "/produtos/resistores/kit-resistor.png",
        categoria: "Resistores",
        estoque: 3,
    },
    {
        id: 5,
        nome: "Resistor 100Ω 1/4W (Pacote 50un)",
        preco: 500.00,
        descricao: "Resistor de filme de carbono 100Ω, tolerância 5%. Essencial para proteção de LEDs.",
        imagem: "/produtos/resistores/resistor1.png",
        categoria: "Resistores",
        estoque: 20
    },
    {
        id: 6,
        nome: "Resistor 220Ω 1/4W (Pacote 50un)",
        preco: 500.00,
        descricao: "Resistor de filme de carbono 220Ω. Ideal para LEDs com Arduino e ESP32.",
        imagem: "/produtos/resistores/resistor2.png",
        categoria: "Resistores",
        estoque: 20
    },
    {
        id: 7,
        nome: "Resistor 1kΩ 1/4W (Pacote 50un)",
        preco: 500.00,
        descricao: "Resistor 1kΩ de uso geral. Proteção de bases de transistores.",
        imagem: "/produtos/resistores/resistor3.png",
        categoria: "Resistores",
        estoque: 20
    },
    {
        id: 8,
        nome: "Resistor 10kΩ 1/4W (Pacote 50un)",
        preco: 500.00,
        descricao: "Resistor 10kΩ. Essencial para pull-up e pull-down em circuitos digitais.",
        imagem: "/produtos/resistores/resistor4.png",
        categoria: "Resistores",
        estoque: 34
    },
];

// Capacitores (vazio por enquanto)
const capacitores: Produto[] = [];

// Semicondutores (vazio por enquanto)
const semicondutores: Produto[] = [];

// Circuitos Integrados (vazio por enquanto)
const circuitosIntegrados: Produto[] = [];

// Conectores e Jumpers (vazio por enquanto)
const conectores: Produto[] = [];

// Ferramentas (vazio por enquanto)
const ferramentas: Produto[] = [];

export const produtos: Produto[] = [
    ...resistores,
    ...capacitores,
    ...semicondutores,
    ...circuitosIntegrados,
    ...conectores,
    ...ferramentas,
];