"use client";

import { fetchBusinessById } from "@/services/business.api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageGallery from "@/components/explore/ImageGallery";

interface BusinessDetail {
  _id: string;
  title: string;
  category: string;
  city: string;
  phone: string;
  whatsapp?: string;
  description: string;
  address: string;
  imageBusiness1?: string;
  imageBusiness2?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

function BusinessDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [businessData, setBusinessData] = useState<BusinessDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async (id: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchBusinessById(id);
      console.log(res);
      setBusinessData(res.business);
    } catch (err) {
      console.error("Failed to fetch business", err);
      setError("Could not load this listing. It may have been removed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  if (loading) return <LoadingState />;
  if (error || !businessData)
    return (
      <ErrorState
        message={error || "Listing not found."}
        onBack={() => router.push("/business/all")}
      />
    );

  const listedDate = new Date(businessData.createdAt).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const mapsQuery = encodeURIComponent(
    `${businessData.address}, ${businessData.city}`,
  );

  return (
    <main className="min-h-screen bg-paper pb-28 lg:pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-mono text-ink/50 hover:text-tez-orange transition-colors mb-6"
        >
          <BackIcon />
          Back to Explore
        </button>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
          {/* Left: gallery + details */}
          <div>
            <ImageGallery
              images={[
                businessData.imageBusiness1,
                businessData.imageBusiness2,
              ]}
              alt={businessData.title}
            />

            <div className="mt-10">
              <h2 className="font-display font-bold text-xl text-ink">About</h2>
              <p className="mt-3 text-ink/70 leading-relaxed text-sm">
                {businessData.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-display font-bold text-xl text-ink">
                Address
              </h2>
              <p className="mt-3 text-ink/70 text-sm">
                {businessData.address}, {businessData.city}
              </p>

              {/* Embedded Google Map Frame */}
              <div className="mt-4 w-full h-64 rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
                <iframe
                  title="Business Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

              {/* External Directions Link */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-tez-orange hover:underline underline-offset-4"
              >
                Get Directions
                <ArrowIcon />
              </a>
            </div>
          </div>

          {/* Right: sticky info card */}
          <div className="lg:sticky lg:top-8 h-fit bg-mist/40 rounded-2xl p-6">
            <span className="font-mono text-xs uppercase tracking-wide text-tez-orange">
              {businessData.category}
            </span>
            <h1 className="mt-1 font-display font-extrabold text-2xl lg:text-3xl text-ink leading-tight">
              {businessData.title}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-sm bg-tez-gold/20 text-tez-orange-dim px-2.5 py-1 rounded-full">
                ★ {businessData.rating.toFixed(1)}
              </span>
              <span className="font-mono text-xs bg-tez-forest/10 text-tez-forest px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-sm text-ink/50">
              <PinIcon />
              {businessData.city}
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={`tel:${businessData.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-ink text-paper font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-tez-orange transition-colors"
              >
                <PhoneIcon />
                Call {businessData.phone}
              </a>
              {businessData.whatsapp && (
                <a
                  href={`https://wa.me/91${businessData.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-paper text-ink font-semibold text-sm px-6 py-3.5 rounded-full hover:bg-tez-gold transition-colors border border-ink/10"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-ink/10 font-mono text-xs text-ink/40">
              Listed on TezDial · {listedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-paper border-t border-ink/10 px-4 py-3 flex gap-2 z-40">
        <a
          href={`tel:${businessData.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-paper font-semibold text-sm py-3 rounded-full"
        >
          <PhoneIcon />
          Call
        </a>
        {businessData.whatsapp && (
          <a
            href={`https://wa.me/91${businessData.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-tez-forest text-paper font-semibold text-sm py-3 rounded-full"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        )}
      </div>
    </main>
  );
}

export default BusinessDetailPage;

function LoadingState() {
  return (
    <main className="min-h-screen bg-paper px-6 lg:px-12 py-12">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <div className="aspect-[4/3] rounded-2xl bg-mist/50 animate-pulse" />
        <div className="h-72 rounded-2xl bg-mist/50 animate-pulse" />
      </div>
    </main>
  );
}

function ErrorState({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display font-bold text-xl text-ink">{message}</p>
        <button
          onClick={onBack}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-tez-orange hover:underline underline-offset-4"
        >
          ← Back to Explore
        </button>
      </div>
    </main>
  );
}

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08.99-2.36.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.41-.06.64.49.24.57.81 1.97.88 2.11.07.14.11.31.02.5-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.23 1.38.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.13.45.19.51.3.07.11.07.62-.17 1.3Z" />
    </svg>
  );
}
