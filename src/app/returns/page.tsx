import { InfoPage } from '@/components/layout/InfoPage';

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Returns & Refunds"
      description="We want you to love your purchase. If your order is not as expected, we offer a simple returns and refund process for eligible items."
      sections={[
        {
          heading: 'Return eligibility',
          items: [
            'Items must be unused, unworn, and returned in original packaging.',
            'Returns must be requested within 7 days of delivery.',
            'Footwear with signs of wear or personal use may not qualify for a refund.',
          ],
        },
        {
          heading: 'Refund process',
          items: [
            'Refunds are issued to the original payment method once the return is approved.',
            'Approved refunds are processed within 5 to 7 business days.',
            'Store credit may be offered when the return is not eligible for a cash refund.',
          ],
        },
        {
          heading: 'Exchange support',
          items: [
            'Size exchanges are available for eligible products based on stock availability.',
            'Contact support with your order number and the product you would like to exchange.',
          ],
        },
      ]}
    />
  );
}
