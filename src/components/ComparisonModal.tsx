import { X, ShoppingCart, AlertCircle } from "lucide-react";
import type { StoreListing, Product } from "../types/index.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  listings: StoreListing[];
  loading: boolean;
}

export function ComparisonModal({ isOpen, onClose, product, listings, loading }: Props) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/20 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl shadow-warm-900/10 border border-white overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header - Ahora en tonos claros y cálidos */}
        <div className="p-6 border-b border-bone-100 flex justify-between items-start bg-bone-50/50">
          <div>
            <h3 className="text-xs font-bold text-warm-500 uppercase tracking-wider mb-1">Comparativa de Precios</h3>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{product.modelName}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {product.brand} - {product.categoryName}
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-white border border-bone-200 hover:bg-bone-100 rounded-full transition text-gray-400 hover:text-warm-600">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-white">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-bone-200 border-t-warm-500"></div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12 text-gray-400 bg-bone-50 rounded-2xl border border-bone-100 border-dashed">
              <AlertCircle size={40} className="mx-auto mb-3 text-bone-200" />
              <p>No hay ofertas disponibles por el momento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {listings.map((listing, index) => (
                <div
                  key={listing.listingId}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    index === 0 ? "bg-warm-50/50 border-warm-200 shadow-sm" : "bg-white border-bone-100 hover:border-bone-200"
                  }`}
                >
                  {/* Tienda info con Blindaje de Logo */}
                  <div className="flex items-center gap-4">
                    {listing.storeLogoUrl ? (
                      <div className="w-14 h-14 bg-white border border-bone-100 rounded-xl p-2 flex items-center justify-center shadow-sm relative overflow-hidden">
                        <img
                          src={listing.storeLogoUrl}
                          alt={listing.storeName}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement?.classList.add("bg-bone-100");
                            e.currentTarget.parentElement!.innerHTML = `<span class="font-bold text-xs text-gray-500 uppercase">${listing.storeName.substring(0, 2)}</span>`;
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-bone-100 rounded-xl flex items-center justify-center font-bold text-xs text-gray-500 uppercase">
                        {listing.storeName.substring(0, 2)}
                      </div>
                    )}

                    {/* Resto del código de nombre y stock... */}
                    <div>
                      <p className="font-bold text-gray-800">{listing.storeName}</p>
                      {/* ... */}
                    </div>
                  </div>

                  {/* Precio y Acción */}
                  <div className="text-right">
                    <p className={`text-xl md:text-2xl font-bold ${index === 0 ? "text-warm-600" : "text-gray-900"}`}>${listing.price}</p>
                    <a
                      href={listing.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
                        listing.inStock ? "bg-gray-900 hover:bg-warm-600 text-white shadow-lg shadow-gray-900/10" : "bg-bone-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {listing.inStock ? (
                        <>
                          Comprar <ShoppingCart size={16} />
                        </>
                      ) : (
                        "Sin Stock"
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-bone-50 border-t border-bone-100 text-center text-xs text-gray-400">
          Última actualización: {listings[0]?.lastUpdate ? new Date(listings[0].lastUpdate).toLocaleString() : "Pendiente"}
        </div>
      </div>
    </div>
  );
}
