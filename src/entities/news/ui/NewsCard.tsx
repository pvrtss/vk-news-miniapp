import {
  Card,
  Title,
  Spacing,
  Separator,
  Headline,
  Text,
} from "@vkontakte/vkui";
import { FC, useEffect } from "react";
import { NewsCardProps } from "../../../typings";
import { getItemById } from "../api/getItemById";
import styles from "./NewsCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../utils";
import { add } from "../../../features/itemsList/ItemsListSlice";

export const NewsCard: FC<NewsCardProps> = ({ id, onClick }) => {
  const newsList = useAppSelector((state) => state.newsList.list);
  const dispatch = useAppDispatch();
  const newsItem = newsList[id];
  useEffect(() => {
    if (!newsList[id]) {
      getItemById(id).then((item) => {
        return item !== null
          ? dispatch(add(item))
          : getItemById(id).then((item) => dispatch(add(item)));
      });
    }
  }, [dispatch, id, newsList]);

  return (
    <Card mode="outline-tint" style={{ cursor: "pointer" }} onClick={onClick}>
      {newsItem ? (
        <div style={{ marginLeft: 16 }}>
          <Title level="2" style={{ marginTop: 16 }}>
            {newsItem.title}
          </Title>
          <Spacing size={16}>
            <Separator />
          </Spacing>

          <Headline level="2" weight="1">
            Рейтинг
          </Headline>
          <Text>{newsItem.score ? newsItem.score : "Не указан"}</Text>
          <Spacing size={8} />

          <Headline level="2" weight="1">
            Автор
          </Headline>
          <Text>{newsItem.by}</Text>
          <Spacing size={8} />

          <Headline level="2" weight="1">
            Дата
          </Headline>
          <Text>
            {new Date(newsItem.time * 1000).toLocaleDateString("ru-RU")}
          </Text>
          <Spacing size={16} />
        </div>
      ) : (
        <div className={styles.skeleton}></div>
      )}
    </Card>
  );
};
