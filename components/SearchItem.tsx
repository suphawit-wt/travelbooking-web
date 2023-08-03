import styles from '@/styles/components/SearchItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const SearchItem = ({ item }: any) => {
    return (
        <div className={styles.searchItem}>
            <div className={styles.siImg}>
                <Image src={item.photos[0]}
                    alt=""
                    layout='fill' />
            </div>
            <div className={styles.siDesc}>
                <div className={styles.siTitle}>{item.name}</div>
                <span className={styles.siDistance}>{item.distance}m from center</span>
                <span className={styles.siTaxiOp}>Free airport taxi</span>
                <span className={styles.siSubtitle}>
                    Studio Apartment with Air conditioning
                </span>
                <span className={styles.siFeatures}>
                    {item.desc}
                </span>
                <span className={styles.siCancelOp}>Free cancellation</span>
                <span className={styles.siCancelOpSubtitle}>
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className={styles.siDetails}>
                {item.rating &&
                    <div className={styles.siRating}>
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>
                }
                <div className={styles.siDetailTexts}>
                    <span className={styles.siPrice}>${item.cheapestPrice}</span>
                    <span className={styles.siTaxOp}>Includes taxes and fees</span>
                    <Link href={`/hotels/${item._id}`}>
                        <button className={styles.siCheckButton}>See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem;