import styles from '@/styles/components/Featured.module.scss';
import useFetch from '@/utils/useFetch';
import Image from 'next/image';

export const Featured = () => {
    const { data, loading } = useFetch("/api/hotels/countByCity?cities=berlin,madrid,london")

    const img1 = "https://images.pexels.com/photos/3566191/pexels-photo-3566191.jpeg";
    const img2 = "https://images.pexels.com/photos/5281394/pexels-photo-5281394.jpeg";
    const img3 = "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg";

    return (
        <div className={styles.featured}>
            {loading ? "Loading please wait" : <>
                <div className={styles.featuredItem}>
                    <div className={styles.featuredImg}>
                        <Image src={img1}
                            alt=""
                            layout='fill'
                        />
                    </div>
                    <div className={styles.featuredTitles}>
                        <h1>Berlin</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>
                <div className={styles.featuredItem}>
                    <div className={styles.featuredImg}>
                        <Image src={img2}
                            alt=""
                            layout='fill'
                        />
                    </div>
                    <div className={styles.featuredTitles}>
                        <h1>Madrid</h1>
                        <h2>{data[1]} properties</h2>
                    </div>
                </div>
                <div className={styles.featuredItem}>
                    <div className={styles.featuredImg}>
                        <Image src={img3}
                            alt=""
                            layout='fill'
                        />
                    </div>
                    <div className={styles.featuredTitles}>
                        <h1>London</h1>
                        <h2>{data[2]} properties</h2>
                    </div>
                </div>
            </>}
        </div>
    )
}