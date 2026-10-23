import { EquipoView } from "@/features/equipo/components/EquipoView";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <EquipoView />
      </div>
    </main>
  );
}
