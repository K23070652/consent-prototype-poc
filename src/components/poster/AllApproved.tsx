import { Button } from '../shared/Button';

interface AllApprovedProps {
  onStartNewPost: () => void;
}

export function AllApproved({ onStartNewPost }: AllApprovedProps) {
  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center p-6">
      <div className="text-center space-y-4">
        {/* Checkmark */}
        <div className="text-6xl mb-4">✓</div>

        <h1 className="text-2xl font-bold text-gray-900">Post published!</h1>
        <p className="text-lg font-semibold text-approved">All tagged users approved.</p>

        <div className="bg-green-50 border border-approved rounded-lg p-4 my-6">
          <p className="text-sm text-gray-700">
            Your post is now live and visible to all users.
          </p>
        </div>

        <Button onClick={onStartNewPost} size="lg" className="w-full">
          Start a new post
        </Button>
      </div>
    </div>
  );
}
