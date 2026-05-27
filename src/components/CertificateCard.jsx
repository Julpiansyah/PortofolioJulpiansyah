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
      <article className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full min-h-[320px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(26,50,99,0.35)] dark:hover:shadow-[0_24px_48px_rgba(255,197,112,0.2)]">
        {String(image).toLowerCase().endsWith('.pdf') ? (
          <iframe
            title={title}
            src={image}
            className="absolute inset-0 h-full w-full opacity-90"
          />
        ) : (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}


        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 transition-opacity duration-500 group-hover:via-gray-900/50" />

        <h3 className="z-10 mt-3 text-2xl sm:text-3xl font-bold text-white">{title}</h3>

        <div className="z-10 text-sm leading-6 text-gray-300">{description}</div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 mt-4 w-fit rounded-lg bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white hover:text-black"
        >
          View Certificate
        </a>
      </article>
    </div>
  );
};

export default CertificateCard;
