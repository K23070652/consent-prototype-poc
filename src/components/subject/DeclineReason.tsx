import { Button } from '../shared/Button';
import { useState } from 'react';

interface DeclineReasonProps {
  onSubmit: (reason: string, customMessage: string) => void;
  onBack: () => void;
}

const reasons = [
  "I'd rather not be in posts right now",
  'Can you use a different photo?',
  'Please crop me out of this one',
  "I don't feel comfortable with the caption",
  "I'd prefer to keep this moment private",
];

export function DeclineReason({ onSubmit, onBack }: DeclineReasonProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  const handleSubmit = () => {
    if (!selectedReason && !customMessage) return;
    onSubmit(selectedReason || '', customMessage);
  };

  const isValid = selectedReason || customMessage.trim();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Why would you like to decline?</h2>

        {/* Preset Reasons */}
        <div className="space-y-2">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(selectedReason === reason ? null : reason)}
              className={`w-full p-3 text-left border-2 rounded-lg font-semibold transition-all ${
                selectedReason === reason
                  ? 'border-declined bg-red-50 text-gray-900'
                  : 'border-gray-200 text-gray-900 hover:border-gray-300'
              }`}
            >
              {reason}
            </button>
          ))}
        </div>

        {/* Custom Message */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Add a custom message (optional)
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Let them know more about your decision..."
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-consent-purple resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t border-gray-200 px-4 py-3 space-y-2">
        <Button
          onClick={handleSubmit}
          variant="danger"
          size="md"
          className="w-full"
          disabled={!isValid}
        >
          Send Decline
        </Button>
        <Button onClick={onBack} variant="secondary" size="md" className="w-full">
          Back
        </Button>
      </div>
    </div>
  );
}
