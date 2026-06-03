import { personalInfo, values } from '../data/portfolio';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white dark:bg-navy-950 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <img
            src="/assets/images/profile.png"
            alt="Profile"
            className="mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full object-cover mb-8 border-4 border-amber-300/40 shadow-xl shadow-amber-300/20 transition-transform duration-500 hover:scale-105"
          />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-white mb-6 tracking-tight">
            About Me
          </h2>
          <p className="text-lg text-navy-500 dark:text-cream-200/70 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {values.map((value) => {
            const IconComponent = value.icon; // ambil komponen icon
            return (
              <div
                key={value.title}
                className="group p-8 rounded-3xl bg-cream-50 dark:bg-navy-900/40 border border-cream-200/60 dark:border-navy-700/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-300/10 dark:hover:border-amber-400/40 backdrop-blur-sm"
              >
                <div className="text-amber-500 mb-6 flex justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:text-amber-400">
                  <IconComponent size={40} strokeWidth={1.5} /> {/* render icon di sini */}
                </div>
                <h3 className="text-xl font-bold text-navy-800 dark:text-white mb-3 text-center tracking-wide">
                  {value.title}
                </h3>
                <p className= "text-base text-navy-500 dark:text-cream-200/70 leading-relaxed text-center">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;