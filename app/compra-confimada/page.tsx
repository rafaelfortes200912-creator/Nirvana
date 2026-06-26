import Link from "next/link";

export default function CompraConfirmadaPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Compra Confirmada!</h1>
      <p className="text-gray-500 mb-8">Obrigado por comprar na MagicX. Seu pedido será processado.</p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
        Voltar à Loja
      </Link>
    </div>
  );
}  