export interface TopicSuggestion {
  id: string;
  _id: string;
  topic: string;
  sessionId: string;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
  isMyVote?: boolean;
}
