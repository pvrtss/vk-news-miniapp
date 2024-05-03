import { View, SplitLayout, SplitCol } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, NewsPage } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { useCallback, useEffect, useState } from "react";
import { getLatestNewsIds } from "./entities/news";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [newsIds, setNewsIds] = useState<number[] | undefined>(undefined);

  useEffect(() => {
    getLatestNewsIds().then((news) => setNewsIds(news));
    const interval = setInterval(() => {
      getLatestNewsIds().then((news) => setNewsIds(news));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
