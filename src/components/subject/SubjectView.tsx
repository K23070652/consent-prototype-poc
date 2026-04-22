import { useState } from 'react';
import { Notification } from './Notification';
import { ReviewPost } from './ReviewPost';
import { DeclineReason } from './DeclineReason';
import { RequestChange } from './RequestChange';
import { Confirmation } from './Confirmation';
import type { RequestStatus } from '../../types';

interface SubjectViewProps {
  requestStatus: RequestStatus;
  posterName: string;
  caption: string;
  subjectStatus: string;
  declineReason?: string;
  onApprove: () => void;
  onDecline: (reason: string, customMessage: string) => void;
  onRequestChange: (message: string) => void;
}

type SubjectScreen =
  | 'no-requests'
  | 'notification'
  | 'review'
  | 'decline-reason'
  | 'request-change'
  | 'confirmation-approve'
  | 'confirmation-decline'
  | 'confirmation-request-change';

export function SubjectView({
  requestStatus,
  posterName,
  caption,
  onApprove,
  onDecline,
  onRequestChange,
}: Omit<SubjectViewProps, 'subjectStatus' | 'declineReason'>) {
  const [screen, setScreen] = useState<SubjectScreen>('notification');

  // Show no-requests screen if no request has been sent
  if (requestStatus === 'none') {
    return (
      <div className="flex flex-col h-screen bg-white items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-gray-600">
            No consent requests yet. We'll send you a notification when someone requests to tag you in something!
          </p>
        </div>
      </div>
    );
  }

  // After confirming response, show no-requests screen
  if (screen === 'no-requests') {
    return (
      <div className="flex flex-col h-screen bg-white items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-gray-600">
            No consent requests yet. We'll send you a notification when someone requests to tag you in something!
          </p>
        </div>
      </div>
    );
  }

  if (screen === 'notification') {
    return (
      <Notification
        posterName={posterName}
        onReviewPost={() => setScreen('review')}
      />
    );
  }

  if (screen === 'review') {
    return (
      <ReviewPost
        posterName={posterName}
        caption={caption}
        onApprove={() => {
          onApprove();
          setScreen('confirmation-approve');
        }}
        onDecline={() => setScreen('decline-reason')}
        onRequestChange={() => setScreen('request-change')}
      />
    );
  }

  if (screen === 'request-change') {
    return (
      <RequestChange
        onSubmit={(message: string) => {
          onRequestChange(message);
          setScreen('confirmation-request-change');
        }}
        onBack={() => setScreen('review')}
      />
    );
  }

  if (screen === 'decline-reason') {
    return (
      <DeclineReason
        onSubmit={(reason: string, customMessage: string) => {
          onDecline(reason, customMessage);
          setScreen('confirmation-decline');
        }}
        onBack={() => setScreen('review')}
      />
    );
  }

  if (screen === 'confirmation-approve') {
    return (
      <Confirmation responseType="approved" onDone={() => setScreen('no-requests')} />
    );
  }

  if (screen === 'confirmation-decline') {
    return (
      <Confirmation responseType="declined" onDone={() => setScreen('no-requests')} />
    );
  }

  if (screen === 'confirmation-request-change') {
    return (
      <Confirmation responseType="approved" onDone={() => setScreen('no-requests')} />
    );
  }

  return null;
}
