import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { type Product, type StoreListing } from "../types";
import { Monitor, AlertCircle, Filter, ArrowDownUp } from "lucide-react";
import { ComparisonModal } from "../components/ComparisonModal";

const CATEGORY_NAMES: Record<string, string> = {
  "1": "Procesadores",
  "2": "Tarjetas Gráficas",
  "3": "Memorias RAM",
  "4": "Almacenamiento",
  "5": "Monitores",
  "6": "Fuentes de Poder",
  "7": "Placas Madre",
  cpu: "Procesadores",
  gpu: "Tarjetas Gráficas",
  ram: "Memorias RAM",
  storage: "Almacenamiento",
  monitor: "Monitores",
  psu: "Fuentes de Poder",
  motherboard: "Placas Madre",
};

export function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [listings, setListings] = useState<StoreListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (id) {
      setSelectedBrand("All");
      setSortOrder("asc");
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

  const uniqueBrands = useMemo(() => {
    const brands = products.map((p) => p.brand).filter(Boolean);
    return Array.from(new Set(brands)).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    result.sort((a, b) => {
      const priceA = a.bestPrice ?? Infinity;
      const priceB = b.bestPrice ?? Infinity;

      if (sortOrder === "asc") {
        return priceA - priceB;
      } else {
        if (priceA === Infinity && priceB === Infinity) return 0;
        if (priceA === Infinity) return 1;
        if (priceB === Infinity) return -1;
        return priceB - priceA;
      }
    });

    return result;
  }, [products, selectedBrand, sortOrder]);

  const categoryTitle = id ? CATEGORY_NAMES[id] || "Categoría de Hardware" : "Categoría";

  return (
    <div>
      <div className="mb-8 border-b border-bone-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-warm-900">{categoryTitle}</h2>
          <p className="text-gray-500 mt-1">Comparativa de precios y rendimiento</p>
        </div>
      </div>

      {/* BARRA DE FILTROS Y ORDENAMIENTO */}
      {!loading && products.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-bone-200 mb-6 gap-4">
          {/* Filtro de Marca */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter size={20} className="text-warm-500" />
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-bone-50 border border-bone-200 text-gray-700 text-sm rounded-xl focus:ring-warm-500 focus:border-warm-500 block w-full p-2.5 outline-none transition-all cursor-pointer"
            >
              <option value="All">Todas las marcas</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Orden de Precio */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <ArrowDownUp size={20} className="text-warm-500" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="bg-bone-50 border border-bone-200 text-gray-700 text-sm rounded-xl focus:ring-warm-500 focus:border-warm-500 block w-full p-2.5 outline-none transition-all cursor-pointer"
            >
              <option value="asc">Precio: Menor a Mayor</option>
              <option value="desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-bone-200/50 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-bone-200">
          <AlertCircle className="mx-auto h-12 w-12 text-bone-200 mb-4" />
          <p className="text-gray-500">{products.length === 0 ? "No hay productos en esta categoría aún." : "No se encontraron productos con esos filtros."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
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
                <div className={`flex items-center justify-center w-full h-full text-bone-200 absolute top-0 left-0 ${product.imageUrl ? "hidden" : ""}`}>
                  <Monitor className="h-16 w-16" />
                </div>
              </div>

              <div className="flex-1">
                <div className="text-[10px] font-bold tracking-wider text-warm-600 uppercase mb-1">{product.brand}</div>
                <h3 className="font-bold text-gray-800 leading-tight mb-2 h-10 overflow-hidden">{product.modelName}</h3>
              </div>

              {/* Sección de Precio con Formato de Soles Peruano */}
              <div className="pt-4 border-t border-bone-100 flex items-end justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Desde:</span>
                  <span className={`text-xl font-bold ${product.bestPrice ? "text-gray-900" : "text-gray-400"}`}>
                    {product.bestPrice ? new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(product.bestPrice) : "---"}
                  </span>
                </div>
                <button
                  onClick={() => handleCompareClick(product)}
                  className="bg-warm-500 hover:bg-warm-600 text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-warm-500/30 transition-transform active:scale-95"
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
