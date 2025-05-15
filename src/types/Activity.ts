export interface Activity {
  id: string;
  action: 'sold' | 'added' | 'updated' | 'removed';
  item: string;
  quantity: number;
  unit?: string;
  timestamp: Date;
}