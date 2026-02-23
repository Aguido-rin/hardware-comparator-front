import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-warm-900 mb-4">Encuentra tu componente</h2>
        <p className="text-gray-500 text-lg">Comparamos precios de varias tiendas tiempo real.</p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
        <input
          type="text"
          placeholder="Ej: RTX 4060, Ryzen 7 5700x..."
          className="w-full pl-6 pr-14 py-4 rounded-2xl border-2 border-bone-200 shadow-sm text-lg focus:border-warm-500 focus:ring-4 focus:ring-warm-500/10 outline-none transition-all bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-3 bg-warm-500 hover:bg-warm-600 text-white p-2 rounded-xl transition-colors">
          <Search size={24} />
        </button>
      </form>

      {/* Tags de ejemplo rápido */}
      <div className="mt-6 flex gap-3 text-sm text-gray-500">
        <span>Tendencias:</span>
        <button onClick={() => navigate("/search?q=RTX 4060")} className="hover:text-warm-500 underline decoration-warm-500/30">
          RTX 4060
        </button>
        <button onClick={() => navigate("/search?q=DDR5")} className="hover:text-warm-500 underline decoration-warm-500/30">
          RAM DDR5
        </button>
        <button onClick={() => navigate("/search?q=i5 13600k")} className="hover:text-warm-500 underline decoration-warm-500/30">
          Core i5
        </button>
      </div>
    </div>
  );
}
