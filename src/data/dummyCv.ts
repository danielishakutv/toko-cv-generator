import { CvData, Template } from '@/stores/cv';
import { generateId } from '@/lib/format';

/**
 * Build dummy CV data for template previews
 * Default name: Daniel Ishaku
 */
export function buildDummyCvForTemplate(template: Template): CvData {
  const sections = new Set(template.sections);

  const dummyData: CvData = {
    id: generateId(),
    templateId: template.id,
    title: `${template.name} Preview`,
    lastModified: new Date().toISOString(),
    personal: {
      fullName: 'Daniel Ishaku',
      role: 'Product Manager',
      email: 'daniel@example.com',
      phone: '+234 800 000 0000',
      location: 'Yola, Nigeria',
      website: 'danielishaku.com',
      socials: [
        { label: 'LinkedIn', url: 'linkedin.com/in/danielishaku' },
        { label: 'GitHub', url: 'github.com/danielishaku' },
      ],
      // Use placeholder photo for photo-capable templates
      photoUrl: template.supportsPhoto ? 'https://via.placeholder.com/200x200/4A5568/FFFFFF?text=DI' : undefined,
    },
  };

  // Add sections based on template requirements
  if (sections.has('summary')) {
    dummyData.summary =
      'Results-driven Product Manager with 5+ years of experience building and scaling digital products. Proven track record of delivering user-centric solutions that drive business growth and enhance customer satisfaction.';
  }

  if (sections.has('experience')) {
    dummyData.experience = [
      {
        company: 'Tech Solutions Inc.',
        role: 'Senior Product Manager',
        start: '2021-01',
        current: true,
        bullets: [
          'Led product strategy for flagship SaaS platform serving 50K+ users',
          'Increased user engagement by 35% through data-driven feature development',
          'Managed cross-functional team of 12 engineers and designers',
        ],
      },
      {
        company: 'Digital Innovations Ltd.',
        role: 'Product Manager',
        start: '2019-06',
        end: '2020-12',
        bullets: [
          'Launched 3 major features that generated $2M in additional revenue',
          'Reduced customer churn by 25% through improved onboarding',
        ],
      },
    ];
  }

  if (sections.has('education')) {
    dummyData.education = [
      {
        school: 'University of Lagos',
        degree: 'BSc Computer Science',
        start: '2014-09',
        end: '2018-06',
        details: 'First Class Honours · GPA: 4.8/5.0',
      },
    ];
  }

  if (sections.has('skills')) {
    dummyData.skills = [
      { name: 'Product Strategy', level: 'Advanced' },
      { name: 'User Research', level: 'Advanced' },
      { name: 'Data Analysis', level: 'Advanced' },
      { name: 'Agile/Scrum', level: 'Advanced' },
      { name: 'SQL', level: 'Intermediate' },
      { name: 'Figma', level: 'Intermediate' },
      { name: 'Roadmapping', level: 'Advanced' },
      { name: 'Stakeholder Management', level: 'Advanced' },
    ];
  }

  if (sections.has('projects')) {
    dummyData.projects = [
      {
        name: 'Mobile App Launch',
        link: 'app.techsolutions.com',
        description:
          'Led the development and launch of iOS/Android app with 10K+ downloads in first month',
        bullets: [
          'Conducted user research with 50+ participants',
          'Achieved 4.5★ rating on both app stores',
        ],
      },
      {
        name: 'Payment Integration',
        description:
          'Integrated multiple payment gateways, increasing conversion rate by 40%',
      },
    ];
  }

  if (sections.has('certifications')) {
    dummyData.certifications = [
      { name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', year: '2022' },
      { name: 'Google Analytics Certification', issuer: 'Google', year: '2021' },
    ];
  }

  if (sections.has('achievements')) {
    dummyData.achievements = [
      {
        id: generateId(),
        title: 'Winner of Tech Innovation Award 2023',
        detail: 'Recognized for outstanding product leadership and innovation',
        year: '2023',
      },
      {
        id: generateId(),
        title: 'Featured speaker at ProductCon Africa',
        year: '2022',
      },
      {
        id: generateId(),
        title: 'Mentored 5 junior product managers to successful promotions',
      },
    ];
  }

  if (sections.has('languages')) {
    dummyData.languages = [
      { name: 'English', level: 'Native' },
      { name: 'Hausa', level: 'Fluent' },
      { name: 'French', level: 'Intermediate' },
    ];
  }

  if (sections.has('interests')) {
    dummyData.interests = [
      'Technology & Innovation',
      'Open Source Contribution',
      'Public Speaking',
      'Photography',
    ];
  }

  if (sections.has('custom')) {
    dummyData.customSections = [
      {
        id: generateId(),
        title: 'Publications',
        items: [
          {
            id: generateId(),
            heading: 'The Future of Product Management in Africa',
            sub: 'Tech Magazine · 2023',
            body: 'Exploring emerging trends and opportunities in the African tech ecosystem',
          },
        ],
      },
    ];
  }

  return dummyData;
}
