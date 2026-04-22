import type { Subject } from '../../types';
import { useState } from 'react';

interface SomeoneDeclinedProps {
  subjects: Subject[];
  onPostWithoutSubject: (subjectId: string) => void;
  onEditPhoto: () => void;
  onCancelPost: () => void;
}

export function SomeoneDeclined({
  subjects,
  onPostWithoutSubject,
  onEditPhoto,
  onCancelPost,
}: SomeoneDeclinedProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const declinedSubject = subjects.find((s) => s.status === 'declined');

  if (!declinedSubject) return null;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Declined Message */}
        <div className="bg-declined/10 border-2 border-declined rounded-lg p-4">
          <p className="font-bold text-lg text-declined mb-2">
            {declinedSubject.name} declined your request
          </p>
          {declinedSubject.declineReason && (
            <p className="text-sm text-gray-700">
              Reason: <em>{declinedSubject.declineReason}</em>
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-600">What would you like to do?</p>

          <button
            onClick={() => setSelectedAction('post-without')}
            className={`w-full p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selectedAction === 'post-without'
                ? 'border-instagram-blue bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Post without {declinedSubject.name}
          </button>

          <button
            onClick={() => setSelectedAction('edit')}
            className={`w-full p-4 border-2 rounded-lg text-left font-semibold transition-all ${
              selectedAction === 'edit'
                ? 'border-instagram-blue bg-blue-50'
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
              {selectedAction === 'post-without' && `post without ${declinedSubject.name}`}
              {selectedAction === 'edit' && 'edit the photo'}
              {selectedAction === 'cancel' && 'cancel your post'}
              .
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (selectedAction === 'post-without') {
                    onPostWithoutSubject(declinedSubject.id);
                  } else if (selectedAction === 'edit') {
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
