export async function getLatestNewsIds(count: number = 100) {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  const news: number[] = await res.json();
  return news.slice(0, count);
}
