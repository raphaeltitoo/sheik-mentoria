"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6"
          >
            <Star className="w-4 h-4" />
            Solução #1 no mercado
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Transforme seu negócio com nossa
            <span className="text-primary block mt-2">solução inovadora</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Aumente sua produtividade em até 300% com nossa plataforma completa.
            Junte-se a mais de 10.000 empresas que já confiam em nós.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
              Começar gratuitamente
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Ver demonstração
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-md mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">10k+</div>
              <div className="text-sm text-muted-foreground">Clientes ativos</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-sm text-muted-foreground">Avaliação média</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">300%</div>
              <div className="text-sm text-muted-foreground">Aumento médio</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection 