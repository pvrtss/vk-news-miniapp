import { NavIdProps } from "@vkontakte/vkui";

export interface NewsCardProps {
  id: number;
  onClick: () => void;
}

export interface ItemProps {
  by: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score?: number;
  time: number;
  title?: string;
  type: string;
  url?: string;
  text?: TrustedHTML;
  deleted?: boolean;
}

export interface HomeProps extends NavIdProps {
  newsIds: number[] | undefined;
  onReloadClick: () => void;
}

export interface CommentProps {
  id: number;
}
