import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

function App() {
  return (
    <div className="min-h-screen py-0 md:py-10">
      <div className="mx-auto max-w-[1160px] overflow-hidden bg-[var(--bg)] md:rounded-[28px] md:border md:border-[var(--border)] md:shadow-[0_1px_2px_rgba(0,0,0,0.03),0_20px_50px_-30px_rgba(0,0,0,0.15)]">
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Education />
          {/* Certificates section hidden for now (only one entry so far) —
              component + content are still there, just not rendered. */}
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
