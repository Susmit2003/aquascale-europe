import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Commercial Water Hardness Solutions & Data API | Water Hardness Scale',
    description: 'Enterprise water quality data and limescale prevention solutions for European installers, hotels, restaurants, and industrial applications.',
  };
}

export default async function GlobalCommercialPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Commercial Solutions', href: `/${lang}/commercial` }
  ];

  // B2B Service Offerings Data
  const services = [
    {
      id: 'installers',
      title: 'For Plumbers & Installers',
      icon: '🔧',
      description: 'Arm your sales team with exact municipal water hardness data to demonstrate the immediate ROI of water softener installations to homeowners.',
      features: ['Localized ROI Reports', 'PDF Lead Capture Integration', 'Appliance Damage Predictors'],
      href: `/${lang}/contact?interest=installers`
    },
    {
      id: 'hospitality',
      title: 'Hotels & Hospitality',
      icon: '🏨',
      description: 'Protect your commercial boilers and laundry infrastructure from catastrophic limescale failure while improving guest skin and hair care experiences.',
      features: ['Commercial Boiler Protection', 'Laundry Detergent Optimization', 'Premium Guest Experience'],
      href: `/${lang}/contact?interest=hospitality`
    },
    {
      id: 'food-beverage',
      title: 'Cafés & Restaurants',
      icon: '☕',
      description: 'Water makes up 98% of your coffee. Calibrate your espresso machines and filtration systems to the exact local mineral profile for the perfect extraction.',
      features: ['Espresso Machine Calibration', 'Taste Profile Management', 'Glassware Spot Prevention'],
      href: `/${lang}/contact?interest=food-beverage`
    },
    {
      id: 'data-licensing',
      title: 'Enterprise Data API',
      icon: '📊',
      description: 'Integrate our database of over 50,000 European municipal water hardness measurements directly into your CRM, app, or programmatic SEO platform.',
      features: ['RESTful API Access', 'Bi-annual Data Updates', 'JSON & CSV Exports'],
      href: `/${lang}/contact?interest=data-api`
    }
  ];

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <header className="mb-16 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Enterprise Water Intelligence
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Water Hardness Scale provides actionable water quality data and limescale mitigation strategies 
          for businesses across the continent. Protect your assets, optimize your services, and integrate our data.
        </p>
      </header>

      {/* Solutions Grid */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold text-blue-900 mb-3">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700 font-medium">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href={service.href}
                className="mt-auto block w-full text-center bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors border border-blue-100 hover:border-transparent"
              >
                Inquire about {service.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / Authority Footer Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
          Whether you need a bespoke programmatic calculator for your regional e-commerce store or raw data for environmental research, our engineering team can help.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href={`/${lang}/contact`}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Contact Sales
          </Link>
          <Link 
            href={`/${lang}/methodology`}
            className="bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Read Our Methodology
          </Link>
        </div>
      </section>
    </main>
  );
}