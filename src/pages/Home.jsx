import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Stack from '../components/sections/Stack';
import AITools from '../components/sections/AITools';
import Work from '../components/sections/Work';
import Experience from '../components/sections/Experience';
import Certificates from '../components/sections/Certificates';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Stack />
      <AITools />
      <Work />
      <Experience />
      <Certificates />
      <Contact />
    </main>
  );
}
