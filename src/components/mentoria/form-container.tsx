import React from "react"
import { CheckCircle } from "lucide-react"
import { FormContainerProps } from './types'
import { InputField, TextAreaField, SubmitButton } from './form-fields'

export const SuccessMessage = () => (
  <div
    style={{
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      padding: "2.5rem 1.5rem",
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: "1.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
    }}
  >
    <div
      style={{
        width: "3.5rem",
        height: "3.5rem",
        margin: "0 auto",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CheckCircle style={{ width: "1.75rem", height: "1.75rem", color: "#10b981" }} />
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2 style={{ fontSize: "1.375rem", fontWeight: "400", color: "#f8fafc", margin: "0" }}>
        Candidatura Recebida
      </h2>
      <p
        style={{
          color: "#cbd5e1",
          fontSize: "0.95rem",
          margin: "0",
          lineHeight: "1.6",
        }}
      >
        Sua inscrição foi processada com sucesso. Nossa equipe analisará seu perfil e você será notificado
        caso seja selecionado para esta experiência exclusiva.
      </p>
    </div>
  </div>
)

export const FormContainer: React.FC<FormContainerProps> = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  isSubmitting, 
  submitSuccess, 
  errors 
}) => (
  <div style={{ maxWidth: "100%" }}>
    {submitSuccess ? (
      <div
        style={{
          opacity: 0,
          animation: "fadeInScale 0.6s ease-out forwards"
        }}
      >
        <SuccessMessage />
      </div>
    ) : (
      <div
        style={{
          background: "rgba(0, 0, 0, 0.15)",
          borderRadius: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "1.75rem",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLDivElement
          target.style.borderColor = "rgba(255, 255, 255, 0.12)"
          target.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.1)"
          target.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLDivElement
          target.style.borderColor = "rgba(255, 255, 255, 0.08)"
          target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)"
          target.style.transform = "translateY(0)"
        }}
      >
        {/* Efeito de brilho sutil */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.05), transparent)",
            animation: "shimmer 3s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "300",
            color: "#f8fafc",
            marginBottom: "1.5rem",
            textAlign: "center",
            margin: "0 0 1.5rem 0",
            letterSpacing: "0.05em",
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            position: "relative",
            zIndex: 1,
            opacity: 0,
            animation: "fadeInScale 0.6s ease-out 0.2s forwards"
          }}
        >
          Preencha o Formulário
        </h3>

        <form 
          onSubmit={handleSubmit} 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem",
            position: "relative",
            zIndex: 1,
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.4s forwards"
          }}
        >
          <InputField
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Nome completo"
            error={errors.nome}
          />

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "0.75rem",
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.5s forwards"
          }}>
            <InputField
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="CPF"
              maxLength={14}
              error={errors.cpf}
            />
            <InputField
              name="rg"
              value={formData.rg}
              onChange={handleInputChange}
              placeholder="RG"
              error={errors.rg}
            />
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "0.75rem",
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.6s forwards"
          }}>
            <InputField
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="Telefone"
              maxLength={15}
              error={errors.telefone}
            />
            <InputField
              name="idade"
              value={formData.idade}
              onChange={handleInputChange}
              placeholder="Idade"
              maxLength={3}
              error={errors.idade}
            />
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "0.75rem",
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.7s forwards"
          }}>
            <InputField
              name="profissao"
              value={formData.profissao}
              onChange={handleInputChange}
              placeholder="Profissão"
              error={errors.profissao}
            />
            <InputField
              name="margem"
              value={formData.margem}
              onChange={handleInputChange}
              placeholder="Margem a utilizar (ex: 25000, 50k)"
              error={errors.margem}
            />
          </div>

          <div style={{
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.8s forwards"
          }}>
            <InputField
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              placeholder="Endereço completo"
              error={errors.endereco}
            />
          </div>

          <div style={{
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 0.9s forwards"
          }}>
            <TextAreaField
              name="experiencia"
              value={formData.experiencia}
              onChange={handleInputChange}
              placeholder="Sua experiência com trading"
              error={errors.experiencia}
            />
          </div>

          <div style={{
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 1s forwards"
          }}>
            <TextAreaField
              name="objetivos"
              value={formData.objetivos}
              onChange={handleInputChange}
              placeholder="Suas expectativas e objetivos"
              error={errors.objetivos}
            />
          </div>

          <div style={{
            opacity: 0,
            animation: "fadeInUp 0.6s ease-out 1.1s forwards"
          }}>
            <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
          </div>
        </form>
      </div>
    )}
  </div>
) 