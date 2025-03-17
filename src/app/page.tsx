"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ExternalLink,
  Github,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Custom cursor component
const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-blue-500 dark:border-blue-400 pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: cursorPosition.x - 12,
        y: cursorPosition.y - 12,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  );
};

// Project data
const projects = [
  {
    id: 1,
    title: "BlockTones",
    description:
      "A web app that lets users create, share, and visualize custom Minecraft block palettes in real-time with a dynamic 3D rendering of a Minecraft house.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Three.js", "React", "Zustand"],
    link: "https://block-tones.netlify.app/",
    github: "https://github.com/hessnt30/block-tones",
  },
  {
    id: 2,
    title: "CrisisBrief",
    description:
      "An LLM-powered web app to automate the extraction and summarization of crisis event details from multiple webpages into a standardized template.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "MongoDB", "Flask", "Docker"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Interactive Data Visualization",
    description: "A dynamic visualization of complex datasets using D3.js",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["D3.js", "SVG", "Data Visualization"],
    link: "#",
    github: "#",
  },
];

// Navigation component
const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-40 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-500 dark:text-blue-400"
        >
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            NH
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full border border-blue-200 dark:border-blue-900 px-6 py-2"
        >
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="#hero"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-blue-200 dark:border-blue-900"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-blue-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600" />
          )}
        </Button>
      </div>
    </header>
  );
};

// Hero section
const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-background/50 dark:from-blue-600/20 dark:to-background/80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/avatar.jpg"
                alt="Your Name"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Nicholas Hess
              </motion.h1>
              <motion.h2
                className="text-2xl md:text-3xl font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Web & App Developer
              </motion.h2>

              <motion.div
                className="flex justify-center md:justify-start gap-4 mb-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Link href="https://github.com/hessnt30" target="_blank">
                    <Github className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Link href="mailto:hello@example.com">
                    <Mail className="w-5 h-5" />
                  </Link>
                </Button>
                {/* Add more social icons as needed */}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-blue-200 dark:border-blue-900 rounded-xl p-6 md:p-8 max-w-3xl mx-auto shadow-lg shadow-blue-500/10"
          >
            <p className="text-lg md:text-xl mb-4">
              I'm a{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Virginia-based
              </span>{" "}
              web & app developer passionate about building interactive and
              creative digital experiences.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Specializing in
                </h3>
                <p className="font-medium">Full-Stack Web & Mobile Apps</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Experience
                </h3>
                <p className="font-medium">1 Year</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Available for
                </h3>
                <p className="font-medium">Collaborative Projects</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.div>
    </section>
  );
};

// About section
const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center py-20"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-md mx-auto md:mx-0"
          >
            <div className="absolute inset-0 border-2 border-blue-500 dark:border-blue-400 rounded-2xl transform rotate-6" />
            <div className="absolute inset-0 bg-muted rounded-2xl overflow-hidden">
              <Image
                src="/about.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-lg">
              <p>
                I'm a web & app developer passionate about crafting interactive,
                creative, and functional digital experiences.
              </p>
              <p>
                With expertise in front-end development, interactive design, and
                creative problem-solving, I build websites and applications that
                are not only functional but also intuitive and visually
                engaging.
              </p>
              <p>
                My approach blends technical precision with a passion for
                seamless user experiences, resulting in digital creations that
                are both efficient and impactful.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Docker",
                  "MongoDB",
                  "Three.js",
                  "Framer Motion",
                  "UI/UX Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Interactive Moodboard component
const Moodboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const moodImages = [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=300&width=400",
  ];

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Inspiration & Mood
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {moodImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={cn(
                "relative overflow-hidden rounded-lg",
                index % 3 === 0
                  ? "aspect-square"
                  : index % 3 === 1
                  ? "aspect-[4/3]"
                  : "aspect-[3/4]"
              )}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Mood image ${index + 1}`}
                fill
                className="object-cover transition-transform hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Projects section
const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="projects" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
                  !isEven && "md:flex-row-reverse"
                )}
              >
                <div className={cn(!isEven && "md:order-2")}>
                  <div className="relative overflow-hidden rounded-lg aspect-video group">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-4">
                        <Button
                          asChild
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                        >
                          <Link href={project.link} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Live
                          </Link>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                        >
                          <Link href={project.github} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cn(!isEven && "md:order-1")}>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      variant="default"
                      className="rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Link href={project.link} target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      <Link href={project.github} target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Contact section
const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="contact" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground">
            Interested in working together? Feel free to reach out for
            collaborations or just a friendly hello.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 rounded-md border border-blue-200 dark:border-blue-800 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded-md border border-blue-200 dark:border-blue-800 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-blue-200 dark:border-blue-800 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
            >
              Send Message
            </Button>
          </form>

          <div className="mt-8 flex justify-center gap-6">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Link href="mailto:hello@example.com">
                <Mail className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Link href="https://github.com" target="_blank">
                <Github className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="relative">
      <Cursor />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Moodboard />
      <Contact />
      <Footer />
    </main>
  );
}
