import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Newsletter } from '@/components/Newsletter';
import { Hero } from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';
import { LatestUpdates } from '@/components/home/LatestUpdates';
import { FeaturedPackages } from '@/components/home/FeaturedPackages';
import { WhyChooseUs, TrustBar } from '@/components/home/StaticSections';
import { Callback } from '@/components/home/Callback';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogsTeaser } from '@/components/home/BlogsTeaser';
import { CommunityTrips } from '@/components/home/CommunityTrips';
import { Frames } from '@/components/home/Frames';
import { VibeShorts } from '@/components/home/VibeShorts';
import { CategoryBanner } from '@/components/home/CategoryBanner';

export default function HomePage() {
  return (
    <>
      <Header variant="transparent" />
      <Hero />
      <StatsBar />
      <LatestUpdates />

      <FeaturedPackages />

      <CategoryBanner
        variant="romantic"
        title="Romantic Escapes"
        sub="Where Forever Begins…Together!"
        banner="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80"
        cta="/packages?type=honeymoon"
        cards={[
          { name: 'Bali', price: '₹42,999/-', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80' },
          { name: 'Maldives', price: '₹60,599/-', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80' },
          { name: 'Singapore', price: '₹44,999/-', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=500&q=80' },
          { name: 'Thailand', price: '₹49,999/-', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80' },
          { name: 'Vietnam', price: '₹34,999/-', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&q=80' },
          { name: 'Kerala', price: '₹32,500/-', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80' },
        ]}
      />

      <CategoryBanner
        variant="india"
        title="India Trips"
        sub="A Journey Through Time, Colour and Culture"
        banner="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
        cta="/packages?region=india"
        cards={[
          { name: 'Leh Ladakh', price: '₹15,800/-', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80' },
          { name: 'Spiti', price: '₹17,999/-', image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=500&q=80' },
          { name: 'Kashmir', price: '₹24,499/-', image: 'https://images.unsplash.com/photo-1572017002253-ea93fdf99e7b?w=500&q=80' },
          { name: 'Meghalaya', price: '₹21,499/-', image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&q=80' },
          { name: 'Himachal', price: '₹7,499/-', image: 'https://images.unsplash.com/photo-1597149471895-aaedba48bd9b?w=500&q=80' },
          { name: 'Rajasthan', price: '₹18,999/-', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80' },
        ]}
      />

      <CommunityTrips />

      <CategoryBanner
        variant="international"
        title="International Trips"
        sub="Discover the world, one destination at a time"
        banner="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
        cta="/packages?region=international"
        cards={[
          { name: 'Europe', price: '₹89,990/-', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80' },
          { name: 'Vietnam', price: '₹34,999/-', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&q=80' },
          { name: 'Bali', price: '₹42,999/-', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80' },
          { name: 'Thailand', price: '₹49,999/-', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80' },
          { name: 'Japan', price: '₹94,999/-', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=500&q=80' },
          { name: 'Maldives', price: '₹60,599/-', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80' },
        ]}
      />

      <WhyChooseUs />
      <Callback />
      <Frames />
      <VibeShorts />
      <Testimonials />
      <TrustBar />
      <BlogsTeaser />
      <Newsletter />

      <Footer />
      <FloatingButtons />
    </>
  );
}
