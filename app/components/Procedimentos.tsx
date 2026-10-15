import Image from "next/image";

export default function Procedimentos() {
  return (
    <>
      <section id="procedimentos" className="scroll-mt-24 min-h-screen flex flex-col bg-[#f5efe6] px-6 lg:px-16 py-16 gap-16">
        <div className="flex justify-between items-end">
          <div>
            <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-2">
              Procedimentos
            </p>
            <h2 className="text-4xl font-semibold mb-2">
              Harmonização Facial
            </h2>
            <p className="text-[#5c4a3a]">
              Equilíbrio e proporção, respeitando a individualidade de cada rosto.
            </p>
          </div>

          <a href="#" className="flex items-center gap-2 text-[#b8794f] whitespace-nowrap">
            Ver todos
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?w=400&h=480&fit=crop&auto=format"
                alt="Preenchimento Facial"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Preenchimento Facial</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1785861485926-93a13556d656"
                alt="Toxína Botulínica"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Toxina Botulínica</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"
                alt="Lipo de Papada"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Lipo de Papada</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9"
                alt="Fios de Sustentação"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Fios de Sustentação</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col bg-[#f5efe6] px-6 lg:px-16 py-16 gap-16">
        <div className="flex justify-between items-end">
          <div>
            <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-2">
              Procedimentos
            </p>
            <h2 className="text-4xl font-semibold mb-2">
              Rejuvenescimento
            </h2>
            <p className="text-[#5c4a3a]">
              Tratamentos que estimulam a pele e suavizam os sinais do tempo.
            </p>
          </div>

          <a href="#" className="flex items-center gap-2 text-[#b8794f] whitespace-nowrap">
            Ver todos
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1731514771613-991a02407132"
                alt="Bioestimuladores de Colágeno"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Bioestimuladores de Colágeno</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1761718209835-c8586b7dcac0"
                alt="Skinbooster"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Skinbooster</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1782159981479-0fafb56d3cd6"
                alt="Ultrassom Microfocado"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Ultrassom Microfocado</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1785860817740-c95735ba03b1"
                alt="Radiofrequência"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Radiofrequência</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex flex-col bg-[#f5efe6] px-6 lg:px-16 py-16 gap-16">
        <div className="flex justify-between items-end">
          <div>
            <p className="uppercase tracking-widest text-sm text-[#8a7460] mb-2">
              Procedimentos
            </p>
            <h2 className="text-4xl font-semibold mb-2">
              Qualidade da Pele
            </h2>
            <p className="text-[#5c4a3a]">
              Cuidados personalizados para uma pele mais uniforme, hidratada e saudável.
            </p>
          </div>

          <a href="#" className="flex items-center gap-2 text-[#b8794f] whitespace-nowrap">
            Ver todos
            <span>→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1731514740777-6476aae2accf"
                alt="Limpeza de Pele"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Limpeza de Pele</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=480&fit=crop&auto=format"
                alt="Peeling Químico"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Peeling Químico</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=480&fit=crop&auto=format"
                alt="Microagulhamento"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Microagulhamento</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>

          <div>
            <div className="relative h-[220px] mb-3">
              <Image
                src="https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?w=400&h=480&fit=crop&auto=format"
                alt="Tratamento de Manchas"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
              <p className="font-serif text-[#2a1a12]">Tratamento de Manchas</p>
              <span className="text-[#b8794f]">→</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}