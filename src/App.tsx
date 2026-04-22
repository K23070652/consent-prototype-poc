import { useReducer } from 'react';
import { ViewToggle } from './components/ViewToggle';
import { MobileFrame } from './components/shared/MobileFrame';
import { PosterView } from './components/poster/PosterView';
import { SubjectView } from './components/subject/SubjectView';
import type { AppState, Subject } from './types';
import { sampleCaption } from './data/mockData';
import './App.css';

function getResetSubjects(): Subject[] {
  return [
    { id: '1', name: 'Sarah', status: 'pending' },
    { id: '2', name: 'Alex', status: 'pending' },
    { id: '3', name: 'Jordan', status: 'pending' },
  ];
}

type Action =
  | { type: 'TOGGLE_VIEW'; payload: 'poster' | 'subject' }
  | { type: 'SEND_REQUEST' }
  | { type: 'SIMULATE_RESPONSE'; payload: { subjectId: string; status: 'approved' | 'declined' } }
  | { type: 'START_NEW_POST' }
  | { type: 'UPDATE_CAPTION'; payload: string }
  | { type: 'APPROVE_REQUEST' }
  | {
      type: 'DECLINE_REQUEST';
      payload: { reason: string; customMessage: string };
    }
  | {
      type: 'REQUEST_CHANGE';
      payload: { message: string };
    }
  | { type: 'POST_WITHOUT_SUBJECT'; payload: string }
  | { type: 'EDIT_PHOTO' }
  | { type: 'CANCEL_POST' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_VIEW':
      return { ...state, currentView: action.payload };

    case 'SEND_REQUEST':
      return { ...state, requestStatus: 'pending' };

    case 'SIMULATE_RESPONSE': {
      const updatedSubjects = state.subjects.map((subject) => {
        if (subject.id === action.payload.subjectId) {
          return { ...subject, status: action.payload.status };
        }
        return subject;
      });

      const allApproved = updatedSubjects.every((s) => s.status === 'approved');
      const someDeclined = updatedSubjects.some((s) => s.status === 'declined');

      return {
        ...state,
        subjects: updatedSubjects,
        requestStatus: allApproved ? 'all-approved' : someDeclined ? 'someone-declined' : 'pending',
      };
    }

    case 'START_NEW_POST':
      return {
        ...state,
        requestStatus: 'none',
        subjects: getResetSubjects(),
        caption: sampleCaption,
      };

    case 'UPDATE_CAPTION':
      return { ...state, caption: action.payload };

    case 'APPROVE_REQUEST': {
      const updatedSubjects = state.subjects.map((subject) => {
        if (subject.name === 'Sarah') {
          return { ...subject, status: 'approved' as const };
        }
        return subject;
      }) as Subject[];

      const allApproved = updatedSubjects.every((s) => s.status === 'approved');

      return {
        ...state,
        subjects: updatedSubjects,
        requestStatus: allApproved ? 'all-approved' : 'pending',
      };
    }

    case 'DECLINE_REQUEST': {
      const updatedSubjects = state.subjects.map((subject) => {
        if (subject.name === 'Sarah') {
          return {
            ...subject,
            status: 'declined' as const,
            declineReason: action.payload.reason || action.payload.customMessage,
          };
        }
        return subject;
      }) as Subject[];

      return {
        ...state,
        subjects: updatedSubjects,
        requestStatus: 'someone-declined',
      };
    }
    case 'REQUEST_CHANGE': {
      const updatedSubjects = state.subjects.map((subject) => {
        if (subject.name === 'Sarah') {
          return {
            ...subject,
            status: 'requested-change',
            requestChangeMessage: action.payload.message,
          };
        }
        return subject;
      }) as Subject[];

      return {
        ...state,
        subjects: updatedSubjects,
        requestStatus: 'someone-requested-change',
      };
    }
    case 'POST_WITHOUT_SUBJECT': {
      return {
        ...state,
        requestStatus: 'none',
        subjects: getResetSubjects(),
        caption: sampleCaption,
      };
    }

    case 'EDIT_PHOTO':
    case 'CANCEL_POST':
      return {
        ...state,
        requestStatus: 'none',
        subjects: getResetSubjects(),
        caption: sampleCaption,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    requestStatus: 'none',
    subjects: getResetSubjects(),
    currentView: 'poster',
    caption: sampleCaption,
    posterDeclineHandled: false,
  });

  const handleToggleView = (view: 'poster' | 'subject') => {
    dispatch({ type: 'TOGGLE_VIEW', payload: view });
  };

  const handleSendRequest = () => {
    dispatch({ type: 'SEND_REQUEST' });
  };

  const handleSimulateResponse = (subjectId: string, status: 'approved' | 'declined') => {
    dispatch({ type: 'SIMULATE_RESPONSE', payload: { subjectId, status } });
  };

  const handleStartNewPost = () => {
    dispatch({ type: 'START_NEW_POST' });
  };

  const handleUpdateCaption = (caption: string) => {
    dispatch({ type: 'UPDATE_CAPTION', payload: caption });
  };

  const handleApprove = () => {
    dispatch({ type: 'APPROVE_REQUEST' });
  };

  const handleDecline = (reason: string, customMessage: string) => {
    dispatch({ type: 'DECLINE_REQUEST', payload: { reason, customMessage } });
  };

  const handleRequestChange = (message: string) => {
    dispatch({ type: 'REQUEST_CHANGE', payload: { message } });
  };

  const handlePostWithoutSubject = (subjectId: string) => {
    dispatch({ type: 'POST_WITHOUT_SUBJECT', payload: subjectId });
  };

  const handleEditPhoto = () => {
    dispatch({ type: 'EDIT_PHOTO' });
  };

  const handleCancelPost = () => {
    dispatch({ type: 'CANCEL_POST' });
  };

  return (
    <MobileFrame>
      <ViewToggle currentView={state.currentView} onToggle={handleToggleView} />
      {state.currentView === 'poster' ? (
        <PosterView
          requestStatus={state.requestStatus}
          subjects={state.subjects}
          caption={state.caption}
          onCaptionChange={handleUpdateCaption}
          onSendRequest={handleSendRequest}
          onSimulateResponse={handleSimulateResponse}
          onStartNewPost={handleStartNewPost}
          onPostWithoutSubject={handlePostWithoutSubject}
          onEditPhoto={handleEditPhoto}
          onCancelPost={handleCancelPost}
        />
      ) : (
        <SubjectView
          requestStatus={state.requestStatus}
          posterName="Manav"
          caption={state.caption}
          onApprove={handleApprove}
          onDecline={handleDecline}
          onRequestChange={handleRequestChange}
        />
      )}
    </MobileFrame>
  );
}

export default App;
