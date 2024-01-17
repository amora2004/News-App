
import ApiError from "@/components/ApiError";
import style from "./News.module.css"
export default async function page(props) {
  const news = props.params.title;
  const stop = news.indexOf("%");
  const titl = news.slice(2, stop);
  const first = news[0] + news[1];
  let cat;
  if (first === "sp") cat = "sports"
  else if (first === "bu") cat = "business"
  else if (first === "en") cat = "enterainment"
  else if (first === "he") cat = "health"
  else if (first === "na") cat = "nation"
  else if (first === "sc") cat = "science"
  else if (first === "te") cat = "technology"
  else if (first === "wo") cat = "world"


  const apikey = '208c26a7d317aa6068a5fcac4c60936b';
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + cat + '&lang=en&country=us&max=100&apikey=' + apikey;
  let details;
  try {
    const add = await fetch(url,
      {
        next: {
          revalidate: 3600000000000,
        }
      });

    const addJson = await add.json();
    const articles = addJson.articles;
    const newsItem = articles.filter((news) => news.title.slice(0, titl.length) === titl)
    const myNews = newsItem[0];
    details =
      <>
        <div className={style.container}>
          <div className={style.address}>
            <div className={style.image}>
              <img className={style.img} src={myNews.image} alt="news Image" />
            </div>
            <div className={style.tit}>
              <h2 className={style.title}>{myNews.title}</h2>
              <p>{myNews.description}</p>
            </div>
          </div>
          <div className={style.data}>
            <div className={style.content}>
              <p>{myNews.content}</p>
              <div>Link to the full news : <a>{myNews.url}</a></div>
            </div>
            <p className={style.publish}>{myNews.publishedAt}</p>
            <div className={style.source}>
              <p> from : {myNews.source.name}</p>
              <p>{myNews.source.url}</p>
            </div>
          </div>
          <div>
          </div>
        </div>
      </>
  }
  catch (error) {
    details = <ApiError />
  }
  return (
    <div className={style.page}>
      <div>{details}</div>
    </div>

  )
}