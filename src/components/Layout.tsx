import { Search, Home, Cpu, MemoryStick, Settings, Server } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Basado en tu script SQL de Seed Data:
  // 1: CPU, 2: GPU, 3: RAM
  const menuItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Cpu, label: "Procesadores", path: "/category/3" },
    { icon: Server, label: "Tarjetas Gráficas", path: "/category/2" },
    { icon: MemoryStick, label: "Memorias RAM", path: "/category/1" },
  ];

  return (
    <div className="flex min-h-screen bg-bone-50 text-gray-800 font-sans">
      {/* SIDEBAR LATERAL */}
      <aside className="w-64 bg-white border-r border-bone-200 flex flex-col fixed h-full shadow-sm z-10">
        <div className="p-6 border-b border-bone-100">
          <h1 className="text-xs font-bold text-warm-900 tracking-tight">BEST PRICE</h1>
          <p className="text-xs text-gray-400 mt-1">Comparator System v1.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-warm-50 text-warm-600 font-bold shadow-sm" : "text-gray-500 hover:bg-bone-50 hover:text-warm-500"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-bone-100">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 w-full">
            <Settings size={20} />
            <span>Configuración</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
