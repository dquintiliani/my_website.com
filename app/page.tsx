import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Writing } from "@/components/writing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollFadeIn } from "@/components/scroll-fade-in"



export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Contact />
      <Footer />
      <ScrollFadeIn />
    </>
  )
}
