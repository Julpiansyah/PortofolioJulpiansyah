import { personalInfo, values } from '../data/portfolio';

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white dark:bg-navy-950">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <img
            src="/assets/images/profile.png"
            alt="Profile"
            className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-6 border-4 border-amber-300/40 shadow-lg shadow-amber-300/20"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-navy-400 dark:text-cream-200/60 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => {
            const IconComponent = value.icon; // ambil komponen icon
            return (
              <div
                key={value.title}
                className="group p-6 rounded-2xl bg-cream-50 dark:bg-navy-900/50 border border-cream-200/50 dark:border-navy-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-400/30"
              >
                <div className="text-amber-500 mb-4 flex justify-center">
                  <IconComponent size={32} strokeWidth={1.5} /> {/* render icon di sini */}
                </div>
                <h3 className="text-lg font-semibold text-navy-800 dark:text-white mb-2 text-center">
                  {value.title}
                </h3>
                <p className= "text-sm text-navy-400 dark:text-cream-200/60 leading-relaxed text-center">
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