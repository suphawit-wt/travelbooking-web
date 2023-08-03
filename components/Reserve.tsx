import styles from "@/styles/components/Reserve.module.scss"
import { useState } from "react"
import axios from "axios"
import { useRouterQuery } from "next-router-query"
import { useStore } from "@/context/StoreContext"
import useFetch from "@/utils/useFetch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

const Reserve = ({ setOpenBookModal }: any) => {
    const queryParams = useRouterQuery()
    const HotelId = queryParams.id as string
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`/api/hotels/roomsById/${HotelId}`)
    const { dates }: any = useStore();

    const getDatesInRange = (startDate: any, endDate: any) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let list = []

        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return list
    };

    const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

    const isAvaliable = (roomNumber: any) => {
        const isFound = roomNumber.unavaliableDates.some((date: any) =>
            allDates.includes(new Date(date).getTime())
        );

        return !isFound
    }

    const handleSelectRooms = (e: { target: { checked: any, value: any } }) => {
        const checked = e.target.checked as never;
        const value = e.target.value as never;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
    }

    const handleClickReserve = async () => {
        try {
            await Promise.all(
                selectedRooms.map(async (roomId) => {
                    const res = await axios.put(`/api/rooms/availability/${roomId}`, {
                        dates: allDates,
                    });
                    return res.data;
                })
            );
            setOpenBookModal(false)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(selectedRooms)

    return (
        <div className={styles.reserve}>
            <div className={styles.rContainer}>
                <FontAwesomeIcon icon={faCircleXmark} className={styles.rClose} onClick={() => {
                    setOpenBookModal(false)
                }} />
                <span>Select your rooms:</span>
                {data.map((item: any, i) =>
                (
                    <div className={styles.rItem} key={i}>
                        <div className={styles.rItemInfo}>
                            <div className={styles.rTitle}>{item.title}</div>
                            <div className={styles.rDesc}>{item.desc}</div>
                            <div className={styles.rMax}>
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className={styles.rPrice}>
                                ${item.price}
                            </div>
                        </div>
                        <div className={styles.rSelectRooms}>
                            {item.roomNumbers.map((roomNumber: any) => (
                                <div className={styles.room} key={roomNumber.number}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelectRooms}
                                        disabled={!isAvaliable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClickReserve} className={styles.rButton}>Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve;