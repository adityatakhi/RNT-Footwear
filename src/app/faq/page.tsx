import { InfoPage } from '@/components/layout/InfoPage';

export default function FAQPage() {
  return (
    <InfoPage
      title="Frequently Asked Questions"
      description="Here are the most common questions from our customers about orders, fit, shipping, and product care."
      sections={[
        {
          heading: 'Sizing and fit',
          items: [
            'We recommend selecting your usual size unless you are between sizes.',
            'Most models are designed for a snug, performance fit, while lifestyle pairs are slightly more relaxed.',
            'If unsure, contact support for sizing guidance before checkout.',
          ],
        },
        {
          heading: 'Order updates',
          items: [
            'You will receive email updates as soon as your order is placed, packed, and shipped.',
            'Tracking details appear in the order confirmation email and the Track Order page.',
          ],
        },
        {
          heading: 'Product care',
          items: [
            'Use a soft cloth to wipe the upper and remove dust regularly.',
            'Avoid harsh detergents, direct heat, and prolonged moisture exposure.',
            'Store pairs in a cool, dry place when not in use.',
          ],
        },
      ]}
    />
  );
}
