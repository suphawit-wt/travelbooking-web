import styles from '@/styles/components/MailList.module.scss';

export const MailList = () => {
    return (
        <div className={styles.mail}>
            <h1 className={styles.mailTitle}>Save time, save money!</h1>
            <span className={styles.mailDesc}>Sign up and we&apos;ll send best deals to you</span>
            <div className={styles.mailInputContainer}>
                <input type="text" placeholder='Your Email' />
                <button className='btn btn-md btn-primary'>Subscribe</button>
            </div>
        </div>
    )
}