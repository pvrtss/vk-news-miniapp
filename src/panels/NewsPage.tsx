import { FC, useEffect, useState } from "react";
import {
  Headline,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Separator,
  Spacing,
  Title,
  Text,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NewsItemProps } from "../typings";

export const NewsPage: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();
  const [newsItem, setNewsItem] = useState<NewsItemProps | undefined>(
    undefined
  );
  useEffect(() => {
    params &&
      params.id &&
      fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`)
        .then((res) => res.json())
        .then((item) => setNewsItem(item));
  }, []);
  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Одна Новость
      </PanelHeader>
      {newsItem && (
        <div style={{ marginLeft: 16 }}>
          <Title level="1" style={{ marginTop: 16 }}>
            {newsItem.title}
          </Title>
          <Spacing size={16} />

          <Headline level="2" weight="1">
            Ссылка
          </Headline>
          <a href={newsItem.url} target="_blank">
            <Text>{newsItem.url}</Text>
          </a>
          <Spacing size={8} />
          <Headline level="2" weight="1">
            Дата
          </Headline>
          <Text>
            {new Date(newsItem.time * 1000).toLocaleDateString("ru-RU")}
          </Text>
          <Spacing size={8} />
          <Headline level="2" weight="1">
            Автор
          </Headline>
          <Text>{newsItem.by}</Text>
          <Spacing size={8} />
          <Spacing size={64}>
            <Separator />
          </Spacing>
          <Title level="2">Комментарии ({newsItem.descendants})</Title>
        </div>
      )}
      {/* <Placeholder>новость</Placeholder> */}
    </Panel>
  );
};
