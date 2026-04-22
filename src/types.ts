export type RequestStatus = 'none' | 'pending' | 'all-approved' | 'someone-declined' | 'someone-requested-change';
export type SubjectStatus = 'pending' | 'approved' | 'declined' | 'requested-change';
export type ViewType = 'poster' | 'subject';

export interface Subject {
  id: string;
  name: string;
  status: SubjectStatus;
  declineReason?: string | undefined;
  requestChangeMessage?: string | undefined;
}

export interface AppState {
  requestStatus: RequestStatus;
  subjects: Subject[];
  currentView: ViewType;
  caption: string;
  posterDeclineHandled: boolean;
}
