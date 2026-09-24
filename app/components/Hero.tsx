import Image from 'next/image';
export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center rounded-t-[40px] bg-[#f5efe6] px-6 lg:px-16 pt-28 pb-10">
      <div className="flex-[1.2]">

        <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-4">
          Estética Facial &amp; Harmonização
        </p>

        <h1 className="text-5xl font-semibold leading-tight mb-6">
          Realce o que te faz <span className="text-[#b7793f]">única.</span>

        </h1>

        <p className="text-lg text-[#5c4a3a] max-w-md mb-8">
          Harmonização facial e estética avançada para realçar sua beleza natural, com técnica, segurança e um olhar individualizado.
        </p>

        <div className="flex gap-4">
          <button className="bg-[#b8794f] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
          Agendar Consulta
          <span>→</span>
          </button>
          <button className="border border-[#b8794f] text-[#2a1a12] px-6 py-3 rounded-full font-medium">
            Ver Procedimentos
          </button>
        </div>
      </div>
      <div className="w-full h-[400px] relative mt-8 lg:mt-0 lg:flex-[0.8] lg:h-[700px]">
        <Image
          src="https://images.unsplash.com/photo-1782159981479-0fafb56d3cd6"
          alt="Dra. Valentina Villar"
          fill
          className="object-cover object-top rounded-3xl"
        />
        <div className="absolute -top-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-lg">
          <p className="font-serif italic text-3xl text-[#b8794f]">
            5<span className="text-lg align-super">+</span>
          </p>
          <p className="text-xs text-[#5c4a3a] mt-1">anos de experiência</p>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-semibold">Dra. Valentina Villar</p>
          <p className="text-sm opacity-90">Fundadora e especialista em estética facial</p>
        </div>
      </div>
    </section>
  );
}