import { InfoPage } from '@/components/layout/InfoPage';

export default function ShippingPage() {
  return (
    <InfoPage
      title="Shipping Policy"
      description="We ship your order with fast, tracked delivery using reliable courier partners across India and select international destinations."
      sections={[
        {
          heading: 'Delivery timelines',
          items: [
            'Metro cities: 3 to 5 business days.',
            'Tier 2 and Tier 3 cities: 5 to 8 business days.',
            'Pre-order or custom-made products may require additional time.',
          ],
        },
        {
          heading: 'Shipping charges',
          items: [
            'Standard shipping is free for orders above ₹2,499.',
            'Orders below that amount carry a nominal shipping fee.',
            'Express delivery may be available at an additional charge.',
          ],
        },
        {
          heading: 'Tracking',
          items: [
            'You will receive a tracking number once the package is dispatched.',
            'You can also track the order from the Track Order page after login.',
          ],
        },
      ]}
    />
  );
}
