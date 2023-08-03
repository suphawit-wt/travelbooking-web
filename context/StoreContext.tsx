import { createContext, useContext, useState } from "react";
import { dateType, optionsType } from "@/utils/typed";

type storeContextType = {
    destination: string;
};

const storeContextDefaultValues: storeContextType = {
    destination: "",
};

const StoreContext = createContext<storeContextType>(storeContextDefaultValues);

export function useStore() {
    return useContext(StoreContext);
}

type Props = {
    children: React.ReactNode;
};

export function StoreProvider({ children }: Props) {
    const [destination, setDestination] = useState("");

    const [dates, setDates] = useState<dateType[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }]
    );

    const [options, setOptions] = useState<optionsType>({
        adult: 1,
        children: 0,
        room: 1
    });

    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const value = {
        destination, setDestination,
        dates, setDates,
        options, setOptions,
        openDate, setOpenDate,
        openOptions, setOpenOptions,
        min, setMin,
        max, setMax,
    };

    return (
        <>
            <StoreContext.Provider value={value}>
                {children}
            </StoreContext.Provider>
        </>
    );
}