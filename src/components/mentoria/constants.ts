import { FormData } from './types'

export const WEBHOOK_URL = 'https://webhooks.sheiktraderpro.com/webhook/bc8bd11d-c1a3-4fb0-8b5f-7c10b658e564'

export const INITIAL_FORM_DATA: FormData = {
  nome: "",
  cpf: "",
  rg: "",
  idade: "",
  telefone: "",
  endereco: "",
  profissao: "",
  margem: "",
  experiencia: "",
  objetivos: "",
}

export const STYLES = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    color: "white",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  backgroundGradient1: {
    position: "fixed" as const,
    inset: "0",
    background: "linear-gradient(135deg, #000000 0%, rgba(30, 58, 138, 0.2) 50%, #000000 100%)",
  },
  backgroundGradient2: {
    position: "fixed" as const,
    inset: "0",
    background: "linear-gradient(45deg, rgba(245, 158, 11, 0.05) 0%, transparent 50%, rgba(37, 99, 235, 0.1) 100%)",
  },
  animatedBlob1: {
    position: "fixed" as const,
    top: "5rem",
    left: "5rem",
    width: "24rem",
    height: "24rem",
    background: "linear-gradient(to right, rgba(245, 158, 11, 0.1), transparent)",
    borderRadius: "50%",
    filter: "blur(3rem)",
    animation: "pulse 2s infinite",
  },
  animatedBlob2: {
    position: "fixed" as const,
    bottom: "5rem",
    right: "5rem",
    width: "24rem",
    height: "24rem",
    background: "linear-gradient(to left, rgba(37, 99, 235, 0.1), transparent)",
    borderRadius: "50%",
    filter: "blur(3rem)",
    animation: "pulse 2s infinite",
    animationDelay: "1s",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "0.875rem",
    color: "#f8fafc",
    fontSize: "0.875rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box" as const,
    fontWeight: "300",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    width: "100%",
    alignItems: "center",
  },
} 