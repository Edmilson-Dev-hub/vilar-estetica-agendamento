import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Procedimentos from './components/Procedimentos';
import Processo from './components/Processo';
import Agendamento from './components/Agendamento';

export default function Home() {
  return (
    <div>
      <Hero />
      <Sobre />
      <Procedimentos />
      <Processo />
      <Agendamento />
    </div>
  );
}