"use client";
import { Gauge, Headset, LayoutGrid, Palette, Sparkles, Zap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/animations";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { bi } from "@/lib/i18n/types";

const features = [
  { Icon: Sparkles, title: bi("Visual Tajam", "Sharp Visuals"), text: bi("Pixel pitch kecil menghasilkan gambar yang detail.", "A small pixel pitch delivers detailed images.") },
  { Icon: Gauge, title: bi("High Refresh Rate"), text: bi("Tampilan lebih smooth untuk video dan kamera.", "Smoother playback for video and cameras.") },
  { Icon: Palette, title: bi("Warna Lebih Hidup", "Vivid Colours"), text: bi("Teknologi LED menghasilkan warna yang lebih vibrant.", "LED technology produces more vibrant colours.") },
  { Icon: Zap, title: bi("Hemat Energi", "Energy Efficient"), text: bi("Dirancang untuk penggunaan indoor yang efisien.", "Designed for efficient indoor use.") },
  { Icon: LayoutGrid, title: bi("Modular"), text: bi("Panel mudah dirawat dan dikembangkan.", "Panels are easy to maintain and expand.") },
  { Icon: Headset, title: bi("Dukungan Profesional", "Professional Support"), text: bi("Konsultasi, instalasi, dan support.", "Consultation, installation, and support.") },
];

export function Features() {
  const { tx } = useI18n();
  return (
    <Section id="keunggulan">
      <SectionHeading title={tx(bi("Mengapa Memilih Videotron Indoor Kami?", "Why Choose Our Indoor Videotron?"))} />
      <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {features.map(({ Icon, title, text }, i) => (
          <StaggerItem key={title.id} index={i}>
            <div className="card card-hover group h-full rounded-3xl p-6 sm:p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand/15 text-brand2 transition-transform duration-500 group-hover:rotate-12">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 text-lg font-bold sm:mt-5">{tx(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tx(text)}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
