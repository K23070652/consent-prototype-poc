import { Button } from '../shared/Button';
import { Avatar } from '../shared/Avatar';

interface ReviewPostProps {
  posterName: string;
  caption: string;
  onApprove: () => void;
  onDecline: () => void;
  onRequestChange: () => void;
}

export function ReviewPost({
  posterName,
  caption,
  onApprove,
  onDecline,
  onRequestChange,
}: ReviewPostProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <Avatar name={posterName} size="sm" />
          <span className="font-semibold text-gray-900">{posterName}</span>
        </div>

        {/* Post Preview */}
        <div className="aspect-square bg-gradient-to-br from-consent-purple to-consent-purple-dark flex items-center justify-center">
          <span className="text-white text-center text-sm font-semibold">Photo Preview</span>
        </div>

        {/* Caption */}
        <div className="px-4 py-4 border-b border-gray-200">
          <p className="text-sm text-gray-900">{caption}</p>
        </div>

        {/* Review Instructions */}
        <div className="px-4 py-4 bg-consent-purple-light">
          <p className="text-sm font-semibold text-gray-900">
            Do you approve of being included in this post?
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 px-4 py-4 space-y-2">
        <Button onClick={onApprove} variant="primary" size="md" className="w-full">
          Approve
        </Button>
        <Button onClick={onDecline} variant="danger" size="md" className="w-full">
          Decline
        </Button>
        <Button onClick={onRequestChange} variant="outline" size="md" className="w-full">
          Request Change
        </Button>
      </div>
    </div>
  );
}
