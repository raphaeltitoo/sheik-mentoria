import React from "react"
import Link from "next/link"

export const Footer = () => (
  <footer
    style={{
      position: "relative",
      zIndex: 10,
      borderTop: "1px solid #374151",
      padding: "2rem 0",
    }}
  >
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
            textAlign: "center",
            margin: "0",
          }}
        >
          &copy; {new Date().getFullYear()} Sheik Trader Pro. Todos os direitos reservados.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "#9ca3af",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Termos
          </Link>
          <Link
            href="#"
            style={{
              fontSize: "0.875rem",
              color: "#9ca3af",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Privacidade
          </Link>
        </div>
      </div>
    </div>
  </footer>
) 