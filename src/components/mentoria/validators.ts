export const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "")
  
  if (digits.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(digits)) return false
  
  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i)
  }
  let remainder = sum % 11
  let digit1 = remainder < 2 ? 0 : 11 - remainder
  
  if (parseInt(digits[9]) !== digit1) return false
  
  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i)
  }
  remainder = sum % 11
  let digit2 = remainder < 2 ? 0 : 11 - remainder
  
  return parseInt(digits[10]) === digit2
}

export const validateRG = (rg: string): boolean => {
  const cleaned = rg.replace(/[^\dxX]/g, "")
  
  // RG deve ter entre 7 e 14 caracteres (incluindo X)
  if (cleaned.length < 7 || cleaned.length > 14) return false
  
  // Verifica se tem pelo menos 6 dígitos
  const digitsOnly = cleaned.replace(/[xX]/g, "")
  if (digitsOnly.length < 6) return false
  
  // Verifica se não são todos os dígitos iguais
  if (/^(\d)\1+$/.test(digitsOnly)) return false
  
  return true
}

export const validateTelefone = (telefone: string): boolean => {
  const digits = telefone.replace(/\D/g, "")
  
  // Deve ter 10 ou 11 dígitos
  if (digits.length < 10 || digits.length > 11) return false
  
  // Verifica formato básico (DDD + número)
  const ddd = digits.substring(0, 2)
  const numero = digits.substring(2)
  
  // DDDs válidos (principais do Brasil)
  const ddsValidos = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
    '21', '22', '24', // RJ
    '27', '28', // ES
    '31', '32', '33', '34', '35', '37', '38', // MG
    '41', '42', '43', '44', '45', '46', // PR
    '47', '48', '49', // SC
    '51', '53', '54', '55', // RS
    '61', // DF
    '62', '64', // GO
    '63', // TO
    '65', '66', // MT
    '67', // MS
    '68', // AC
    '69', // RO
    '71', '73', '74', '75', '77', // BA
    '79', // SE
    '81', '87', // PE
    '82', // AL
    '83', // PB
    '84', // RN
    '85', '88', // CE
    '86', '89', // PI
    '91', '93', '94', // PA
    '92', '97', // AM
    '95', // RR
    '96', // AP
    '98', '99', // MA
  ]
  
  if (!ddsValidos.includes(ddd)) return false
  
  // Para celular (11 dígitos), o primeiro dígito deve ser 9
  if (digits.length === 11 && numero[0] !== '9') return false
  
  // Para fixo (10 dígitos), o primeiro dígito deve ser 2, 3, 4 ou 5
  if (digits.length === 10 && !['2', '3', '4', '5'].includes(numero[0])) return false
  
  // Verifica se não são todos os dígitos do número iguais
  if (/^(\d)\1+$/.test(numero)) return false
  
  return true
}

export const validateMargem = (margem: string): boolean => {
  if (!margem.trim()) return true // Campo opcional
  
  // Remove espaços e converte para minúsculo
  const cleaned = margem.trim().toLowerCase()
  
  // Aceita valores monetários (R$ 1.000, 1000, R$ 1.000,00, etc.)
  const monetaryPattern = /^(r\$\s?)?[\d.,]+$/
  if (monetaryPattern.test(cleaned)) {
    // Extrai apenas números e vírgula/ponto
    const numbers = cleaned.replace(/[^\d.,]/g, '')
    // Verifica se tem formato válido de número
    const numberPattern = /^\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?$|^\d+(?:[.,]\d{2})?$/
    return numberPattern.test(numbers)
  }
  
  // Aceita valores como "10k", "50k", "100k", etc.
  const shortPattern = /^\d+k$/
  if (shortPattern.test(cleaned)) return true
  
  // Aceita descrições textuais simples
  const textPattern = /^[a-záàâãéêíóôõúç\s\d.,k%-]+$/
  return textPattern.test(cleaned) && cleaned.length <= 50
} 