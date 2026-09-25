import { InfoPage } from '@/components/layout/InfoPage';

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      description="Your privacy matters to us. We use your personal information only to deliver a better shopping experience and provide support services."
      sections={[
        {
          heading: 'Information we collect',
          items: [
            'Basic contact and account details such as name, email, phone number, and shipping information.',
            'Order history, preferences, and support conversations for better service.',
            'Device and browser data used to improve site experience and security.',
          ],
        },
        {
          heading: 'How we use it',
          items: [
            'To process and fulfill orders accurately and securely.',
            'To respond to support requests and keep you informed about your purchase.',
            'To improve our products, website experience, and service quality.',
          ],
        },
        {
          heading: 'Your choices',
          items: [
            'You can update personal information from your account settings at any time.',
            'You may contact us to request data updates or support-related information.',
          ],
        },
      ]}
    />
  );
}
