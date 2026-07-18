export interface HomeGridItem {
  id: string;
  icon: string;
  color: string;
  value: string; // Add this
  label: string; // Add this
}

export interface StatCardProps {
  value: string;
  label: string;
  valueStyle: object;
}