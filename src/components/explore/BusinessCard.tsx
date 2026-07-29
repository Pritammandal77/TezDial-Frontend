import { Business } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function BusinessCard({ business }: { business: Business }) {
  const image =
    business.imageBusiness1 ||
    business.imageBusiness2 ||
    `https://picsum.photos/seed/${business._id}/500/350`;

  const router = useRouter();
  const handleRedirectToDetialsPage = (id: string) => {
    router.push(`/business/${id}`);
  };

  return (
    <div
      className="bg-paper rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
      onClick={() => handleRedirectToDetialsPage(business._id)}
    >
      <div className="relative h-40 sm:h-48">
        <img
          src={image}
          alt={business.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 font-mono text-[11px] bg-tez-forest text-paper px-2.5 py-1 rounded-full">
          Verified
        </span>
        <span className="absolute top-3 right-3 font-mono text-[11px] bg-ink/80 text-tez-gold px-2.5 py-1 rounded-full">
          ★ {business.rating.toFixed(1)}
        </span>
      </div>

      <div className="p-5">
        <span className="font-mono text-[11px] uppercase tracking-wide text-tez-orange">
          {business.category}
        </span>
        <h3 className="mt-1 font-display font-bold text-lg text-ink leading-snug">
          {business.title}
        </h3>
        <p className="mt-1.5 text-sm text-ink/60 line-clamp-2">
          {business.description}
        </p>

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-ink/10">
          <span className="font-mono text-xs text-ink/50">{business.city}</span>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${business.phone}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink text-paper hover:bg-tez-orange transition-colors"
            >
              Call
            </a>
            {business.whatsapp && (
              <a
                href={`https://wa.me/91${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-mist text-ink hover:bg-tez-gold transition-colors"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
