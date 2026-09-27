import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Procedimentos from './components/Procedimentos';
import Processo from './components/Processo';
import Agendamento from './components/Agendamento';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <Sobre />
      <Procedimentos />
      <Processo />
      <Agendamento />
      <Footer />
    </div>
  );
}