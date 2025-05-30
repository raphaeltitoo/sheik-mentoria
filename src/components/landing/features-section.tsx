"use client"

import { Zap, Shield, BarChart3, Smartphone, Headphones, Globe } from "lucide-react"

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Velocidade Extrema",
      description: "Performance otimizada que processa milhares de operações por segundo."
    },
    {
      icon: Shield,
      title: "Segurança Avançada", 
      description: "Criptografia de ponta e proteção contra as mais recentes ameaças."
    },
    {
      icon: BarChart3,
      title: "Analytics Inteligente",
      description: "Relatórios detalhados e insights automatizados para melhores decisões."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Interface responsiva que funciona perfeitamente em qualquer dispositivo."
    },
    {
      icon: Headphones,
      title: "Suporte 24/7",
      description: "Equipe especializada pronta para ajudar quando você precisar."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Disponível em mais de 50 países com infraestrutura local."
    }
  ]

  return (
    <section id="servicos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tudo que você precisa para
            <span className="text-primary block">crescer seu negócio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa com todas as ferramentas necessárias para
            otimizar sua operação e acelerar seus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection 