import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Trending from '../components/Trending'
import Categories from '../components/Categories'
import ClipGrid from '../components/ClipGrid'
import UserCallout from '../components/UserCallout'
import Footer from '../components/Footer'

export default function Home() {
  const trendingClips = [
    {
      id: 1,
      title: "Messi's Impossible Free-Kick",
      views: "2.4M",
      image: "https://tse3.mm.bing.net/th?id=OIP.IWPk-a55tC7bsNlqUTi_pQHaEK&pid=Api&P=0&h=180"
    }
  ]

  const topMoments = [
    {
      id: 1,
      title: "Aguero 93:20",
      views: "5.7M",
      user: "Premier League",
      image: "https://tse4.mm.bing.net/th?id=OIP.9K2YMs0Z8IlC3SDErk8YgAHaEK&pid=Api&P=0&h=180"
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen ">
      <Navbar />
      <Hero />
      <Trending clips={trendingClips} />
      <Categories />
      <ClipGrid clips={topMoments} />
      <UserCallout />
      <Footer />
    </div>
  )
}