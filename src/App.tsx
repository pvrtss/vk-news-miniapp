import { View, SplitLayout, SplitCol } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, NewsPage } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { useCallback, useEffect, useState } from "react";
import { getLatestNewsIds } from "./entities/news";
import { useAppDispatch } from "./utils";
import { addNewIfAny } from "./features/drawableIds/drawableIdsSlice";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [newsIds, setNewsIds] = useState<number[] | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLatestNewsIds().then((news) => setNewsIds(news));
    const interval = setInterval(() => {
      getLatestNewsIds().then((news) => {
        setNewsIds(news);
        dispatch(addNewIfAny(news));
      });
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const reloadNews = useCallback(() => {
    setNewsIds(undefined);
    getLatestNewsIds().then((news) => setNewsIds(news));
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" newsIds={newsIds} onReloadClick={reloadNews} />
          <NewsPage id="news" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
