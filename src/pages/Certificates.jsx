import CertificateCard from '../components/CertificateCard';
import { certificates } from '../data/certificates';

const Certificates = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-navy-950 pt-24 sm:pt-28 pb-24 md:pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cream-200/10 dark:bg-navy-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-navy-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <header className="text-center mb-14 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 dark:text-white mb-4">
            My Certificates
          </h1>
          <p className="text-navy-400 dark:text-cream-200/60 max-w-xl mx-auto">
            Collection of my achievements and certifications
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
