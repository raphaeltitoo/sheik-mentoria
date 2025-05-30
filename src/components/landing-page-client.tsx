"use client"

import type React from "react"

import { useState, useEffect, type FormEvent, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Loader2, Crown, Calendar, MapPin, Star, DollarSign } from "lucide-react"

// Declaração para o TypeScript reconhecer o dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

interface FormData {
  nome: string
  cpf: string
  rg: string
  idade: string
  endereco: string
  profissao: string
  margem: string
  experiencia: string
  objetivos: string
}

export default function LandingPageClient() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpf: "",
    rg: "",
    idade: "",
    endereco: "",
    profissao: "",
    margem: "",
    experiencia: "",
    objetivos: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Formatação específica para CPF
  const formatCpf = (value: string): string => {
    const digits = value.replace(/\D/g, "")
    return digits.length <= 11
      ? digits
          .replace(/(\d{3})(?=\d)/, "$1.")
          .replace(/(\d{3})(?=\d)/, "$1.")
          .replace(/(\d{3})(?=\d)/, "$1-")
      : value
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "cpf") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatCpf(value),
      }))
      return
    }

    if (name === "idade") {
      const digits = value.replace(/\D/g, "")
      setFormData((prev) => ({
        ...prev,
        [name]: digits,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!formData.cpf.trim() || formData.cpf.replace(/\D/g, "").length !== 11) newErrors.cpf = "CPF inválido"
    if (!formData.rg.trim()) newErrors.rg = "RG é obrigatório"
    if (!formData.idade.trim()) newErrors.idade = "Idade é obrigatória"
    if (!formData.endereco.trim()) newErrors.endereco = "Endereço é obrigatório"
    if (!formData.profissao.trim()) newErrors.profissao = "Profissão é obrigatória"
    if (!formData.experiencia.trim()) newErrors.experiencia = "Este campo é obrigatório"
    if (!formData.objetivos.trim()) newErrors.objetivos = "Este campo é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "mentoriaSubmission",
          formName: "mentoriaPresencial",
          user_data: {
            nome: formData.nome,
            cpf: formData.cpf.replace(/\D/g, ""),
            idade: formData.idade,
          },
        })
      }

      setSubmitSuccess(true)

      setFormData({
        nome: "",
        cpf: "",
        rg: "",
        idade: "",
        endereco: "",
        profissao: "",
        margem: "",
        experiencia: "",
        objetivos: "",
      })
    } catch (error) {
      console.error("Erro ao processar inscrição:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raf = requestAnimationFrame(() => {
        const idleCallback = (window as Window & typeof globalThis & { requestIdleCallback?: (callback: () => void) => void }).requestIdleCallback || setTimeout
        idleCallback(() => {
          setMounted(true)
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-blue-600/10"></div>

      {/* Elegant animated elements */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

      <main className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
          {/* Premium Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative w-[160px] h-[45px] sm:w-[200px] sm:h-[60px]">
                <Image
                  src="/images/sheik-logo.png"
                  alt="Sheik Trader Pro"
                  fill
                  priority
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500/20 to-blue-600/20 rounded-full border border-amber-500/30">
                <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-medium text-amber-100">EXPERIÊNCIA EXCLUSIVA</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight">
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  MENTORIA
                </span>
                <br />
                <span className="text-white font-extralight">PRESENCIAL</span>
              </h1>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                  <span>Julho 2025</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                  <span>Gramado, RS</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
                  <span>Grupo Selecionado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl sm:max-w-3xl mx-auto">
            {submitSuccess ? (
              <div className="text-center space-y-6 sm:space-y-8 py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-light text-amber-400">Candidatura Recebida</h2>
                  <p className="text-gray-300 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
                    Sua inscrição foi processada com sucesso. Nossa equipe analisará seu perfil e você será notificado
                    caso seja selecionado para esta experiência exclusiva.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Premium Info Section */}
                <div className="text-center space-y-3 sm:space-y-4 py-4 sm:py-6 border-t border-b border-gray-800">
                  <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-xl sm:max-w-2xl mx-auto px-2">
                    Uma experiência transformadora para um{" "}
                    <span className="text-amber-400 font-medium">grupo seleto</span> de traders comprometidos com a
                    excelência.
                  </p>
                </div>

                {/* Simplified Form with Micro-animations */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative group">
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                          errors.nome ? "border-red-500" : "border-gray-700"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                        placeholder="Nome completo"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                          errors.cpf ? "border-red-500" : "border-gray-700"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                        placeholder="CPF"
                        maxLength={14}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="rg"
                        value={formData.rg}
                        onChange={handleInputChange}
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                          errors.rg ? "border-red-500" : "border-gray-700"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                        placeholder="RG"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="idade"
                        value={formData.idade}
                        onChange={handleInputChange}
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                          errors.idade ? "border-red-500" : "border-gray-700"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                        placeholder="Idade"
                        maxLength={3}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                        errors.endereco ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                      placeholder="Endereço completo"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative group">
                      <input
                        type="text"
                        name="profissao"
                        value={formData.profissao}
                        onChange={handleInputChange}
                        className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                          errors.profissao ? "border-red-500" : "border-gray-700"
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                        placeholder="Profissão"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        name="margem"
                        value={formData.margem}
                        onChange={handleInputChange}
                        className="w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10"
                        placeholder="Margem a utilizar"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleInputChange}
                      className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                        errors.experiencia ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                      placeholder="Sua experiência com trading"
                      rows={3}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div className="relative group">
                    <textarea
                      name="objetivos"
                      value={formData.objetivos}
                      onChange={handleInputChange}
                      className={`w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-black/50 border ${
                        errors.objetivos ? "border-red-500" : "border-gray-700"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none text-sm sm:text-base transform focus:scale-[1.02] focus:shadow-lg focus:shadow-amber-400/10`}
                      placeholder="Suas expectativas e objetivos"
                      rows={3}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-blue-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Premium Disclaimer */}
                  <div className="bg-gradient-to-r from-amber-500/5 to-blue-600/5 border border-amber-500/20 rounded-lg p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-amber-300 font-medium mb-2">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base text-center">
                        Investimento: R$ 15.000,00 (apenas para selecionados)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-center">
                      Esta é uma pré-inscrição para processo seletivo. Após o preenchimento, aguarde ser selecionado
                      para participar da mentoria presencial exclusiva em Gramado-RS.
                    </p>
                  </div>

                  {/* Premium Submit Button with Hover Effects */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/25 text-sm sm:text-base transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        <span>Processando...</span>
                      </div>
                    ) : (
                      <span className="tracking-wide">ENVIAR CANDIDATURA</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} Sheik Trader Pro. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-amber-400 transition-colors">
                Termos
              </Link>
              <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-amber-400 transition-colors">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
