import { User } from '@/stores/auth';

export interface ProfileCompleteness {
  percentage: number;
  missing: string[];
}

export function getProfileCompleteness(user: User | null): ProfileCompleteness {
  if (!user) {
    return { percentage: 0, missing: ['All fields'] };
  }

  const fields = [
    { name: 'name', value: user.name, label: 'Full name' },
    { name: 'email', value: user.email, label: 'Email' },
    { name: 'avatarUrl', value: user.avatarUrl, label: 'Profile picture' },
    { name: 'location', value: user.location, label: 'Location' },
    { name: 'role', value: user.role, label: 'Role/Title' },
  ];

  const completed = fields.filter(field => field.value && field.value.trim() !== '');
  const missing = fields.filter(field => !field.value || field.value.trim() === '');

  return {
    percentage: Math.round((completed.length / fields.length) * 100),
    missing: missing.map(f => f.label),
  };
}
