//import statements
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { SelectOption } from '../Types/types';
import { fetchOptions } from '../Sever-api/api';

// Define the shape of the context
type OptionsContextType = {
    options: SelectOption[];
    setOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>;
    error: string;
}

// Create the context with default values
export const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

// Create the provider component
export const OptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [error , setError] = useState("");

    useEffect(() => {
        const getOptions = async () => {
            try {
                const fetchedOptions = await fetchOptions();
                setOptions([...fetchedOptions]);
            } catch (err) {
                console.error('Failed to fetch options', err);
                setError("Error while Fetching data");
            }
        };

        getOptions();
    }, []);

    const value = { options, setOptions, error };

    return <OptionsContext.Provider value={value}>
        {children}
    </OptionsContext.Provider>;
};
//using context
export const useOptionsContext = () => {
    const context = useContext(OptionsContext);
    if (context === undefined) {
        throw new Error("useOptionsContext must be used within a OptionsContextProvider");
    }
    return context;
}
