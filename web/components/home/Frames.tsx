import { Carousel } from '../Carousel';

const FRAMES = [
  { loc: 'Vietnam', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80', cls: 'frame--1' },
  { loc: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', cls: 'frame--2' },
  { loc: 'Bhutan', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80', cls: 'frame--3' },
  { loc: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', cls: 'frame--4' },
  { loc: 'Rajasthan', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', cls: 'frame--2' },
  { loc: 'Ladakh', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', cls: 'frame--3' },
];

export function Frames() {
  return (
    <section className="section frames-section">
      <div className="container">
        <div className="section-title">
          <h2>Journey in Frames</h2>
          <p>Picture-perfect moments captured by our community</p>
        </div>
        <Carousel
          scrollerClass="frames-scroller"
          trackClass="frames-track"
          arrowClass="frames-arrow"
          prevClass="frames-arrow--prev"
          nextClass="frames-arrow--next"
        >
          {FRAMES.map((f, i) => (
            <a href="#" className={`frame ${f.cls}`} key={i}>
              <img src={f.img} alt={f.loc} loading="lazy" />
              <span className="frame__pin"><i className="fas fa-location-dot" /> {f.loc}</span>
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
