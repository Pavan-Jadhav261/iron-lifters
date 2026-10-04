export type Status = 'New' | 'Contacted' | 'Follow-up Scheduled' | 'Converted' | 'Closed';

export type Lead = {
  id: string;
  name: string;
  phone: string;
  membership: string;
  notes: string | null;
  status: Status | string;
  scheduledMessages: string[];
  createdAt: string;
  updatedAt: string;
}

export const memberships = ['1 Month', '3 Months', '6 Months', '1 Year', 'Personal Training'];
export const statuses = ['New', 'Contacted', 'Follow-up Scheduled', 'Converted', 'Closed'];
