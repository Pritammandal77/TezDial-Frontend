// import { Business } from "@/lib/config";
// import { useRouter } from "next/navigation";

// export default function BusinessCard({ business }: { business: Business }) {
//   const image =
//     business.imageBusiness1 ||
//     business.imageBusiness2 ||
//     `https://picsum.photos/seed/${business._id}/500/350`;

//   const router = useRouter();
//   const handleRedirectToDetialsPage = (id: string) => {
//     router.push(`/business/${id}`);
//   };

//   return (
//     <div
//       className="bg-paper rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
//       onClick={() => handleRedirectToDetialsPage(business._id)}
//     >
//       <div className="relative h-40 sm:h-48">
//         <img
//           src={image}
//           alt={business.title}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <span className="absolute top-3 left-3 font-mono text-[11px] bg-tez-forest text-paper px-2.5 py-1 rounded-full">
//           Verified
//         </span>
//         <span className="absolute top-3 right-3 font-mono text-[11px] bg-ink/80 text-tez-gold px-2.5 py-1 rounded-full">
//           ★ {business.rating.toFixed(1)}
//         </span>
//       </div>

//       <div className="p-5">
//         <span className="font-mono text-[11px] uppercase tracking-wide text-tez-orange">
//           {business.category}
//         </span>
//         <h3 className="mt-1 font-display font-bold text-lg text-ink leading-snug">
//           {business.title}
//         </h3>
//         <p className="mt-1.5 text-sm text-ink/60 line-clamp-2">
//           {business.description}
//         </p>

//         <div className="mt-4 flex items-center justify-between pt-4 border-t border-ink/10">
//           <span className="font-mono text-xs text-ink/50">{business.city}</span>
//           <div className="flex items-center gap-2">
//             <a
//               href={`tel:${business.phone}`}
//               className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink text-paper hover:bg-tez-orange transition-colors"
//             >
//               Call
//             </a>
//             {business.whatsapp && (
//               <a
//                 href={`https://wa.me/91${business.whatsapp}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xs font-semibold px-3 py-1.5 rounded-full bg-mist text-ink hover:bg-tez-gold transition-colors"
//               >
//                 WhatsApp
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, Business } from "@/lib/config";
import { MoreVertical, Trash2, Phone, MessageCircle, Star } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function BusinessCard({
  business,
  onDeleted,
}: {
  business: Business;
  onDeleted?: (id: string) => void;
}) {
  const image =
    business.imageBusiness1 ||
    business.imageBusiness2 ||
    `https://picsum.photos/seed/${business._id}/500/350`;

  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function handleRedirectToDetailsPage(id: string) {
    router.push(`/business/${id}`);
  }

  function openDeleteModal(e: React.MouseEvent) {
    e.stopPropagation();
    setMenuOpen(false);
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
    setPin("");
    setDeleteError("");
  }

  async function handleAuthenticateAndDelete() {
    if (!pin.trim()) {
      setDeleteError("Enter the security pin.");
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      await axiosInstance.delete(`/api/business/delete`, {
        data: {
          id: business._id,
          pin: pin.trim(),
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      closeDeleteModal();
      toast.success("Business deleted successfully")
      onDeleted?.(business._id);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setDeleteError(
          err.response?.data?.message || "Could not delete listing."
        );
      } else {
        setDeleteError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div
        className="relative bg-paper rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
        onClick={() => handleRedirectToDetailsPage(business._id)}
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

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="font-mono text-[11px] bg-ink/80 text-tez-gold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-tez-gold text-tez-gold" />
              {business.rating?.toFixed(1) ?? "0.0"}
            </span>

            <div ref={menuRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
                aria-label="Listing options"
                className="w-7 h-7 rounded-full bg-ink/80 text-paper flex items-center justify-center hover:bg-ink transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-full right-0 mt-2 w-40 bg-paper rounded-xl shadow-lg overflow-hidden z-20 origin-top-right"
                  >
                    <button
                      onClick={openDeleteModal}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm font-medium text-tez-orange-dim hover:bg-tez-orange/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete listing
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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
            <span className="font-mono text-xs text-ink/50">
              {business.city}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${business.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ink text-paper hover:bg-tez-orange transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3" />
                Call
              </a>
              {business.whatsapp && (
                <a
                  href={`https://wa.me/91${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-mist text-ink hover:bg-tez-gold transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              closeDeleteModal();
            }}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h3 className="font-display font-bold text-lg text-ink">
                Delete "{business.title}"?
              </h3>
              <p className="mt-1.5 text-sm text-ink/60">
                Enter the security pin used when this business was listed. This
                can't be undone.
              </p>

              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (deleteError) setDeleteError("");
                }}
                placeholder="••••"
                autoFocus
                className={`mt-4 w-full bg-mist/40 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none border transition-colors ${
                  deleteError
                    ? "border-tez-orange"
                    : "border-transparent focus:border-ink/20"
                }`}
              />
              {deleteError && (
                <p className="mt-1.5 text-xs text-tez-orange-dim">
                  {deleteError}
                </p>
              )}

              <div className="mt-6 flex gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeDeleteModal}
                  className="flex-1 py-3 rounded-full text-sm font-semibold text-ink bg-mist hover:bg-mist/70 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAuthenticateAndDelete}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-full text-sm font-semibold text-paper bg-buttons hover:bg-tez-orange-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? "Deleting..." : "Authenticate & Delete"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}