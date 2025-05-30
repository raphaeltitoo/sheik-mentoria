"use client"

import { useState, useEffect } from "react"
import { STYLES } from './mentoria/constants'
import { useFormData, useFormValidation, useFormSubmission } from './mentoria/hooks'
import { LoadingSpinner, BackgroundElements, LeftColumn } from './mentoria/layout-components'
import { FormContainer } from './mentoria/form-container'
import { Footer } from './mentoria/footer'

export default function MentoriaForm() {
  const [mounted, setMounted] = useState(false)
  const { formData, setFormData, handleInputChange } = useFormData()
  const { errors, validateForm } = useFormValidation(formData)
  const { isSubmitting, submitSuccess, handleSubmit } = useFormSubmission(formData, validateForm, setFormData)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raf = requestAnimationFrame(() => {
        const idleCallback = (window as any).requestIdleCallback || setTimeout
        idleCallback(() => {
          setMounted(true)
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [])

  if (!mounted) {
    return <LoadingSpinner />
  }

  return (
    <div style={STYLES.container}>
      <BackgroundElements />

      <main style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "2rem 1rem",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            opacity: 0,
            animation: "fadeInUp 0.8s ease-out forwards"
          }}
        >
          <div className="grid-container" style={STYLES.gridContainer}>
            <div style={{ 
              opacity: 0, 
              animation: "slideInLeft 0.8s ease-out 0.2s forwards" 
            }}>
              <LeftColumn />
            </div>
            <div style={{ 
              opacity: 0, 
              animation: "slideInRight 0.8s ease-out 0.4s forwards" 
            }}>
              <FormContainer
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitSuccess={submitSuccess}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInError {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 1rem !important;
          }
          .left-content {
            min-height: auto !important;
            gap: 2rem !important;
          }
          .logo-container {
            justify-content: center !important;
          }
          .logo-image {
            width: 320px !important;
            height: 85px !important;
          }
          .badge {
            margin: 0 auto !important;
            padding: 0.5rem 1rem !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
