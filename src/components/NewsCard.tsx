import {
  Card,
  Title,
  Spacing,
  Separator,
  Headline,
  Spinner,
  Text,
} from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { NewsCardProps, NewsItemProps } from "../typings";

export const NewsCard: FC<NewsCardProps> = ({ id, onClick }) => {
  const [newsItem, setNewsItem] = useState<NewsItemProps | undefined>(
    undefined
  );

  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((res) => res.json())
      .then((item) => setNewsItem(item));
  }, []);

  return newsItem ? (
    <Card mode="outline-tint" style={{ cursor: "pointer" }} onClick={onClick}>
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
    </Card>
  ) : (
    <Spinner />
  );
};
