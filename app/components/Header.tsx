"use client";
import { useState } from "react";
export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4 bg-[#f5efe6] border-b border-[#e8ddd0]">
        <div>
            <p className="font-serif text-2xl tracking-widest text-[#2a1a12]">
                VV VILLAR
            </p>
                <p className="text-[10px] tracking-widest text-[#8a7460] uppercase">
                    Estética Facial &amp; Harmonização
                </p>
        </div>
        <nav className="hidden lg:flex gap-8">
        <a href="#" className="text-sm text-[#2a1a12]">Início</a>
        <a href="#" className="text-sm text-[#2a1a12]">Sobre</a>
        <a href="#" className="text-sm text-[#2a1a12]">Procedimentos</a>
        <a href="#" className="text-sm text-[#2a1a12]">Contato</a>
        </nav>
        <button className="hidden lg:block bg-[#b8794f] text-white px-5 py-2 rounded-full text-sm font-medium">
            Agendar Consulta <span>→</span>
        </button>
        <button onClick={() => setMenuAberto(!menuAberto)}
        className="lg:hidden text-2xl text-[#2a1a12]">
            ☰
        </button>
    </header>
  );
}