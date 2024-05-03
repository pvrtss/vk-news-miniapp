import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Group,
  CardGrid,
  Link,
  PanelSpinner,
  Spinner,
  Spacing,
  Placeholder,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NewsCard } from "../entities/news/";
import { HomeProps } from "../typings";
import { useAppSelector, useAppDispatch } from "../utils";
import { change, inc } from "../features/drawableIds/drawableIdsSlice";

export const Home: FC<HomeProps> = ({ id, newsIds, onReloadClick }) => {
  const routeNavigator = useRouteNavigator();
  const drawableNewsIds = useAppSelector((state) => state.drawableIds.list);
  const dispatch = useAppDispatch();
  const observerTarget = useRef(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  // dispatch(change(newsIds ? [...newsIds.slice(0, 10)] : []));

  useEffect(() => {
    const target = observerTarget.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (newsIds) {
            if (drawableNewsIds.length < newsIds.length) {
              dispatch(inc(newsIds));
              console.log("true");
            } else {
              setHasMore(false);
              console.log("false");
            }
          }
        }
      },
      { threshold: 1 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observerTarget, newsIds, dispatch, drawableNewsIds]);

  const handleReload = useCallback(() => {
    dispatch(change(newsIds ? [...newsIds.slice(0, 10)] : []));
    onReloadClick();
  }, [dispatch, newsIds, onReloadClick]);

  const news = newsIds ? (
    <CardGrid size="l">
      {drawableNewsIds.map((id) => (
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

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      <Group
        mode="plain"
        header={
          <Header
            mode="secondary"
            aside={<Link onClick={handleReload}>Обновить</Link>}
          >
            Последние новости
          </Header>
        }
      >
        {news}
        <Spacing size={32} />
        {hasMore ? (
          <div ref={observerTarget} style={{ paddingBottom: 100 }}>
            <Spinner />
          </div>
        ) : (
          <Placeholder>На этом все!</Placeholder>
        )}
      </Group>
    </Panel>
  );
};
