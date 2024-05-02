import { FC, useCallback, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Group,
  NavIdProps,
  CardGrid,
  Link,
  PanelSpinner,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { NewsCard } from "../components";

export const Home: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [newsIds, setNewsIds] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((res) => res.json())
      .then((ids) => setNewsIds(ids.slice(0, 100)));
    const interval = setInterval(() => {
      fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
        .then((res) => res.json())
        .then((ids) => setNewsIds(ids.slice(0, 100)));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const news = newsIds ? (
    <CardGrid size="l">
      {newsIds.map((id) => (
        <NewsCard
          id={id}
          key={id}
          onClick={() => routeNavigator.push(`/news/${id}`)}
        />
      ))}
    </CardGrid>
  ) : (
    <PanelSpinner />
  );

  const reloadNews = useCallback(() => {
    setNewsIds(undefined);
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((res) => res.json())
      .then((ids) => setNewsIds(ids.slice(0, 100)));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      <Group
        mode="plain"
        header={
          <Header
            mode="secondary"
            aside={<Link onClick={reloadNews}>Обновить</Link>}
          >
            Последние новости
          </Header>
        }
      >
        {news}
      </Group>
    </Panel>
  );
};
