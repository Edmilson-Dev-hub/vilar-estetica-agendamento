export default function Footer() {
  return (
    <footer className="bg-[#2a1a12] text-white px-6 lg:px-16 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div>
            <p className="font-serif text-2xl tracking-widest font-light mb-2">
                VV VILLAR
            </p>

            <p className="uppercase tracking-widest text-xs text-[#b8794f] mb-4">
                Estética Facial &amp; Harmonização
            </p>

            <p className="text-[#c9b8a8]">
                Beleza, saúde e confiança em cada detalhe.
            </p>

        </div>

        <div>
            <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-4">
                Navegação
            </p>
            
            <nav className="flex flex-col gap-2">
                <a href="#inicio">Início</a>
                <a href="#sobre">Sobre</a>
                <a href="#procedimentos">Procedimentos</a>
                <a href="#processo">Processo</a>
                <a href="#contato">Contato</a>
            </nav>
        </div>

        <div>
            <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-4">
                Contato
            </p>
            <div className="flex flex-col gap-2">
                <p>(83) 99999-9999</p>
                <p>@villar.estetica</p>
                <p>João Pessoa — PB</p>
            </div>
        </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between gap-4 text-sm text-[#c9b8a8]">
        <p>© 2026 Villar. Todos os direitos reservados.</p>
        <p className="italic">Beleza, saúde e confiança em cada detalhe.</p>
        </div>
    </footer>
  );
}