import React from "react"
import { Loader2 } from "lucide-react"
import { InputFieldProps, TextAreaFieldProps, SubmitButtonProps } from './types'
import { STYLES } from './constants'

export const InputField: React.FC<InputFieldProps> = ({ name, value, onChange, placeholder, maxLength, error }) => {
  const hasContent = value && value.length > 0
  const isValid = hasContent && !error
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          style={{
            ...STYLES.input,
            border: error 
              ? "1px solid rgba(248, 113, 113, 0.6)" 
              : isValid 
                ? "1px solid rgba(34, 197, 94, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.1)",
            position: "relative",
            zIndex: 1,
          }}
          placeholder={placeholder}
          onFocus={(e) => {
            const target = e.target as HTMLInputElement
            target.style.border = error 
              ? "1px solid rgba(248, 113, 113, 0.8)" 
              : isValid
                ? "1px solid rgba(34, 197, 94, 0.5)"
                : "1px solid rgba(251, 191, 36, 0.5)"
            target.style.boxShadow = error 
              ? "0 0 0 3px rgba(248, 113, 113, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)" 
              : isValid
                ? "0 0 0 3px rgba(34, 197, 94, 0.1), 0 4px 12px rgba(34, 197, 94, 0.1)"
                : "0 0 0 3px rgba(251, 191, 36, 0.1), 0 4px 12px rgba(251, 191, 36, 0.15)"
            target.style.transform = "translateY(-1px)"
            target.style.backgroundColor = "rgba(255, 255, 255, 0.06)"
          }}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement
            target.style.border = error 
              ? "1px solid rgba(248, 113, 113, 0.6)" 
              : isValid
                ? "1px solid rgba(34, 197, 94, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.1)"
            target.style.boxShadow = "none"
            target.style.transform = "translateY(0)"
            target.style.backgroundColor = "rgba(255, 255, 255, 0.03)"
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLInputElement
            if (target !== document.activeElement) {
              target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
              target.style.borderColor = error 
                ? "rgba(248, 113, 113, 0.7)" 
                : isValid
                  ? "rgba(34, 197, 94, 0.4)"
                  : "rgba(255, 255, 255, 0.2)"
            }
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLInputElement
            if (target !== document.activeElement) {
              target.style.backgroundColor = "rgba(255, 255, 255, 0.03)"
              target.style.borderColor = error 
                ? "rgba(248, 113, 113, 0.6)" 
                : isValid
                  ? "rgba(34, 197, 94, 0.3)"
                  : "rgba(255, 255, 255, 0.1)"
            }
          }}
        />
        
        {/* Indicador de validação sutil */}
        {isValid && (
          <div
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              opacity: 0,
              animation: "fadeInScale 0.3s ease-out forwards",
              zIndex: 2,
            }}
          />
        )}
      </div>
      {error && (
        <span style={{
          fontSize: "0.75rem",
          color: "#fca5a5",
          marginLeft: "0.5rem",
          fontWeight: "300",
          opacity: 0,
          animation: "slideInError 0.3s ease-out forwards"
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, value, onChange, placeholder, rows = 2, error }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
    <div style={{ position: "relative" }}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          ...STYLES.input,
          border: error ? "1px solid rgba(248, 113, 113, 0.6)" : "1px solid rgba(255, 255, 255, 0.1)",
          resize: "none" as const,
          fontFamily: "inherit",
          position: "relative",
          zIndex: 1,
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.border = error ? "1px solid rgba(248, 113, 113, 0.8)" : "1px solid rgba(251, 191, 36, 0.5)"
          target.style.boxShadow = error 
            ? "0 0 0 3px rgba(248, 113, 113, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)" 
            : "0 0 0 3px rgba(251, 191, 36, 0.1), 0 4px 12px rgba(251, 191, 36, 0.15)"
          target.style.transform = "translateY(-1px)"
          target.style.backgroundColor = "rgba(255, 255, 255, 0.06)"
        }}
        onBlur={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.border = error ? "1px solid rgba(248, 113, 113, 0.6)" : "1px solid rgba(255, 255, 255, 0.1)"
          target.style.boxShadow = "none"
          target.style.transform = "translateY(0)"
          target.style.backgroundColor = "rgba(255, 255, 255, 0.03)"
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLTextAreaElement
          if (target !== document.activeElement) {
            target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"
            target.style.borderColor = error ? "rgba(248, 113, 113, 0.7)" : "rgba(255, 255, 255, 0.2)"
          }
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLTextAreaElement
          if (target !== document.activeElement) {
            target.style.backgroundColor = "rgba(255, 255, 255, 0.03)"
            target.style.borderColor = error ? "rgba(248, 113, 113, 0.6)" : "rgba(255, 255, 255, 0.1)"
          }
        }}
      />
    </div>
    {error && (
      <span style={{
        fontSize: "0.75rem",
        color: "#fca5a5",
        marginLeft: "0.5rem",
        fontWeight: "300",
        opacity: 0,
        animation: "slideInError 0.3s ease-out forwards"
      }}>
        {error}
      </span>
    )}
  </div>
)

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, onClick }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    onClick={onClick}
    style={{
      width: "100%",
      padding: "1rem 1.5rem",
      background: isSubmitting 
        ? "rgba(156, 163, 175, 0.3)" 
        : "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)",
      color: isSubmitting ? "#9ca3af" : "#fbbf24",
      fontWeight: "500",
      borderRadius: "0.875rem",
      border: isSubmitting 
        ? "1px solid rgba(156, 163, 175, 0.2)" 
        : "1px solid rgba(251, 191, 36, 0.3)",
      cursor: isSubmitting ? "not-allowed" : "pointer",
      fontSize: "0.9rem",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      letterSpacing: "0.05em",
      backdropFilter: "blur(10px)",
      marginTop: "0.75rem",
      transform: isSubmitting ? "none" : "translateY(0)",
      boxShadow: isSubmitting ? "none" : "0 4px 12px rgba(251, 191, 36, 0.15)",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={(e) => {
      if (!isSubmitting) {
        const target = e.target as HTMLButtonElement
        target.style.background = "linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(245, 158, 11, 0.2) 100%)"
        target.style.transform = "translateY(-2px) scale(1.02)"
        target.style.boxShadow = "0 8px 25px rgba(251, 191, 36, 0.3)"
        target.style.borderColor = "rgba(251, 191, 36, 0.6)"
      }
    }}
    onMouseLeave={(e) => {
      if (!isSubmitting) {
        const target = e.target as HTMLButtonElement
        target.style.background = "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)"
        target.style.transform = "translateY(0) scale(1)"
        target.style.boxShadow = "0 4px 12px rgba(251, 191, 36, 0.15)"
        target.style.borderColor = "rgba(251, 191, 36, 0.3)"
      }
    }}
    onMouseDown={(e) => {
      if (!isSubmitting) {
        const target = e.target as HTMLButtonElement
        target.style.transform = "translateY(0) scale(0.98)"
      }
    }}
    onMouseUp={(e) => {
      if (!isSubmitting) {
        const target = e.target as HTMLButtonElement
        target.style.transform = "translateY(-2px) scale(1.02)"
      }
    }}
  >
    {isSubmitting ? (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "0.75rem",
        opacity: 0,
        animation: "fadeInScale 0.3s ease-out forwards"
      }}>
        <Loader2 style={{ 
          width: "1rem", 
          height: "1rem", 
          animation: "spin 1s linear infinite" 
        }} />
        <span>Processando...</span>
      </div>
    ) : (
      <span style={{
        opacity: 0,
        animation: "fadeInScale 0.3s ease-out forwards"
      }}>
        Enviar Candidatura
      </span>
    )}
  </button>
) 