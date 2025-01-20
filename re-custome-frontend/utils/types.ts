
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  activityCounts: {
    loginCount: number;
    downloadCount: number;
  }
}

export interface ActivityLog {
  userId: number;
  activity: string;
  timestamp: string;
}

export interface PDFResponse {
  fileName: string;
  fileContent: string;
}
