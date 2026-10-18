import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

import heroImage from "@/assets/hero-fabrics.jpg";
import suitingImage from "@/assets/collection-suiting.jpg";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <img
            src={heroImage}
            alt="MGS Fabrics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="container">
              <motion.h1 
                className="font-display text-4xl lg:text-6xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Story
              </motion.h1>
              <motion.p 
                className="text-white/90 text-lg lg:text-xl max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Three generations of passion for exceptional fabrics
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-semibold mb-8">
                A Legacy of Excellence
              </motion.h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <motion.p variants={fadeUp}>
                  Founded in 1952, MGS Fabrics has been the trusted source for discerning tailors and menswear enthusiasts seeking only the finest textiles. What began as a small import business in London's Savile Row has grown into an internationally recognized purveyor of luxury fabrics.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Our founder, Thomas MGS, believed that great tailoring starts with great fabric. That philosophy continues to guide us today as we source materials from the world's most prestigious mills—from the wool masters of Biella to the cotton specialists of Switzerland.
                </motion.p>
                <motion.p variants={fadeUp}>
                  Every fabric in our collection is personally selected for its quality, hand, and drape. We work directly with mills to ensure the highest standards, and many of our exclusive weaves are produced specifically for MGS Fabrics.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <motion.div 
            className="container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-semibold text-center mb-16">
              Our Values
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div variants={fadeUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-foreground rounded-full">
                  <span className="font-display text-2xl font-bold">Q</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-4">Uncompromising Quality</h3>
                <p className="text-muted-foreground">
                  We never settle for anything less than the finest materials and craftsmanship. Every fabric meets our exacting standards.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-foreground rounded-full">
                  <span className="font-display text-2xl font-bold">H</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-4">Heritage & Innovation</h3>
                <p className="text-muted-foreground">
                  We honor traditional textile craftsmanship while embracing modern techniques that enhance performance and sustainability.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-foreground rounded-full">
                  <span className="font-display text-2xl font-bold">S</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-4">Personal Service</h3>
                <p className="text-muted-foreground">
                  Our expert team is dedicated to helping you find the perfect fabric for your vision, with personalized guidance every step.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden">
                <img
                  src={suitingImage}
                  alt="Fine fabrics"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-6">
                  Experience the Difference
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  We invite you to explore our collection and discover why the world's finest tailors choose MGS Fabrics. Whether you're crafting a bespoke suit or simply appreciate the finer things, you'll find something exceptional here.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center px-8 py-3 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
                >
                  Explore Our Collection
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
