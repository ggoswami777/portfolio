"use client";

import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const DiscordIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

export const Contact = () => {
  const { t } = useLanguage();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="contact" className="py-20 md:py-24 px-4 w-full relative overflow-hidden min-h-[60vh] flex items-center">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10 w-full">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-text-primary)]"
        >
          {t("Connect")}
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-3 mb-12 px-6"
        >
          <p className="text-sm md:text-xl opacity-60 text-[var(--color-text-primary)] max-w-lg mx-auto">
            {t("ConnectTitle")}
          </p>
          <p className="text-base md:text-xl font-medium text-[var(--color-text-primary)]">
            {t("ConnectSubTitle")}
          </p>
        </motion.div>

        {/* Responsive Button Container */}
        {/* Mobile: scrollable flex-row | Desktop: centered grid/flex */}
        <div className="w-full overflow-x-auto no-scrollbar pb-4">
          <div className="flex flex-row items-center justify-start md:justify-center gap-4 px-4 min-w-max md:min-w-0 md:w-full max-w-md mx-auto">
            <ContactButton
              icon={<DiscordIcon size={20} />}
              label={t("BookCall")}
              calLink="gaurav-goswami-lkdvwc/15min"
            />

            <ContactButton
              icon={<FileText size={18} />}
              label={t("Resume")}
              onClick={() => window.open("/resume.pdf", "_blank")}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="w-10 h-[1px] bg-[var(--color-text-primary)] opacity-20" />
          <p className="text-[10px] md:text-[11px] uppercase italic opacity-40 text-[var(--color-text-primary)] tracking-[0.3em]">
            "Every vision deserves to be built into reality."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ContactButton = ({ icon, label, calLink, onClick }: any) => (
  <div className="animated-border-container w-[160px] md:flex-1 md:min-w-[180px]">
    <button
      data-cal-namespace="15min"
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      onClick={onClick}
      className="inner-content group relative w-full py-4 px-6 flex items-center justify-center gap-3 transition-all duration-500 hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
    >
      <span className="text-[var(--color-text-primary)] group-hover:text-black transition-colors duration-300">
        {icon}
      </span>
      <span className="text-[var(--color-text-primary)] group-hover:text-black font-bold text-xs md:text-sm whitespace-nowrap transition-colors duration-300 uppercase tracking-wide">
        {label}
      </span>
    </button>
  </div>
);