import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
}

export function AdBanner({ dataAdSlot, dataAdFormat = "auto", dataFullWidthResponsive = true }: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error cargando el anuncio de AdSense:", e);
      
    }
  }, []);

  return (
    <div className="w-full text-center my-6 overflow-hidden flex justify-center items-center bg-bone-50/50 rounded-xl min-h-[100px]">
      <ins
        className="adsbygoogle block w-full"
        data-ad-client="ca-pub-xxxxxxxxxxID_DE_CLIENTE_AQUIxxxxxxxx"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
