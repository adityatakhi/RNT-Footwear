import { InfoPage } from '@/components/layout/InfoPage';

export default function CookiePolicyPage() {
  return (
    <InfoPage
      title="Cookie Policy"
      description="We use cookies and similar tools to improve website performance, remember user preferences, and help with analytics and basic shopping functionality."
      sections={[
        {
          heading: 'What cookies do',
          items: [
            'Keep your cart and wishlist states active during browsing.',
            'Remember language, layout, and previously selected preferences.',
            'Help us understand how visitors use our site so we can improve the experience.',
          ],
        },
        {
          heading: 'Managing cookies',
          items: [
            'You can accept or reject cookies through your browser settings.',
            'Disabling cookies may reduce some storefront features, including saved cart or wishlist data.',
          ],
        },
        {
          heading: 'Essential cookies',
          items: [
            'Some cookies are required to provide the core functions of the shopping experience and maintain security.',
            'These cannot be turned off without affecting the site’s basic operations.',
          ],
        },
      ]}
    />
  );
}
