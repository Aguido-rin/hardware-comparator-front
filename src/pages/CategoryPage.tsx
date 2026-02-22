import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
// type también se puede importar así
import { type Product, type StoreListing } from "../types";
import { Monitor, AlertCircle } from "lucide-react";
import { ComparisonModal } from "../components/ComparisonModal";

const CATEGORY_NAMES: Record<string, string> = {
  "1": "Memorias RAM",
  "2": "Tarjetas Gráficas",
  "3": "Procesadores",
  "4": "Almacenamiento",
  "5": "Placas Madre",
};

export function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [listings, setListings] = useState<StoreListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    if (id) {
      loadCategoryProducts(parseInt(id));
    }
  }, [id]);

  const loadCategoryProducts = async (categoryId: number) => {
    setLoading(true);
    try {
      const data = await api.getProductsByCategory(categoryId);
      setProducts(data);
    } catch (error) {
      console.error("Error cargando categoría:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompareClick = async (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setLoadingListings(true);
    setListings([]);
    try {
      const data = await api.getListingsByProduct(product.id);
      setListings(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingListings(false);
    }
  };

  const categoryTitle = id ? CATEGORY_NAMES[id] || "Categoría" : "Categoría";

  return (
    <div>
      <div className="mb-8 border-b border-bone-200 pb-4">
        <h2 className="text-3xl font-bold text-warm-900">{categoryTitle}</h2>
        <p className="text-gray-500 mt-1">Comparativa de precios y rendimiento</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-bone-200/50 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-bone-200">
          <AlertCircle className="mx-auto h-12 w-12 text-bone-200 mb-4" />
          <p className="text-gray-500">No hay productos en esta categoría aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-4 border border-bone-200 hover:border-warm-500/50 hover:shadow-xl hover:shadow-warm-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 flex items-center justify-center mb-4 bg-bone-50 rounded-xl group-hover:bg-white transition relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.modelName}
                    className="h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : (
                  <Monitor className="text-bone-200 h-16 w-16" />
                )}
              </div>

              <div className={`flex items-center justify-center w-full h-full text-bone-200 ${product.imageUrl ? "hidden" : ""}`}>
                <Monitor className="h-16 w-16" />
              </div>

              <div className="flex-1">
                <div className="text-[10px] font-bold tracking-wider text-warm-600 uppercase mb-1">{product.brand}</div>
                <h3 className="font-bold text-gray-800 leading-tight mb-2 h-10 overflow-hidden">{product.modelName}</h3>

                {/* Specs simplificadas */}
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

              <div className="pt-4 border-t border-bone-100 flex items-end justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Desde:</span>
                  <span className={`text-xl font-bold ${product.bestPrice ? "text-gray-900" : "text-gray-400"}`}>{product.bestPrice ? `$${product.bestPrice}` : "---"}</span>
                </div>
                <button
                  onClick={() => handleCompareClick(product)}
                  className="bg-warm-500 hover:bg-warm-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-warm-500/30 transition-transform active:scale-95"
                >
                  Comparar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ComparisonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} listings={listings} loading={loadingListings} />
    </div>
  );
}
