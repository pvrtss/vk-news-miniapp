import { NavIdProps } from "@vkontakte/vkui";

export interface NewsCardProps {
  id: number;
  onClick: () => void;
}

export interface NewsItemProps {
  by: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score?: number;
  time: number;
  title?: string;
  type: string;
  url?: string;
  text?: HTMLElement;
}

// export interface NewsPageProps extends NavIdProps {
//   newsItem: NewsItemProps;
// }
