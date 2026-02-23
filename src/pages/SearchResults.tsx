import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import type { Product, StoreListing } from "../types/index.ts";
import { AlertCircle, Monitor } from "lucide-react";
import { ComparisonModal } from "../components/ComparisonModal";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Estado para el Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [listings, setListings] = useState<StoreListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = query ? await api.searchProducts(query) : await api.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  // --- Lógica para abrir el modal y traer precios ---
  const handleCompareClick = async (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setLoadingListings(true);
    setListings([]); // Limpiamos datos viejos

    try {
      const data = await api.getListingsByProduct(product.id);
      setListings(data);
    } catch (error) {
      console.error("Error cargando listados:", error);
    } finally {
      setLoadingListings(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-warm-900">{query ? `Resultados para "${query}"` : "Catálogo Completo"}</h2>
        <p className="text-gray-500 text-sm">Mostrando {products.length} productos disponibles</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-bone-200/50 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-bone-200">
          <AlertCircle className="mx-auto h-12 w-12 text-bone-200 mb-4" />
          <p className="text-gray-500">No encontramos hardware con ese nombre.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-4 border border-bone-200 hover:border-warm-500/50 hover:shadow-xl hover:shadow-warm-500/10 transition-all duration-300 flex flex-col"
            >
              {/* Imagen con Blindaje */}
              <div className="h-48 flex items-center justify-center mb-4 bg-bone-50 rounded-xl group-hover:bg-white transition relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.modelName}
                    className="h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"; // Oculta la imagen rota
                      e.currentTarget.nextElementSibling?.classList.remove("hidden"); // Muestra el icono de respaldo
                    }}
                  />
                ) : null}

                {/* Icono de Respaldo (Oculto por defecto si hay URL) */}
                <div className={`flex items-center justify-center w-full h-full text-bone-200 ${product.imageUrl ? "hidden" : ""}`}>
                  <Monitor className="h-16 w-16" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="text-[10px] font-bold tracking-wider text-warm-600 uppercase mb-1">{product.categoryName}</div>
                <h3 className="font-bold text-gray-800 leading-tight mb-2 group-hover:text-warm-600 transition">{product.modelName}</h3>

                {/* Tech Specs Mini */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.techSpecs &&
                    Object.entries(product.techSpecs)
                      .slice(0, 3)
                      .map(([k, v]) => (
                        <span key={k} className="text-[10px] bg-bone-50 text-gray-500 px-2 py-1 rounded-md border border-bone-100">
                          {String(v)}
                        </span>
                      ))}
                </div>
              </div>

              {/* Footer Precio */}
              <div className="pt-4 border-t border-bone-100 flex items-end justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Mejor precio:</span>
                  <span className={`text-xl font-bold ${product.bestPrice ? "text-gray-900" : "text-gray-400"}`}>{product.bestPrice ? `$${product.bestPrice}` : "Sin Stock"}</span>
                </div>
                <button
                  onClick={() => handleCompareClick(product)} // <--- Conectado aquí
                  className="bg-warm-500 hover:bg-warm-600 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-warm-500/30 transition-transform active:scale-95"
                >
                  Comparar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Renderizamos el Modal aquí */}
      <ComparisonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} listings={listings} loading={loadingListings} />
    </div>
  );
}
