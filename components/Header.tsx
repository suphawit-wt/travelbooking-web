import styles from "@/styles/components/Header.module.scss";
import { useContext } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { optionsType } from "@/utils/typed";
import { useStore } from "@/context/StoreContext";
import { AuthContext } from "@/context/AuthContext";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";

export const Header = (props: { type: string }) => {
    const router = useRouter();

    const { destination, setDestination,
        dates, setDates,
        options, setOptions,
        openDate, setOpenDate,
        openOptions, setOpenOptions }: any = useStore();

    function formatDate(string: string) {
        var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    const { user }: any = useContext(AuthContext);

    const handleOption = (name: string, operation: string) => {
        setOptions((prev: optionsType) => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    return (
        <div className={styles.header}>
            <div className={props.type === "list" ? `${styles.headerContainer} ${styles.listMode}` : `${styles.headerContainer}`}>
                <div className={styles.headerList}>
                    <div className={`${styles.headerListItem} ${styles.noselect} ${styles.active}`}>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className={`${styles.headerListItem} ${styles.noselect}`}>
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className={`${styles.headerListItem} ${styles.noselect}`}>
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className={`${styles.headerListItem} ${styles.noselect}`}>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className={`${styles.headerListItem} ${styles.noselect}`}>
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {props.type !== "list" && <>
                    <h1 className={styles.headerTitle}>A lifetime of discounts? It&apos;s Genius.</h1>
                    <p className={styles.headerDesc}>
                        Get rewarded for your travels - unlock instant savings of 10% or more with a free TravelBooking account
                    </p>
                    {!user &&
                        <Link href="/auth/login">
                            <a className={styles.headerBtn}>
                                Sign in / Register
                            </a>
                        </Link>
                    }
                    <div className={styles.headerSearch}>
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                className={styles.headerSearchInput}
                                value={destination}
                                onChange={e => setDestination(e.target.value)} />
                        </div>
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon} />
                            <span onClick={() => setOpenDate(!openDate)} className={`${styles.headerSearchText} ${styles.noselect}`}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={(item) => {
                                    setDates([item.selection])
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                minDate={new Date()}
                                className={styles.date} />}
                        </div>
                        <div className={styles.headerSearchItem}>
                            <FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
                            <span onClick={() => setOpenOptions(!openOptions)} className={`${styles.headerSearchText} ${styles.noselect}`}>{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                            {openOptions && <div className={styles.options}>
                                <div className={styles.optionItem}>
                                    <span className={styles.optionText}>Adult</span>
                                    <div className={styles.optionCounter}>
                                        <button disabled={options.adult <= 1} className={styles.optionCounterButton} onClick={() => handleOption("adult", "d")}>-</button>
                                        <span className={styles.optionCounterNumber}>{options.adult}</span>
                                        <button className={styles.optionCounterButton} onClick={() => handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className={styles.optionItem}>
                                    <span className={styles.optionText}>Children</span>
                                    <div className={styles.optionCounter}>
                                        <button disabled={options.children <= 0} className={styles.optionCounterButton} onClick={() => handleOption("children", "d")}>-</button>
                                        <span className={styles.optionCounterNumber}>{options.children}</span>
                                        <button className={styles.optionCounterButton} onClick={() => handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className={styles.optionItem}>
                                    <span className={styles.optionText}>Room</span>
                                    <div className={styles.optionCounter}>
                                        <button disabled={options.room <= 1} className={styles.optionCounterButton} onClick={() => handleOption("room", "d")}>-</button>
                                        <span className={styles.optionCounterNumber}>{options.room}</span>
                                        <button className={styles.optionCounterButton} onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className={styles.headerSearchItem}>
                            <button className={styles.headerBtn}
                                onClick={() => {
                                    setOpenDate(false);
                                    setOpenOptions(false);
                                    router.push({
                                        pathname: 'hotels',
                                        query: { desti: destination, startDate: format(dates[0].startDate, "MM/dd/yyyy"), endDate: format(dates[0].endDate, "MM/dd/yyyy"), optAdult: options.adult, optChildren: options.children, optRoom: options.room }
                                    });
                                }} >
                                Search
                            </button>
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    )
}