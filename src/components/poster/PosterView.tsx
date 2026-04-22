import { Composer } from './Composer';
import { PendingState } from './PendingState';
import { Posted } from './Posted';
import { SomeoneDeclined } from './SomeoneDeclined';
import { SomeoneRequestedChange } from './SomeoneRequestedChange';
import type { Subject, RequestStatus } from '../../types';

interface PosterViewProps {
  requestStatus: RequestStatus;
  subjects: Subject[];
  caption: string;
  onCaptionChange: (caption: string) => void;
  onSendRequest: () => void;
  onSimulateResponse: (subjectId: string, status: 'approved' | 'declined') => void;
  onStartNewPost: () => void;
  onPostWithoutSubject: (subjectId: string) => void;
  onEditPhoto: () => void;
  onCancelPost: () => void;
}

export function PosterView({
  requestStatus,
  subjects,
  caption,
  onCaptionChange,
  onSendRequest,
  onSimulateResponse,
  onStartNewPost,
  onPostWithoutSubject,
  onEditPhoto,
  onCancelPost,
}: PosterViewProps) {
  if (requestStatus === 'none') {
    return (
      <Composer
        caption={caption}
        onCaptionChange={onCaptionChange}
        subjects={subjects}
        onSendRequest={onSendRequest}
      />
    );
  }

  if (requestStatus === 'pending') {
    return (
      <PendingState
        subjects={subjects}
        caption={caption}
        onSimulateResponse={onSimulateResponse}
      />
    );
  }

  if (requestStatus === 'all-approved') {
    return <Posted onStartNewPost={onStartNewPost} />;
  }

  if (requestStatus === 'someone-declined') {
    return (
      <SomeoneDeclined
        subjects={subjects}
        onPostWithoutSubject={onPostWithoutSubject}
        onEditPhoto={onEditPhoto}
        onCancelPost={onCancelPost}
      />
    );
  }

  if (requestStatus === 'someone-requested-change') {
    return (
      <SomeoneRequestedChange
        subjects={subjects}
        onEditPhoto={onEditPhoto}
        onCancelPost={onCancelPost}
      />
    );
  }

  return null;
}
