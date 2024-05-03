import { FC, useEffect } from "react";
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
import { useAppSelector, useAppDispatch } from "../utils";
import { Comment } from "../entities/comment";
import { getItemById } from "../entities/news";
import { add } from "../features/itemsList/ItemsListSlice";

export const NewsPage: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();
  const newsList = useAppSelector((state) => state.newsList.list);
  const dispatch = useAppDispatch();
  const newsItem = params?.id ? newsList[params?.id] : undefined;
  const idx = params ? (params.id ? Number(params.id) : -1) : -1;
  useEffect(() => {
    if (!newsList[idx]) {
      getItemById(idx).then((item) => dispatch(add(item)));
    }
  }, [dispatch, idx, newsList]);
  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Новость
      </PanelHeader>
      {newsItem ? (
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
          {newsItem.kids &&
            newsItem.kids.map((kid) => <Comment id={kid} key={kid} />)}
          <Spacing size={16}></Spacing>
        </div>
      ) : (
        <Placeholder>Упс! Новость недоступна</Placeholder>
      )}
    </Panel>
  );
};
