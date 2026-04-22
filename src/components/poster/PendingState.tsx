import type { Subject } from '../../types';

interface PendingStateProps {
  subjects: Subject[];
  caption: string;
  onSimulateResponse: (subjectId: string, status: 'approved' | 'declined') => void;
}

export function PendingState({
  subjects,
  caption,
  onSimulateResponse,
}: PendingStateProps) {
  const approvedCount = subjects.filter((s) => s.status === 'approved').length;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto">
        {/* Post Preview */}
        <div className="border-b border-gray-200">
          <div className="w-full aspect-square bg-gradient-to-br from-consent-purple to-consent-purple-dark flex items-center justify-center">
            <span className="text-white text-center text-sm font-semibold">
              Photo Preview
            </span>
          </div>
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm text-gray-600">{caption}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="px-4 py-4">
          <div className="bg-consent-purple-light rounded-lg p-4 mb-4">
            <p className="text-center font-semibold text-gray-900">
              Waiting for responses — {approvedCount} of {subjects.length} received
            </p>
          </div>

          {/* Subject List */}
          <div className="space-y-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <span className="font-semibold text-gray-900">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      subject.status === 'approved'
                        ? 'text-approved'
                        : subject.status === 'declined'
                          ? 'text-declined'
                          : 'text-pending'
                    }`}
                  >
                    {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Explanation Panel */}
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-700">
              <strong>Your post will be published automatically when everyone approves.</strong>
            </p>
          </div>

          {/* Demo Buttons */}
          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold text-gray-600 mb-2">SIMULATE RESPONSES:</p>
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => onSimulateResponse(subject.id, 'approved')}
                className="w-full text-left px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-semibold transition-colors"
              >
                {subject.name} Approves
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
