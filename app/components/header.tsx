    "use client";
    import Link from "next/link";
    import {usePathname} from "next/navigation";


    export default function Header() {
        const pathname = usePathname();
        return (
            <header className="bg-gray-900 text-white p-4">
                <h1 className="text-2xl font-bold">Nirvana</h1>
                <nav className="flex gap-4 mt-2">
                    <Link href="/categoria/audio" className="hover:text-gray-300 transition-colors">Áudio</Link>
                    <Link href="/categoria/gaming" className="hover:text-gray-300 transition-colors">Gaming</Link>
                    <Link href="/categoria/acessorios" className="hover:text-gray-300 transition-colors">Acessórios</Link>
                </nav>
            </header>
        );
    };