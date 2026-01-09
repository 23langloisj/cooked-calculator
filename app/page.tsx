import Stepper from "@/components/calculator/Stepper";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-black uppercase italic tracking-tighter text-orange-500 mb-12 text-center">
        Cooked Calculator
      </h1>
      <Stepper />
    </main>
  );
}
