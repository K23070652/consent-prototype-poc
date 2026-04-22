import { Button } from '../shared/Button';
import { useState } from 'react';

interface RequestChangeProps {
  onSubmit: (message: string) => void;
  onBack: () => void;
}

const requestChangeReasons = [
  'Can you use a different photo?',
  'Please adjust the caption',
  'Could you crop this differently?',
  'I have a better version of this photo',
  "Let's discuss before posting",
];

export function RequestChange({ onSubmit, onBack }: RequestChangeProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  const handleSubmit = () => {
    if (!selectedReason && !customMessage) return;
    onSubmit(selectedReason || customMessage);
  };

  const isValid = selectedReason || customMessage.trim();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">What would you like changed?</h2>

        {/* Preset Reasons */}
        <div className="space-y-2">
          {requestChangeReasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(selectedReason === reason ? null : reason)}
              className={`w-full p-3 text-left border-2 rounded-lg font-semibold transition-all ${
                selectedReason === reason
                  ? 'border-consent-purple bg-consent-purple-light text-gray-900'
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
            placeholder="Tell them what you'd like changed..."
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-consent-purple resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t border-gray-200 px-4 py-3 space-y-2">
        <Button
          onClick={handleSubmit}
          variant="primary"
          size="md"
          className="w-full"
          disabled={!isValid}
        >
          Send Request
        </Button>
        <Button onClick={onBack} variant="secondary" size="md" className="w-full">
          Back
        </Button>
      </div>
    </div>
  );
}
