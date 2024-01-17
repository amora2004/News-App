import data from './data'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { Salsa } from 'next/font/google'
const salsa = Salsa({ subsets: ['latin'], weight: ['400'] })
const index = () => {
    const nav=data.map((item)=>{
        return(
          <div className={salsa.className}>
            <Link className={styles.link} key={item.id} href={item.url}>{item.name}</Link>
            </div>
        )
    })
  return (
    <div className={styles.navbar}>
      {nav}
    </div>
  )
}

export default index
