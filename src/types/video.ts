export interface VideoTimestamp {
  id: string;
  startSeconds: number;
  endSeconds?: number;
  label: string;
  summary: string;
  topicIds: string[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  channelName: 'ธรรมะ โฆษก';
  youtubeUrl: string;
  thumbnailUrl: string;
  duration?: string;
  publishedAt?: string;
  categoryIds: string[];
  tags: string[];
  timestamps: VideoTimestamp[];
}
