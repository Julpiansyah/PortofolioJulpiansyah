import { personalInfo } from '../data/portfolio';
import LiquidChrome from './LiquidChrome';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 pt-20 pb-10"
    >
      <LiquidChrome />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cream-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-800/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-300/10 border border-amber-300/20 text-amber-300 text-sm font-medium mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
          Frontend Developer
        </div> */}

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
          {personalInfo.name}
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-cream-200/80 max-w-3xl mx-auto mb-12 font-medium leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {personalInfo.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-300 hover:bg-amber-400 text-navy-900 font-bold rounded-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-95 shadow-xl shadow-amber-300/20 hover:shadow-amber-300/40 text-lg"
          >
            Get to Know Me
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 active:scale-95 text-lg"
          >
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;