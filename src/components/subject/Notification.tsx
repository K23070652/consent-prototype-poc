import { Avatar } from '../shared/Avatar';
import { Button } from '../shared/Button';

interface NotificationProps {
  posterName: string;
  onReviewPost: () => void;
}

export function Notification({ posterName, onReviewPost }: NotificationProps) {
  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center p-6 space-y-6">
      <Avatar name={posterName} size="lg" />

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          {posterName} wants to include you in a post
        </h2>
        <p className="text-sm text-gray-600">They're waiting for your response</p>
      </div>

      <Button onClick={onReviewPost} size="lg" className="w-full">
        Review Post
      </Button>
    </div>
  );
}
