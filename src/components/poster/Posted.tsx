import { Button } from '../shared/Button';

interface PostedProps {
  onStartNewPost: () => void;
}

export function Posted({ onStartNewPost }: PostedProps) {
  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center p-6 space-y-6">
      <div className="text-center space-y-4">
        {/* Checkmark */}
        <div className="text-6xl mb-4">✓</div>

        <h1 className="text-2xl font-bold text-gray-900">Posted!</h1>
        <p className="text-lg font-semibold text-approved">Your photo is now live.</p>

        <div className="bg-green-50 border border-approved rounded-lg p-4 my-6">
          <p className="text-sm text-gray-700">
            All tagged users have been notified that their photo was posted.
          </p>
        </div>

        <Button onClick={onStartNewPost} size="lg" className="w-full">
          Post something new
        </Button>
      </div>
    </div>
  );
}
