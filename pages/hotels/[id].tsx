import styles from '@/styles/Hotel.module.scss'
import { useContext, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useRouterQuery } from 'next-router-query';
import Image from 'next/image';
import { Header } from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import Reserve from '@/components/Reserve';
import { MailList } from '@/components/MailList'
import { Footer } from '@/components/Footer'
import useFetch from '@/utils/useFetch'
import { AuthContext } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const HotelId: NextPage = () => {

  const queryParams = useRouterQuery()

  const HotelId = queryParams.id as string

  const { data, loading, error }: any = useFetch(`/api/hotels/${HotelId}`);

  const { dates, options }: any = useStore();

  const { user }: any = useContext(AuthContext);

  const router = useRouter();

  const MILLISECONS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1: Date, date2: Date) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate)

  const [slideNumber, setSlideNumber] = useState(0);
  const [openImg, setOpenImg] = useState(false);

  const [openBookModal, setOpenBookModal] = useState(false);


  const handleOpenImg = (i: number) => {
    setSlideNumber(i);
    setOpenImg(true);
  };

  const handleMoveImg = (direction: string) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  const handleClickBook = () => {
    if (user) {
      setOpenBookModal(true)
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <>
      <Navbar />
      <Header type="list" />
      {openImg &&
        <div className={styles.slider}>
          <FontAwesomeIcon icon={faCircleXmark} className={styles.closeBtn} onClick={() => {
            setOpenImg(false)
          }} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className={styles.arrow} onClick={() => {
            handleMoveImg("l")
          }} />
          <div className={styles.sliderWrapper}>
            <div className={styles.sliderImg} >
              <Image
                src={data.photos[slideNumber]}
                alt=""
                layout='fill'
              />
            </div>
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className={styles.arrow} onClick={() => {
            handleMoveImg("r")
          }} />
        </div>
      }
      <div className={styles.hotelContainer}>
        {loading ? ("Loading") : (
          <div className={styles.hotelWrapper}>
            <button className={styles.bookNow}>Reserve or Book Now!</button>
            <div className={styles.hotelTitle}>{data.name}</div>
            <div className={styles.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className={styles.hotelDistance}>
              Excellent location - {data.distance}m from center
            </span>
            <span className={styles.hotelPriceHighlight}>
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className={styles.hotelImages}>
              {data.photos?.map((photo: any, i: any) => (
                <div key={i} className={styles.hotelImgWrapper}>
                  <div className={styles.hotelImg}>
                    <Image
                      onClick={() => {
                        handleOpenImg(i)
                      }}
                      src={photo}
                      alt=""
                      layout='fill'
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.hotelDetails}>
              <div className={styles.hotelDetailsTexts}>
                <h1 className={styles.hotelTitle}>{data.title}</h1>
                <p className={styles.hotelDesc}>
                  {data.desc}
                </p>
              </div>
              <div className={styles.hotelDetailsPrice}>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} night)
                </h2>
                <button onClick={handleClickBook}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
      {openBookModal &&
        <Reserve setOpenBookModal={setOpenBookModal} />
      }
    </>
  )
}


export default HotelId
