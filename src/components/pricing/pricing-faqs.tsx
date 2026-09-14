import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

const questions = [
  'free',
  'value',
  'cancel',
  'yearly',
  'lifetime',
  'privacy',
  'export',
] as const;

export function PricingFaqs() {
  const t = useTranslations('PricingPage.faqs');

  return (
    <section
      className="mx-auto w-full max-w-3xl pb-16"
      aria-labelledby="pricing-faq-title"
    >
      <h2
        id="pricing-faq-title"
        className="mb-6 text-center text-2xl font-semibold"
      >
        {t('title')}
      </h2>
      <Accordion type="single" collapsible>
        {questions.map((id) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="text-left text-base">
              {t(`${id}.question`)}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-muted-foreground">
              {t(`${id}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
