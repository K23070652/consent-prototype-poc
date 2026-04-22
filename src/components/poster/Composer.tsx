import { ConsentBar } from './ConsentBar';
import type { Subject } from '../../types';

interface ComposerProps {
  caption: string;
  onCaptionChange: (caption: string) => void;
  subjects: Subject[];
  onSendRequest: () => void;
}

export function Composer({
  caption,
  onCaptionChange,
  subjects,
  onSendRequest,
}: ComposerProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-auto">
        {/* Post Preview */}
        <div className="border-b border-gray-200">
          {/* Image Placeholder */}
          <div className="w-full aspect-square bg-gradient-to-br from-purple-300 via-pink-200 to-orange-200 flex items-center justify-center">
            <span className="text-white text-center text-sm font-semibold">
              Group photo with 3 friends
            </span>
          </div>

          {/* Caption Input */}
          <div className="px-4 py-3">
            <label className="text-xs font-semibold text-gray-600 mb-2 block">CAPTION</label>
            <textarea
              value={caption}
              onChange={(e) => onCaptionChange(e.target.value)}
              placeholder="Write a caption..."
              className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-consent-purple"
              rows={3}
            />
          </div>

          {/* Tagged People */}
          <div className="px-4 py-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              TAGGED: {subjects.map((s) => s.name).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Consent Bar */}
      <ConsentBar peopleCount={subjects.length} onSendRequest={onSendRequest} />
    </div>
  );
}
