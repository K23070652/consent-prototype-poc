import type { Subject } from '../../types';
import { useState } from 'react';

interface SomeoneRequestedChangeProps {
  subjects: Subject[];
  onEditPhoto: () => void;
  onCancelPost: () => void;
}

export function SomeoneRequestedChange({
  subjects,
  onEditPhoto,
  onCancelPost,
}: SomeoneRequestedChangeProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const changeRequestSubject = subjects.find((s) => s.status === 'requested-change');

  if (!changeRequestSubject) return null;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Change Request Message */}
        <div className="bg-consent-purple-light border-2 border-consent-purple rounded-lg p-4">
          <p className="font-bold text-lg text-consent-purple mb-2">
            {changeRequestSubject.name} requested changes
          </p>
          {changeRequestSubject.requestChangeMessage && (
            <p className="text-sm text-gray-700 bg-white rounded p-3 border border-gray-200">
              <em>{changeRequestSubject.requestChangeMessage}</em>
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-600">What would you like to do?</p>

          <button
            onClick={() => setSelectedAction('edit')}
            className={`w-full p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selectedAction === 'edit'
                ? 'border-consent-purple bg-consent-purple-light'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Edit the photo
          </button>

          <button
            onClick={() => setSelectedAction('cancel')}
            className={`w-full p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selectedAction === 'cancel'
                ? 'border-declined bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Cancel post
          </button>
        </div>

        {/* Confirmation */}
        {selectedAction && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Confirm:</strong> You're about to{' '}
              {selectedAction === 'edit' && 'edit the photo'}
              {selectedAction === 'cancel' && 'cancel your post'}.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (selectedAction === 'edit') {
                    onEditPhoto();
                  } else if (selectedAction === 'cancel') {
                    onCancelPost();
                  }
                }}
                className="flex-1 bg-consent-purple text-white font-semibold py-2 rounded-lg hover:bg-consent-purple-dark transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setSelectedAction(null)}
                className="flex-1 bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
