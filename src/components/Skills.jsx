import { skills } from '../data/portfolio';

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 bg-cream-50/50 dark:bg-navy-900/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-4">
            My Skills
          </h2>
          <p className="text-navy-400 dark:text-cream-200/60">
            Technologies & Tools I Work With
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill) => {
            const SkillIcon = skill.icon;
            return (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-navy-900/60 border border-cream-200/50 dark:border-navy-700/50 transition-all duration-300"
              >
                <div className="text-navy-400 dark:text-cream-200/60 transition-colors duration-300 ">
                  <SkillIcon size={36} />
                </div>
                <span className="text-sm font-medium text-navy-700 dark:text-cream-200/80">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;