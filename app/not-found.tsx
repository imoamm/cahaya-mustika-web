import { Button } from "@/components/ui/Button";
import { T } from "@/components/i18n/T";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <h1 className="text-5xl font-extrabold"><T k="common.notFound" /></h1>
        <p className="mt-4 text-muted"><T k="common.notFoundText" /></p>
        <div className="mt-8"><Button href="/"><T k="cta.back" /></Button></div>
      </div>
    </section>
  );
}
