import styles from "@/styles/components/Navbar.module.scss"
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useStore } from "@/context/StoreContext";
import { AuthContext } from "@/context/AuthContext";

export const NavbarAdmin = () => {
    const { setOpenDate, setOpenOptions }: any = useStore();
    const router = useRouter();
    const { user }: any = useContext(AuthContext);

    return (
        <div className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link href="/admin">
                    <a onClick={() => {
                        setOpenDate(false);
                        setOpenOptions(false);
                    }} className={`${styles.logo} ${styles.noselect}`}>TravelBooking | Admin</a>
                </Link>
                {user ?
                    <div>
                        {user.username}
                        <button className="btn btn-sm btn-danger ms-2" onClick={() => {
                            localStorage.removeItem("user");
                            router.reload();
                        }}>Logout</button>
                    </div>
                    : (
                        <div className={styles.navItems}>
                            <Link href="/auth/admin/login">
                                <a className={`${styles.navButton} btn btn-sm btn-light`}>Login</a>
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    )
}