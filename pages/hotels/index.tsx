import styles from '@/styles/Hotels.module.scss'
import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRouterQuery } from 'next-router-query'
import { Header } from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import SearchItem from '@/components/SearchItem'
import { useStore } from '@/context/StoreContext'
import useFetch from '@/utils/useFetch'
import { dateType, optionsType } from '@/utils/typed'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns"

const Hotels: NextPage = () => {

  const router = useRouter();

  const queryParams = useRouterQuery();

  let qDates: dateType;
  let qOpts: optionsType;

  qDates = {
    startDate: new Date(queryParams.startDate?.toString() as string),
    endDate: new Date(queryParams.endDate?.toString() as string),
    key: "selection"
  }

  qOpts = {
    adult: parseInt(queryParams.optAdult?.toString() as string) as number,
    children: parseInt(queryParams.optChildren?.toString() as string) as number,
    room: parseInt(queryParams.optRoom?.toString() as string) as number
  }

  const {
    destination, setDestination,
    dates, setDates,
    options, setOptions,
    openDate, setOpenDate,
    openOptions, setOpenOptions,
    min, setMin,
    max, setMax
  }: any = useStore();

  let dataURL = `/api/hotels?min=${min || 0}&max=${max || 999}`;

  if (queryParams.desti !== "") {
    dataURL = `/api/hotels?city=${queryParams.desti}&min=${min || 0}&max=${max || 999}`;
  }

  useEffect(() => {
    setDestination(queryParams.desti)
    setDates([qDates])
    setOptions(qOpts)
  }, [])

  if (destination !== "") {
    dataURL = `/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`;
  }

  const { data, loading, error, reFetch } = useFetch(dataURL) as any;

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          <div className={styles.listSearch}>
            <h1 className={styles.lsTitle}>Search</h1>
            <div className={styles.lsItem}>
              <label>Destination</label>
              <input placeholder="Enter the destination."
                defaultValue={destination}
                onChange={e => setDestination(e.target.value)}
                type="text" />
            </div>
            <div className={styles.lsItem}>
              <label>Check-in Date</label>
              <span className={`${styles.noselect}`} onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                className={styles.date} />}
            </div>
            <div className={styles.lsItem}>
              <label>Options</label>
              <div className={styles.lsOptions}>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMin(e.target.value)} className={styles.lsOptionInput} defaultValue="1" />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMax(e.target.value)} className={styles.lsOptionInput} defaultValue="990" />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Adult
                  </span>
                  <input type="number" min={1} className={styles.lsOptionInput} placeholder="1" onChange={(e) => {
                    setOptions((prev: any) => {
                      return {
                        ...prev, adult: e.target.value,
                      };
                    })
                  }} defaultValue={qOpts.adult} />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Children
                  </span>
                  <input type="number" min={0} className={styles.lsOptionInput} placeholder="0" onChange={(e) => {
                    setOptions((prev: any) => {
                      return {
                        ...prev, children: e.target.value,
                      };
                    })
                  }} defaultValue={qOpts.children} />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Room
                  </span>
                  <input type="number" min={1} className={styles.lsOptionInput} placeholder="1" onChange={(e) => {
                    setOptions((prev: any) => {
                      return {
                        ...prev, room: e.target.value,
                      };
                    })
                  }} defaultValue={qOpts.room} />
                </div>
              </div>
            </div>
            <button onClick={() => {
              router.push({
                pathname: 'hotels',
                query: { desti: destination, startDate: format(dates[0].startDate, "MM/dd/yyyy"), endDate: format(dates[0].endDate, "MM/dd/yyyy"), optAdult: options.adult, optChildren: options.children, optRoom: options.room }
              });
              reFetch()
            }}>Search</button>
          </div>
          <div className={styles.listResult}>
            {loading ? "Loading" : <>
              {data.map((item: any) => (
                <SearchItem item={item} key={item._id} />
              ))}

            </>}
          </div>
        </div>
      </div>
    </>
  )

}

export default Hotels
