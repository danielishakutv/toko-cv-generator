import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useAuthStore } from '@/stores/auth';
import { getProfileCompleteness } from '@/lib/profile';

export function ProfileAlert() {
  const { user } = useAuthStore();
  const completeness = getProfileCompleteness(user);

  if (completeness.percentage >= 100) {
    return null;
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-amber-900 mb-1">
            Complete your profile to get the most out of CV Builder
          </h3>
          <p className="text-sm text-amber-800 mb-3">
            Missing: {completeness.missing.join(', ')}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Progress value={completeness.percentage} className="flex-1" />
              <span className="text-sm font-medium text-amber-900 whitespace-nowrap">
                {completeness.percentage}%
              </span>
            </div>
            <Button asChild size="sm" variant="outline" className="border-amber-300 hover:bg-amber-100">
              <Link to="/profile">Complete now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
