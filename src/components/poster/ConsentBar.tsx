import { Button } from '../shared/Button';

interface ConsentBarProps {
  peopleCount: number;
  onSendRequest: () => void;
}

export function ConsentBar({ peopleCount, onSendRequest }: ConsentBarProps) {
  return (
    <div className="border-t border-gray-200 px-4 py-3 bg-consent-purple-light">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-gray-900">
          {peopleCount} people detected
        </span>
        <Button size="md" onClick={onSendRequest}>
          Send Request
        </Button>
      </div>
    </div>
  );
}
