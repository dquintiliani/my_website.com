import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import Projects from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollFadeIn } from "@/components/scroll-fade-in"
import Folder from "@/components/folder"



export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      {/* <Folder />  */}
      <Contact />
      <Footer />
      <ScrollFadeIn />
    </>
  )
}
