import { InfoPage } from '@/components/layout/InfoPage';

export default function TrackOrderPage() {
  return (
    <InfoPage
      title="Track Your Order"
      description="You can monitor your package through your order confirmation email or by checking your account details after placing the order."
      sections={[
        {
          heading: 'How to track',
          items: [
            'Once shipped, your confirmation email includes the courier tracking number.',
            'Open the order details in your account to view shipping status.',
            'If a package is delayed, contact support with the order number for updates.',
          ],
        },
        {
          heading: 'Typical status updates',
          items: [
            'Packed: your order is ready at the warehouse.',
            'In transit: the parcel is moving with the courier partner.',
            'Delivered: the order has reached the shipping address.',
          ],
        },
        {
          heading: 'Need help?',
          items: [
            'Send us your order number and email address via the contact page for faster support.',
            'Our team usually responds within 24 to 48 business hours.',
          ],
        },
      ]}
    />
  );
}
