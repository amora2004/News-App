import Link from 'next/link';
import styles from "../TypeNews/News.module.css"
export default async function moreNews() {
  const cat = category;
  const apikey = '208c26a7d317aa6068a5fcac4c60936b';
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + cat + '&lang=en&country=us&max=5&apikey=' + apikey;
  const add = await fetch(url,
    {
      next: {
        revalidate: 36000000000000000000,
      }
    });

  const addJson = await add.json();
  const articles = addJson.articles;
  const titls = articles.map(item => {
    return (
      <Link href={`/${firstL}${item.title}`}>
        <div className={styles.newsTitle}>
          <div className={styles.infoTitle}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span>{item.publishedAt}</span>
          </div>
          <img src={item.image} alt='image news' />
        </div>
      </Link>
    )
  })
  return (
    <div className={styles.container}>
        <div className={styles.allTitls}>{titls}</div>
    </div>
  )
}
