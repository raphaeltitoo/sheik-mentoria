"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  highlight?: boolean
}

export function GlassCard({ children, className, highlight = false, ...props }: GlassCardProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border shadow-xl",
        isDark ? "bg-gray-900/30 backdrop-blur-md border-gray-800/30" : "bg-white/10 backdrop-blur-md border-white/20",
        highlight && (isDark ? "border-gray-600/40 bg-gray-800/40" : "border-primary/20 bg-primary/5"),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GlassCard
