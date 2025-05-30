import { useState, useCallback, type FormEvent } from "react"
import { FormData } from './types'
import { INITIAL_FORM_DATA, WEBHOOK_URL } from './constants'
import { formatCpf, formatTelefone, formatRG, formatMargem } from './utils'
import { validateCPF, validateRG, validateTelefone, validateMargem } from './validators'

export const useFormValidation = (formData: FormData) => {
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<FormData> = {}

    // Validação nome
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres"
    }

    // Validação CPF
    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório"
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido"
    }

    // Validação RG
    if (!formData.rg.trim()) {
      newErrors.rg = "RG é obrigatório"
    } else if (!validateRG(formData.rg)) {
      newErrors.rg = "RG inválido (mínimo 7 caracteres)"
    }

    // Validação idade
    if (!formData.idade.trim()) {
      newErrors.idade = "Idade é obrigatória"
    } else {
      const idade = parseInt(formData.idade)
      if (isNaN(idade) || idade < 18 || idade > 120) {
        newErrors.idade = "Idade deve ser entre 18 e 120 anos"
      }
    }

    // Validação telefone
    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório"
    } else if (!validateTelefone(formData.telefone)) {
      newErrors.telefone = "Telefone inválido (ex: (11) 99999-9999)"
    }

    // Validação endereço
    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório"
    } else if (formData.endereco.trim().length < 10) {
      newErrors.endereco = "Endereço deve ser mais detalhado"
    }

    // Validação profissão
    if (!formData.profissao.trim()) {
      newErrors.profissao = "Profissão é obrigatória"
    } else if (formData.profissao.trim().length < 2) {
      newErrors.profissao = "Profissão deve ter pelo menos 2 caracteres"
    }

    // Validação margem (opcional, mas se preenchida deve ser válida)
    if (formData.margem.trim() && !validateMargem(formData.margem)) {
      newErrors.margem = "Formato de margem inválido (ex: R$ 10.000 ou 50k)"
    }

    // Validação experiência
    if (!formData.experiencia.trim()) {
      newErrors.experiencia = "Este campo é obrigatório"
    } else if (formData.experiencia.trim().length < 10) {
      newErrors.experiencia = "Descreva sua experiência com mais detalhes"
    }

    // Validação objetivos
    if (!formData.objetivos.trim()) {
      newErrors.objetivos = "Este campo é obrigatório"
    } else if (formData.objetivos.trim().length < 10) {
      newErrors.objetivos = "Descreva seus objetivos com mais detalhes"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  return { errors, validateForm, setErrors }
}

export const useFormSubmission = (formData: FormData, validateForm: () => boolean, setFormData: React.Dispatch<React.SetStateAction<FormData>>) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Prepara os dados para envio
    const payloadData = {
      // Dados pessoais
      nome: formData.nome.trim(),
      cpf: formData.cpf.replace(/\D/g, ""), // Remove formatação
      cpf_formatado: formData.cpf, // Mantém formatação
      rg: formData.rg.replace(/[^\dxX]/g, ""), // Remove formatação
      rg_formatado: formData.rg, // Mantém formatação
      idade: parseInt(formData.idade),
      telefone: formData.telefone.replace(/\D/g, ""), // Remove formatação
      telefone_formatado: formData.telefone, // Mantém formatação
      endereco: formData.endereco.trim(),
      profissao: formData.profissao.trim(),
      margem: formData.margem.trim(),
      
      // Trading info
      experiencia: formData.experiencia.trim(),
      objetivos: formData.objetivos.trim(),
      
      // Metadados
      tipo_formulario: 'mentoria_presencial',
      timestamp: new Date().toISOString(),
      data_envio: new Date().toLocaleString('pt-BR'),
      origem: 'site_sheik_trader_pro',
      versao_formulario: '2.0',
      
      // Informações técnicas
      user_agent: typeof window !== "undefined" ? window.navigator.userAgent : null,
      url_origem: typeof window !== "undefined" ? window.location.href : null,
    }

    console.log('🚀 Enviando dados para webhook:', {
      url: WEBHOOK_URL,
      payload: payloadData
    })

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'SheikTraderPro-Form/2.0',
        },
        body: JSON.stringify(payloadData),
      })

      console.log('📡 Resposta do webhook:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      })

      // Tenta ler a resposta
      let responseData = null
      try {
        const responseText = await response.text()
        console.log('📄 Conteúdo da resposta:', responseText)
        
        if (responseText) {
          try {
            responseData = JSON.parse(responseText)
            console.log('📋 Dados parseados:', responseData)
          } catch {
            console.log('⚠️ Resposta não é JSON válido, mantendo como texto')
            responseData = responseText
          }
        }
      } catch (readError) {
        console.error('❌ Erro ao ler resposta:', readError)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Response: ${JSON.stringify(responseData)}`)
      }

      console.log('✅ Webhook enviado com sucesso!')

      // Google Analytics tracking
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
        console.log('📊 Google Analytics tracking enviado')
      }

      setSubmitSuccess(true)
      setFormData(INITIAL_FORM_DATA)
      
    } catch (error) {
      console.error("❌ Erro completo ao enviar formulário:", {
        error: error,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        stack: error instanceof Error ? error.stack : null,
        webhookUrl: WEBHOOK_URL,
        payloadData: payloadData
      })
      
      // Exibe erro mais detalhado para o usuário
      const errorMessage = error instanceof Error 
        ? `Erro ao enviar: ${error.message}` 
        : "Erro desconhecido ao enviar formulário"
        
      alert(`${errorMessage}\n\nTente novamente ou entre em contato conosco.\n\nDetalhes técnicos salvos no console.`)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, setFormData])

  return { isSubmitting, submitSuccess, handleSubmit }
}

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let formattedValue = value

    if (name === "cpf") {
      formattedValue = formatCpf(value)
    } else if (name === "telefone") {
      formattedValue = formatTelefone(value)
    } else if (name === "rg") {
      formattedValue = formatRG(value)
    } else if (name === "margem") {
      formattedValue = formatMargem(value)
    } else if (name === "idade") {
      formattedValue = value.replace(/\D/g, "")
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))
  }, [])

  return { formData, setFormData, handleInputChange }
} 