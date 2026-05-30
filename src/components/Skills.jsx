import { motion } from 'framer-motion';
import './Skills.css';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaPhp 
} from 'react-icons/fa';
import { SiFramer, SiMongodb, SiPostgresql, SiVite, SiDart } from 'react-icons/si';

const skills = [
  { name: 'React', Icon: FaReact },
  { name: 'JavaScript', Icon: FaJs },
  { name: 'HTML5', Icon: FaHtml5 },
  { name: 'CSS3', Icon: FaCss3Alt },
  { name: 'Git', Icon: FaGitAlt },
  { name: 'GitHub', Icon: FaGithub },
  { name: 'Vite', Icon: SiVite },
  { name: 'Framer Motion', Icon: SiFramer },
  { name: 'PHP', Icon: FaPhp },
  { name: 'Dart', Icon: SiDart },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'PostgreSQL', Icon: SiPostgresql }
];

export default function Skills() {
  // Duplicate skills array for seamless infinite scrolling
  const duplicatedSkills = [...skills, ...skills];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-wrapper">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          My Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="section-subtitle"
        >
          Technologies & Tools I Work With
        </motion.p>

        {/* Marquee Container - Infinite Scrolling */}
        <div className="marquee-container">
          <motion.div
            className="marquee-content"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                className="skill-card"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                  y: -10,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="skill-icon">
                  <skill.Icon />
                </div>
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

