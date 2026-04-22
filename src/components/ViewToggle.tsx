import type { ViewType } from '../types';

interface ViewToggleProps {
  currentView: ViewType;
  onToggle: (view: ViewType) => void;
}

export function ViewToggle({ currentView, onToggle }: ViewToggleProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex gap-2">
        <button
          onClick={() => onToggle('poster')}
          className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors ${
            currentView === 'poster'
              ? 'bg-consent-purple text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Poster (Manav)
        </button>
        <button
          onClick={() => onToggle('subject')}
          className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-colors ${
            currentView === 'subject'
              ? 'bg-consent-purple text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Subject (Sarah)
        </button>
      </div>
    </div>
  );
}
