import { CvData } from '@/stores/cv';

export const DEMO_DOCUMENTS: CvData[] = [
  {
    id: 'demo-1',
    templateId: 'modern',
    title: 'Software Engineer Resume',
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    personal: {
      fullName: 'Alex Johnson',
      role: 'Senior Software Engineer',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'alexjohnson.dev',
      socials: [
        { label: 'LinkedIn', url: 'linkedin.com/in/alexjohnson' },
        { label: 'GitHub', url: 'github.com/alexjohnson' },
      ],
    },
    summary: 'Passionate software engineer with 8+ years of experience building scalable web applications. Expertise in React, TypeScript, and cloud infrastructure. Strong focus on code quality, performance optimization, and mentoring junior developers.',
    experience: [
      {
        company: 'TechCorp Inc.',
        role: 'Senior Software Engineer',
        start: '2021-03',
        current: true,
        bullets: [
          'Led development of microservices architecture serving 2M+ daily active users',
          'Improved application performance by 40% through code optimization and caching strategies',
          'Mentored team of 5 junior engineers, establishing code review practices and documentation standards',
          'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
        ],
      },
      {
        company: 'StartupXYZ',
        role: 'Full Stack Developer',
        start: '2018-06',
        end: '2021-02',
        bullets: [
          'Built responsive web applications using React, Node.js, and PostgreSQL',
          'Collaborated with design team to implement pixel-perfect UI components',
          'Reduced API response time by 60% through database query optimization',
          'Participated in agile development process with bi-weekly sprint cycles',
        ],
      },
      {
        company: 'WebDev Solutions',
        role: 'Junior Developer',
        start: '2016-01',
        end: '2018-05',
        bullets: [
          'Developed and maintained client websites using modern JavaScript frameworks',
          'Fixed bugs and implemented new features based on client feedback',
          'Wrote comprehensive unit tests achieving 85% code coverage',
        ],
      },
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        start: '2012-09',
        end: '2016-05',
        details: 'GPA: 3.8/4.0, Dean\'s List, CS Club President',
      },
    ],
    skills: [
      { name: 'JavaScript/TypeScript', level: 'Advanced' },
      { name: 'React & Next.js', level: 'Advanced' },
      { name: 'Node.js & Express', level: 'Advanced' },
      { name: 'PostgreSQL & MongoDB', level: 'Intermediate' },
      { name: 'AWS & Docker', level: 'Intermediate' },
      { name: 'GraphQL & REST APIs', level: 'Advanced' },
      { name: 'Git & CI/CD', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Conversational' },
    ],
  },
  {
    id: 'demo-2',
    templateId: 'elegant',
    title: 'Product Manager CV',
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    personal: {
      fullName: 'Sarah Chen',
      role: 'Senior Product Manager',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      website: 'sarahchen.com',
    },
    summary: 'Results-driven product manager with 6+ years of experience leading cross-functional teams to deliver innovative digital products. Proven track record of increasing user engagement by 150% and driving $5M+ in annual revenue growth.',
    experience: [
      {
        company: 'Digital Innovations Co.',
        role: 'Senior Product Manager',
        start: '2020-08',
        current: true,
        bullets: [
          'Led product strategy for mobile app with 500K+ monthly active users',
          'Increased user retention by 45% through data-driven feature prioritization',
          'Managed $2M product budget and coordinated team of 12 engineers and designers',
          'Conducted user research and A/B testing to validate product hypotheses',
        ],
      },
      {
        company: 'Startup Ventures',
        role: 'Product Manager',
        start: '2018-01',
        end: '2020-07',
        bullets: [
          'Launched 3 new product features that generated $3M in additional revenue',
          'Created product roadmap aligned with company OKRs and market opportunities',
          'Collaborated with stakeholders to define requirements and success metrics',
        ],
      },
    ],
    education: [
      {
        school: 'Columbia University',
        degree: 'MBA, Technology Management',
        start: '2016-09',
        end: '2018-05',
      },
      {
        school: 'Cornell University',
        degree: 'BS in Business Administration',
        start: '2012-09',
        end: '2016-05',
      },
    ],
    skills: [
      { name: 'Product Strategy', level: 'Advanced' },
      { name: 'User Research', level: 'Advanced' },
      { name: 'Data Analysis', level: 'Intermediate' },
      { name: 'Agile/Scrum', level: 'Advanced' },
      { name: 'Roadmap Planning', level: 'Advanced' },
      { name: 'SQL', level: 'Intermediate' },
    ],
    certifications: [
      {
        name: 'Certified Scrum Product Owner (CSPO)',
        issuer: 'Scrum Alliance',
        year: '2019',
      },
      {
        name: 'Product Management Certificate',
        issuer: 'General Assembly',
        year: '2018',
      },
    ],
    interests: ['Tech Blogging', 'Mentoring', 'Hiking', 'Photography'],
  },
];
