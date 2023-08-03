import styles from '@/styles/Home.module.scss'
import type { NextPage } from 'next'
import { Navbar } from '@/components/Navbar'
import { Header } from '@/components/Header'
import { Featured } from '@/components/Featured'
import { PropertyList } from '@/components/PropertyList'
import { FeaturedProperties } from '@/components/FeaturedProperties'
import { MailList } from '@/components/MailList'
import { Footer } from '@/components/Footer'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Header type="home" />
      <div className={styles.homeContainer}>
        <Featured />
        <h1 className={styles.homeTitle}>Browse by property type</h1>
        <PropertyList />
        <h1 className={styles.homeTitle}>Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  )
}

export default Home;