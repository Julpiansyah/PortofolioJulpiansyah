import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'Pembelian Tiket Konser',
    description: 'Pemesanan tiket konser dengan alur pembelian yang cepat dan jelas.',
    tech: ['UI', 'Flow', 'React'],
    link: 'https://github.com/Julpiansyah/Pembelian-Tiket-Konser',
  },
  {
    id: 2,
    title: 'Gympro',
    description: 'Aplikasi untuk manajemen gym, jadwal, dan layanan untuk member.',
    tech: ['React', 'Dashboard', 'API'],
    link: 'https://github.com/Julpiansyah/gymPro-Mobile',
  },
  {
    id: 3,
    title: 'Booking Lapangan',
    description: 'Sistem booking lapangan dengan pilihan waktu dan konfirmasi.',
    tech: ['Booking', 'Time Slot', 'React'],
    link: 'https://github.com/Julpiansyah/Booking-Lapangan-mobile',
  },
  {
    id: 4,
    title: 'Jam',
    description: 'Tampilan jam/penjadwalan sebagai komponen pendukung layanan.',
    tech: ['UI', 'Time', 'Frontend'],
    link: 'https://github.com/Julpiansyah/Jam-Mobile',
  },
  {
    id: 5,
    title: 'FE Inventaris',
    description: 'Front-end inventaris untuk pencatatan aset dan pencarian data.',
    tech: ['React', 'CRUD', 'UI'],
    link: 'https://github.com/Julpiansyah/FE-Inventaris',
  },
  {
    id: 6,
    title: 'BE-Inventaris PPLG',
    description: 'BE-Menggunakan Express.js',
    tech: ['Express', 'Inventaris', 'BE'],
    link: 'https://github.com/Julpiansyah/BE-inventNew',
  },
  {
    id: 7,
    title: 'E-Comerce',
    description: 'E-commerce dengan katalog, cart, dan alur checkout sederhana.',
    tech: ['React', 'E-commerce', 'UI'],
    link: 'https://github.com/Julpiansyah/e_comerc-mobile',
  },
  {
    id: 8,
    title: 'BE-Peminjaman Buku',
    description: 'BE-Menggunakan Express.js',
    tech: ['Express', 'Inventaris', 'BE'],
    link: 'https://github.com/Julpiansyah/BE-PeminjamanBuku',
  },
  {
  id: 9,
    title: 'FE-Peminjaman Buku',
    description: 'Front-end inventaris untuk pencatatan aset dan pencarian data.',
    tech: ['React', 'CRUD', 'UI'],
    link: 'https://github.com/Julpiansyah/peminjamanBuku',
  },
  
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 pt-24 sm:pt-32 pb-24 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 dark:text-white mb-6 tracking-tight">
            My Projects
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Showcasing my latest work and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out backdrop-blur-sm"
            >
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-amber-500">
                  {project.title}
                </h3>

                <p className="text-base text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-white/10 transition-colors duration-300 group-hover:border-amber-200 dark:group-hover:border-amber-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-300 group-hover:gap-3"
              >
                <svg className="w-5 h-5 transition-transform duration-500 ease-out group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>View Project</span>
                <svg className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block p-10 rounded-3xl bg-cream-50 dark:bg-navy-900/40 border border-cream-200/60 dark:border-navy-700/60 max-w-2xl backdrop-blur-sm shadow-xl shadow-navy-900/5">
            <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-3">
              Want to see more?
            </h3>
            <p className="text-base text-navy-500 dark:text-cream-200/70 mb-8">
              Check out my GitHub for additional projects and contributions
            </p>
            <a
              href="https://github.com/Julpiansyah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-800 hover:bg-navy-900 text-white font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-95 shadow-lg shadow-navy-800/20 hover:shadow-navy-800/40 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Visit GitHub</span>
              <Link></Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;