import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary mb-4 block">
              Logo
            </Link>
            <p className="text-muted-foreground mb-4">
              Transformando negócios com tecnologia inovadora e soluções escaláveis.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Links úteis */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Demonstração
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">contato@empresa.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">(11) 99999-9999</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  São Paulo, SP<br />
                  Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Empresa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 