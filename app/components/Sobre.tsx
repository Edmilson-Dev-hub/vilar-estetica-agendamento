import Image from 'next/image';
export default function Sobre() {
  return (
      <section id="sobre" className="scroll-mt-24 min-h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-[#f5efe6] px-6 lg:px-16 py-10">
        <div className="w-full h-[350px] relative lg:flex-[0.8] lg:h-[500px]">
          <Image
          src="https://images.unsplash.com/photo-1659353888906-adb3e0041693"
          alt="Dra. Valentina Villar"
          fill
          className="object-cover rounded-3xl"/>
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-lg">
            <p className="font-serif italic text-3xl text-[#b8794f]">
              +5k
            </p>
            <p className="text-xs text-[#5c4a3a] mt-1">
              pacientes atendidas
            </p>
          </div>
        </div>
        <div className="flex-[1.2]">
          <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-4">
            Conheça a Especialista
          </p>
          
          <h2 className="text-4xl font-semibold leading-tight mb-6">
            Conheça a Dra. <span className="font-serif italic">Valentina Villar</span>
          </h2>
          
          <p className="text-lg text-[#5c4a3a] max-w-md mb-8">
            Com anos de experiência em estética facial e harmonização, a Dra. Valentina alia técnica, tecnologia e um olhar sensível para realizar a sua melhor versão.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-[#2a1a12]">
              <span className="w-5 h-5 rounded-full border border-[#b8794f] flex items-center justify-center text-xs text-[#b8794f]">✓</span>
              Formação em Medicina Estética
            </li>
            <li className="flex items-center gap-3 text-[#2a1a12]">
              <span className="w-5 h-5 rounded-full border border-[#b8794f] flex items-center justify-center text-xs text-[#b8794f]">✓</span>
              Especialista em Harmonização Facial
            </li>
            <li className="flex items-center gap-3 text-[#2a1a12]">
              <span className="w-5 h-5 rounded-full border border-[#b8794f] flex items-center justify-center text-xs text-[#b8794f]">✓</span>
              Mais de 5 anos de experiência
            </li>
            <li className="flex items-center gap-3 text-[#2a1a12]">
              <span className="w-5 h-5 rounded-full border border-[#b8794f] flex items-center justify-center text-xs text-[#b8794f]">✓</span>
              Atendimento humanizado e individualizado
            </li>
          </ul>
          <button className="bg-[#b8794f] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">Saiba mais sobre a Dra.
            <span>→</span>
          </button>
        </div>
      </section>
  );
}