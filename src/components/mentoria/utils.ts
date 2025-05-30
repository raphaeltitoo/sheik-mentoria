export const formatCpf = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2") 
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }
  return value
}

export const formatTelefone = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  
  if (digits.length <= 11) {
    if (digits.length <= 2) {
      return digits
    } else if (digits.length <= 6) {
      return digits.replace(/(\d{2})(\d)/, "($1) $2")
    } else if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d)/, "($1) $2-$3")
    } else {
      return digits.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3")
    }
  }
  return value
}

export const formatRG = (value: string): string => {
  const cleaned = value.replace(/[^\dxX]/g, "").toUpperCase()
  
  if (cleaned.length === 0) return ""
  
  if (cleaned.length <= 9) {
    // Formato padrão: XX.XXX.XXX-X
    if (cleaned.length >= 8) {
      // Com 8 ou mais dígitos, aplica formatação completa
      return cleaned
        .replace(/(\d{1,2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1})$/, "$1-$2")
    } else if (cleaned.length >= 5) {
      // Com 5-7 dígitos, aplica pontos
      return cleaned
        .replace(/(\d{1,2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
    } else if (cleaned.length >= 3) {
      // Com 3-4 dígitos, primeiro ponto
      return cleaned.replace(/(\d{1,2})(\d)/, "$1.$2")
    } else {
      // Menos de 3 dígitos, sem formatação
      return cleaned
    }
  } else {
    // Para RGs maiores, formato mais flexível mas sempre com traço no final
    return cleaned.substring(0, 14)
  }
}

export const formatMargem = (value: string): string => {
  // Remove caracteres não permitidos
  let cleaned = value.replace(/[^\w\s.,%-kKrR$]/g, "")
  
  // Se o usuário digitou apenas números
  const numbersOnly = cleaned.replace(/[^\d]/g, "")
  if (/^\d+$/.test(cleaned.trim()) && numbersOnly.length > 0) {
    const number = parseInt(numbersOnly)
    if (number >= 1000) {
      // Formatar como R$ X.XXX com pontuação brasileira
      return `R$ ${number.toLocaleString('pt-BR')}`
    } else if (number > 0) {
      return `R$ ${number}`
    }
  }
  
  // Se já contém R$ no início, reformata o número
  if (cleaned.toLowerCase().startsWith('r$')) {
    const numberPart = cleaned.replace(/[^\d]/g, '')
    if (numberPart.length > 0) {
      const number = parseInt(numberPart)
      if (number >= 1000) {
        return `R$ ${number.toLocaleString('pt-BR')}`
      } else if (number > 0) {
        return `R$ ${number}`
      }
    }
    return 'R$ '
  }
  
  // Se contém 'k' ou 'K', mantém formato abreviado
  if (/\d+k/i.test(cleaned)) {
    const numberPart = cleaned.replace(/[^\d]/g, '')
    if (numberPart.length > 0) {
      const number = parseInt(numberPart)
      return `R$ ${number}k`
    }
  }
  
  // Se contém pontos/vírgulas, tenta reformatar
  if (/[\d.,]+/.test(cleaned)) {
    const numberPart = cleaned.replace(/[^\d]/g, '')
    if (numberPart.length > 0) {
      const number = parseInt(numberPart)
      if (number >= 1000) {
        return `R$ ${number.toLocaleString('pt-BR')}`
      } else if (number > 0) {
        return `R$ ${number}`
      }
    }
  }
  
  // Para outros casos, limita a 50 caracteres
  return cleaned.substring(0, 50)
} 