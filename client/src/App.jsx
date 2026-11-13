import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <a href="https://github.com/Wakefultugboat" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/ahad-khan-b8b07228a/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://leetcode.com/u/Ahad_0482khan/" target="_blank" rel="noreferrer">LeetCode</a>
      </footer>
    </>
  );
}