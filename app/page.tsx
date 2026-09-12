import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Procedimentos from './components/Procedimentos';
import Processo from './components/Processo';

export default function Home() {
  return (
    <div>
      <Hero />
      <Sobre />
      <Procedimentos />
      <Processo />
    </div>
  );
}