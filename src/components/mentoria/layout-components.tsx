import React from "react"
import Image from "next/image"
import { Crown, Calendar, MapPin, Star } from "lucide-react"
import { STYLES } from './constants'

export const LoadingSpinner = () => (
  <div style={STYLES.container}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ color: "white" }}>Carregando...</div>
    </div>
  </div>
)

export const BackgroundElements = () => (
  <>
    <div style={STYLES.backgroundGradient1}></div>
    <div style={STYLES.backgroundGradient2}></div>
    <div style={STYLES.animatedBlob1}></div>
    <div style={STYLES.animatedBlob2}></div>
  </>
)

export const Logo = () => (
  <div className="logo-container" style={{ display: "flex", justifyContent: "center" }}>
    <div className="logo-image" style={{ 
      position: "relative", 
      width: "420px", 
      height: "115px",
      filter: "drop-shadow(0 8px 24px rgba(251, 191, 36, 0.4))"
    }}>
      <Image
        src="/images/sheik-logo.png"
        alt="Sheik Trader Pro"
        fill
        priority
        style={{ 
          objectFit: "contain",
          objectPosition: "center"
        }}
      />
    </div>
  </div>
)

export const ExclusiveBadge = () => (
  <div
    className="badge"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.75rem 1.5rem",
      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(37, 99, 235, 0.15))",
      borderRadius: "9999px",
      border: "1px solid rgba(245, 158, 11, 0.3)",
      width: "fit-content",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 16px rgba(245, 158, 11, 0.1)",
    }}
  >
    <Crown style={{ width: "1.125rem", height: "1.125rem", color: "#fbbf24" }} />
    <span style={{ 
      fontSize: "0.9rem", 
      fontWeight: "500", 
      color: "#fef3c7",
      letterSpacing: "0.05em"
    }}>EXPERIÊNCIA EXCLUSIVA</span>
  </div>
)

export const MainTitle = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <h1
      style={{
        fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
        fontWeight: "200",
        letterSpacing: "-0.02em",
        lineHeight: "0.95",
        margin: "0",
        textAlign: "center",
      }}
    >
      <span
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "block",
          marginBottom: "0.25rem"
        }}
      >
        MENTORIA
      </span>
      <span style={{ 
        color: "rgba(248, 250, 252, 0.95)", 
        fontWeight: "100",
        letterSpacing: "0.1em"
      }}>PRESENCIAL</span>
    </h1>
    
    <p style={{
      fontSize: "1.1rem",
      color: "#cbd5e1",
      fontWeight: "300",
      lineHeight: "1.6",
      margin: "0 auto",
      maxWidth: "28rem",
      marginTop: "0.5rem",
      textAlign: "center"
    }}>
      Uma experiência transformadora para um{" "}
      <span style={{ 
        color: "#fbbf24", 
        fontWeight: "500",
        textShadow: "0 0 20px rgba(251, 191, 36, 0.3)"
      }}>grupo seleto</span>{" "}
      de traders comprometidos com a excelência.
    </p>
  </div>
)

export const EventDetails = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "2rem",
      fontSize: "0.95rem",
      color: "#9ca3af",
      marginTop: "1rem"
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Calendar style={{ width: "1.25rem", height: "1.25rem", color: "#60a5fa" }} />
      <span style={{ color: "#e2e8f0" }}>Julho 2025</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <MapPin style={{ width: "1.25rem", height: "1.25rem", color: "#60a5fa" }} />
      <span style={{ color: "#e2e8f0" }}>Gramado, RS</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Star style={{ width: "1.25rem", height: "1.25rem", color: "#fbbf24" }} />
      <span style={{ color: "#e2e8f0" }}>Grupo Selecionado</span>
    </div>
  </div>
)

export const CallToAction = () => (
  <div style={{
    padding: "1rem",
    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(37, 99, 235, 0.05))",
    borderRadius: "1rem",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    maxWidth: "24rem"
  }}>
    <p style={{
      fontSize: "0.9rem",
      color: "#e2e8f0",
      margin: "0",
      lineHeight: "1.5",
      textAlign: "center"
    }}>
      <span style={{ color: "#fbbf24", fontWeight: "500" }}>Vagas limitadas.</span>{" "}
      Processo seletivo rigoroso para garantir a qualidade da experiência.
    </p>
  </div>
)

export const LeftColumn = () => (
  <div className="left-content" style={{ 
    display: "flex", 
    flexDirection: "column", 
    gap: "2.5rem",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    minHeight: "70vh"
  }}>
    <Logo />
    <ExclusiveBadge />
    <MainTitle />
    <EventDetails />
    <CallToAction />
  </div>
) 