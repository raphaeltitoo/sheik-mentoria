// Declaração para o TypeScript reconhecer o dataLayer
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export interface FormData {
  nome: string
  cpf: string
  rg: string
  idade: string
  telefone: string
  endereco: string
  profissao: string
  margem: string
  experiencia: string
  objetivos: string
}

export interface InputFieldProps {
  name: keyof FormData
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  maxLength?: number
  error?: string
}

export interface TextAreaFieldProps {
  name: keyof FormData
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  rows?: number
  error?: string
}

export interface SubmitButtonProps {
  isSubmitting: boolean
  onClick: (e: React.FormEvent) => void
}

export interface FormContainerProps {
  formData: FormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  submitSuccess: boolean
  errors: Partial<FormData>
} 