import { useInView } from '../hooks/use-in-view';

const CertificateCard = ({ certificate, index = 0 }) => {
  const [ref, isInView] = useInView();
  const { title, description, image, url } = certificate;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <article className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-white/10 w-full min-h-[350px] shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2">
        
        {/* Image Container with overflow hidden to prevent scale-105 from leaking outside rounded corners */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {String(image).toLowerCase().endsWith('.pdf') ? (
            <iframe
              title={title}
              src={image}
              className="absolute inset-0 h-full w-full opacity-90 object-cover"
            />
          ) : (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
        </div>


        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent transition-opacity duration-500 group-hover:via-gray-900/60 z-10" />

        {/* Content Container */}
        <div className="relative z-20 p-6 sm:p-8 flex flex-col h-full justify-end">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
            {title}
          </h3>

          <div className="text-sm sm:text-base leading-relaxed text-slate-300 mb-5 line-clamp-2">
            {description}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white hover:text-navy-900 shadow-sm hover:shadow-md"
          >
            View Certificate
          </a>
        </div>
      </article>
    </div>
  );
};

export default CertificateCard;
