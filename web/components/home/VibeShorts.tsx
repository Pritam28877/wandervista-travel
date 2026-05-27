import { Carousel } from '../Carousel';

const SHORTS = [
  { yt: 'K4DyBUG242c', loc: 'Spiti Valley', likes: '12.4K' },
  { yt: '3xfgT6prFRg', loc: 'Bir Billing', likes: '8.9K' },
  { yt: 'iEntWuV3HwI', loc: 'Bali', likes: '21.1K' },
  { yt: 'u36FY7Ekrk0', loc: 'Krabi', likes: '6.7K' },
  { yt: 'cKHi98yj7eA', loc: 'Alleppey', likes: '15.3K' },
  { yt: 'q5dFKzM5dDc', loc: 'Jaisalmer', likes: '9.2K' },
  { yt: 'kS1Q3BUFGAw', loc: 'Key Monastery', likes: '11.0K' },
];

export function VibeShorts() {
  return (
    <section className="section vibe-section">
      <div className="container">
        <div className="section-title">
          <h2>Vibe with Us</h2>
          <p>Short stories from the road — paragliding sunsets, riverside camps, and unfiltered moments from our community</p>
        </div>
        <Carousel
          scrollerClass="shorts-scroller"
          trackClass="shorts-track"
          arrowClass="shorts-arrow"
          prevClass="shorts-arrow--prev"
          nextClass="shorts-arrow--next"
        >
          {SHORTS.map((s) => (
            <div className="short-card" data-yt={s.yt} key={s.yt}>
              <iframe
                loading="lazy"
                src={`https://www.youtube.com/embed/${s.yt}?autoplay=1&mute=1&loop=1&playlist=${s.yt}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`}
                title={s.loc}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <div className="short-card__tag"><i className="fab fa-youtube" /></div>
              <div className="short-card__caption">
                <span className="short-card__loc"><i className="fas fa-location-dot" /> {s.loc}</span>
                <span className="short-card__likes"><i className="fas fa-heart" /> {s.likes}</span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
