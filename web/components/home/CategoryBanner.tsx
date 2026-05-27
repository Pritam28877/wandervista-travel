import Link from 'next/link';
import { Carousel } from '../Carousel';

export interface CatCard {
  name: string;
  price: string;
  image: string;
}

export function CategoryBanner({
  variant,
  title,
  sub,
  banner,
  cta,
  cards,
}: {
  variant: 'romantic' | 'india' | 'international';
  title: string;
  sub: string;
  banner: string;
  cta: string;
  cards: CatCard[];
}) {
  return (
    <section className={`section cat-section cat-section--${variant}`}>
      <div className="container">
        <div className="cat-banner" style={{ backgroundImage: `url('${banner}')` }}>
          <div className="cat-banner__content">
            <h2 className="cat-banner__title">{title}</h2>
            <p className="cat-banner__sub">{sub}</p>
            <Link href={cta} className="cat-banner__cta">Explore</Link>
          </div>
        </div>

        <Carousel
          scrollerClass="cat-scroller"
          trackClass="cat-track"
          arrowClass="cat-arrow"
          prevClass="cat-arrow--prev"
          nextClass="cat-arrow--next"
        >
          {cards.map((c) => (
            <Link href="/packages" className="cat-card" key={c.name}>
              <img src={c.image} alt={c.name} loading="lazy" />
              <div className="cat-card__shade" />
              <div className="cat-card__body">
                <h4>{c.name}</h4>
                <span>Starting Price {c.price}</span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
