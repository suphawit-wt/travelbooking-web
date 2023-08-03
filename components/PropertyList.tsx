import styles from '@/styles/components/PropertyList.module.scss';
import useFetch from '@/utils/useFetch';
import Image from 'next/image';

export const PropertyList = () => {
    const { data, loading, error } = useFetch("/api/hotels/countByType") as any;

    const images = [
        "https://images.pexels.com/photos/5007553/pexels-photo-5007553.jpeg",
        "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
        "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
        "https://images.pexels.com/photos/290518/pexels-photo-290518.jpeg"
    ];

    return (
        <div className={styles.pList}>
            {loading ? ("loading") : (<>
                {data && images.map((img, i) => (
                    <div className={styles.pListItem} key={i}>
                        <div className={styles.pListImg}>
                            <Image src={img}
                                alt=""
                                layout='fill'
                            />
                        </div>
                        <div className={styles.pListTitles}>
                            <h1>{data[i]?.type}</h1>
                            <h2>{data[i]?.count} {data[i]?.type}</h2>
                        </div>
                    </div>
                ))}
            </>)}
        </div>
    )
}