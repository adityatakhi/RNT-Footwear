import { InfoPage } from '@/components/layout/InfoPage';

export default function TermsOfServicePage() {
  return (
    <InfoPage
      title="Terms of Service"
      description="These terms govern your use of the RNT FOOTWEAR website and services. By shopping with us, you agree to the conditions listed below."
      sections={[
        {
          heading: 'Orders and payments',
          items: [
            'Prices are shown in Indian Rupees and may be updated without notice.',
            'We reserve the right to refuse or cancel an order if the product is unavailable or the payment is invalid.',
            'Orders are subject to stock availability and verification checks.',
          ],
        },
        {
          heading: 'Product accuracy',
          items: [
            'We strive to present products accurately, but color, fit, and appearance may vary slightly by device or lighting.',
            'Descriptions are general and may not capture exact specifications for every batch or model.',
          ],
        },
        {
          heading: 'Website use',
          items: [
            'Customers must use the website for lawful purposes only.',
            'Unauthorized scraping, misuse, or abusive activity may result in account restrictions.',
          ],
        },
      ]}
    />
  );
}
