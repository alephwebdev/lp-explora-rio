import Header from './_components/Header'
import Footer from './_components/Footer'
import Hero from './_sections/Hero'
import Characters from './_sections/Characters'
import Presentation from './_sections/Presentation'
import Authors from './_sections/Authors'
import History from './_sections/History'
import News from './_sections/News'
import Challenges from './_sections/Challenges'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Characters />
        <Presentation />
        <Authors />
        <History />
        <News />
        <Challenges />
      </main>
      <Footer />
    </>
  )
}
