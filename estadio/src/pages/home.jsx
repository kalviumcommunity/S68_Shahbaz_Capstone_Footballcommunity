import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Categories from '../components/Categories';
import ClipGrid from '../components/ClipGrid';
import UserCallout from '../components/UserCallout';
import Footer from '../components/Footer';

export default function Home() {
  // Trending clips with thumbnails
  const trendingClips = [
    {
      id: 1,
      title: "Messi's Impossible Free-Kick",
      views: "2.4M",
      user: "La Liga",
      image: "https://tse3.mm.bing.net/th?id=OIP.IWPk-a55tC7bsNlqUTi_pQHaEK&pid=Api&P=0&h=180"
    },
    {
      id: 2,
      title: "Lamine Yamal The Wonderkid",
      views: "3.1M",
      user:"La Masia",
      image: "https://tse4.mm.bing.net/th?id=OIP.w94p9VA8dug2Hl2HCGG-1QHaEK&pid=Api&P=0&h=180"
    },
    {
      id: 3,
      title: "Mbappé Speed Run",
      views: "1.8M",
      user:"FIFA",
      image: "https://tse4.mm.bing.net/th?id=OIP.gc9-_Dglg3Vevi5b7yUS_gHaEn&pid=Api&P=0&h=180"
    },
    {
      id: 4,
      title: "Neymar's Rainbow Flick",
      views: "2.1M",
      user:"PSG",
      image: "https://tse2.mm.bing.net/th?id=OIP._Q1pnkN9KphCcfRhxofD5QAAAA&pid=Api&P=0&h=180"
    },
    {
      id: 5,
      title: "Derby Madness",
      views: "1.5M",
      user:"AC Milan",
      image: "https://tse1.mm.bing.net/th?id=OIP.HRY1Lj5MYJ0Lk57g0L2ZKgHaDt&pid=Api&P=0&h=180"
    },
    {
      id: 6,
      title: "Pedri Potter",
      views: "1.9M",
      user:'FC Barcelona',
      image: "https://tse3.mm.bing.net/th?id=OIP.X8-HtGZS0kldObJU_p0iLQHaEo&pid=Api&P=0&h=180"
    },
    {
      id: 7,
      title: "MSN Revolution",
      views: "1.2M",
      user:'ForBlaugrana',
      image: "https://tse2.mm.bing.net/th?id=OIP.79TtbnyQbfwZbZdWzlwg-AHaEK&pid=Api&P=0&h=180"
    }
  ];

  // Top moments grid
  const topMoments = [
    {
      id: 1,
      title: "Aguero 93:20",
      views: "5.7M",
      user: "Premier League",
      image: "https://tse1.mm.bing.net/th?id=OIP.ngt0yRCodr3JcXd40CgjlgHaEK&pid=Api&P=0&h=180"
    },
    {
      id: 2,
      title: "Zidane UCL Volley",
      views: "4.2M",
      user: "UEFA",
      image: "https://tse1.mm.bing.net/th?id=OIP.EcYk7buLgI4_UaZSzdxlywHaEd&pid=Api&P=0&h=180"
    },
    {
      id: 3,
      title: "Barca's Golden Era",
      views: "3.8M",
      user: "PL Highlights",
      image: "https://tse4.mm.bing.net/th?id=OIP.rzg2jWS6HDGxP1EbGnOwoAHaFE&pid=Api&P=0&h=180"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Trending section with horizontal scroll */}
      <Trending clips={trendingClips} />
      
      <Categories />
      <ClipGrid clips={topMoments} />
      <UserCallout />
      <Footer />
    </div>
  );
}