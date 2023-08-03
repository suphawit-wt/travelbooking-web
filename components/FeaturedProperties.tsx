import styles from '@/styles/components/FeaturedProperties.module.scss';
import useFetch from '@/utils/useFetch';
import Image from 'next/image';

export const FeaturedProperties = () => {
    const { data, loading } = useFetch("/api/hotels?featured=true&limit=4") as any;

    return (
        <div className={styles.fp}>
            {loading ? "Loading" : <>
                {data.map((item: any) => (
                    <div className={styles.fpItem} key={item._id}>
                        <div className={styles.fpImg}>
                            <Image src={item.photos[0]}
                                alt=""
                                layout='fill'
                            />
                        </div>
                        <span className={styles.fpName}>{item.name}</span>
                        <span className={styles.fpCity}>{item.city}</span>
                        <span className={styles.fpPrice}>Starting from ${item.cheapestPrice}</span>
                        {item.rating &&
                            <div className={styles.fpRating}>
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>
                        }
                    </div>
                ))
                }
            </>}
        </div>
    )
}