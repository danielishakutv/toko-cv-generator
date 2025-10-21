import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSettingsStore } from '@/stores/settings';
import { formatPrice } from '@/lib/format';
import {
  FileText,
  Eye,
  Download,
  Share2,
  Layout,
  Zap,
  CheckCircle2,
  Star,
  ChevronDown,
} from 'lucide-react';

export function Landing() {
  const { currency } = useSettingsStore();

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      features: [
        { text: 'Create unlimited CVs', included: true },
        { text: 'Access to 3 templates', included: true },
        { text: 'Download as PDF', included: true },
        { text: 'Save & share CVs', included: false },
      ],
      cta: 'Get Started',
      ctaVariant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Pro',
      price: 14400, // NGN 14,400 (USD 9)
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'Access to all 9+ templates', included: true },
        { text: 'Save & share CVs', included: true },
        { text: 'Version history', included: true },
        { text: 'Priority support', included: true },
      ],
      cta: 'Start Free Trial',
      ctaVariant: 'default' as const,
      popular: true,
    },
    {
      name: 'Team',
      price: 46400, // NGN 46,400 (USD 29)
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Up to 10 team members', included: true },
        { text: 'Shared templates', included: true },
        { text: 'Team analytics', included: true },
        { text: 'Dedicated support', included: true },
      ],
      cta: 'Contact Sales',
      ctaVariant: 'outline' as const,
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6" variant="secondary">
              ✨ Professional Resume Builder
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Create a Job-Ready CV in{' '}
              <span className="text-primary">Minutes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose from beautiful templates, fill in your details, and download a professional CV.
              No design skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link to="/templates">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Here
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <a href="#features">
                  Learn More
                  <ChevronDown className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our CV generator comes with powerful features to help you stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See your changes in real-time as you type. What you see is what you get.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Layout className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Professional Templates</CardTitle>
                <CardDescription>
                  Choose from 9+ ATS-friendly templates designed by professionals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-10 w-10 text-primary mb-4" />
                <CardTitle>One-Click Export</CardTitle>
                <CardDescription>
                  Download your CV as a high-quality PDF ready to send to employers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Share2 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Shareable Links</CardTitle>
                <CardDescription>
                  Share your CV online with a unique link. Perfect for portfolios.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Version History</CardTitle>
                <CardDescription>
                  Save multiple versions and switch between them anytime.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Quick & Easy</CardTitle>
                <CardDescription>
                  Get your CV done in under 10 minutes. Focus on content, not formatting.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={plan.popular ? 'border-primary shadow-lg relative' : ''}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? 'Free' : formatPrice(plan.price, currency)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-start gap-2 ${!feature.included ? 'text-muted-foreground' : ''}`}
                      >
                        {feature.included ? (
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        ) : (
                          <span className="text-xl">×</span>
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.ctaVariant} asChild>
                    <Link to="/templates">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Job Seekers</h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Software Engineer',
                content: 'Landed my dream job at a tech startup! The modern template was perfect.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Marketing Manager',
                content: 'So easy to use. Created my CV in 10 minutes and got 3 interview calls.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                role: 'Product Designer',
                content: 'The live preview feature saved me so much time. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Do I need to create an account?',
                a: 'No! You can create and download CVs without an account. However, creating a free account lets you save your CVs and share them online.',
              },
              {
                q: 'Are the templates ATS-friendly?',
                a: 'Yes! All our templates are designed to be parsed correctly by Applicant Tracking Systems (ATS) used by most companies.',
              },
              {
                q: 'Can I edit my CV after downloading?',
                a: 'If you create an account, you can save your CV and edit it anytime. You can also download updated versions.',
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We never share your personal information with third parties. Your data is stored securely and you can delete it anytime.',
              },
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                  <CardDescription className="text-base pt-2">{faq.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Professional CV?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who landed their dream jobs
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg">
            <Link to="/templates">
              <Zap className="mr-2 h-5 w-5" />
              Get Started For Free
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
