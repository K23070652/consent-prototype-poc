import { Button } from '../shared/Button';
import { useState } from 'react';

interface ConfirmationProps {
  responseType: 'approved' | 'declined';
  onDone: () => void;
}

export function Confirmation({ responseType, onDone }: ConfirmationProps) {
  const [rememberPreference, setRememberPreference] = useState(false);

  const isApproved = responseType === 'approved';

  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center p-6 space-y-6">
      {/* Checkmark or X */}
      <div className={`text-6xl ${isApproved ? 'text-approved' : 'text-declined'}`}>
        {isApproved ? '✓' : '✗'}
      </div>

      {/* Message */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Response sent</h2>
        <p className="text-sm text-gray-600">Manav will be notified of your decision</p>
      </div>

      {/* Remember Preference Toggle */}
      <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Remember preference for Manav</span>
        <button
          onClick={() => setRememberPreference(!rememberPreference)}
          className={`w-12 h-7 rounded-full transition-colors ${
            rememberPreference ? 'bg-consent-purple' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full transition-transform ${
              rememberPreference ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Done Button */}
      <Button onClick={onDone} size="lg" className="w-full">
        Done
      </Button>
    </div>
  );
}
