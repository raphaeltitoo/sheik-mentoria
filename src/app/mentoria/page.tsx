import MentoriaForm from '@/components/mentoria-form'

export default function MentoriaPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/10 to-black"></div>
      
      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col">
        <MentoriaForm />
      </main>
    </div>
  )
}
