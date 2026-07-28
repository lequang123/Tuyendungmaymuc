import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import PriceTable from '@/components/PriceTable';
import Process from '@/components/Process';
import Locations from '@/components/Locations';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PriceTable />
        <Courses />
        <Process />
        <Locations />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
