import React from 'react'
import styles from './News.module.css'
import Link from 'next/link';
import Name from './Name/Name';
import ApiError from '../ApiError';

export default async function TypeNews({ category }) {
  let tit ;
  const cat = category;
  const firstL = cat.slice(0, 2);
  const apikey = '208c26a7d317aa6068a5fcac4c60936b';
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + cat + '&lang=en&country=us&max=20&apikey=' + apikey;
  try{
  const add = await fetch(url,
    {
      next: {
        revalidate: 3600000000000000000,
      }
    });

  const addJson = await add.json();
  const articles = addJson.articles;
   tit = articles.map(item => {
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
  })}
  catch{
      tit = <ApiError/>    
  }
  return (
    <div className={styles.container}>
      <Name name={cat} />
      <div id="titls" className={styles.allTitls}>{tit}</div>
    </div>
  )
}

