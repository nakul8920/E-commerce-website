import { createContext, useState } from 'react';

export const AppContext = createContext(null);

const ContextProvider = ({children}) => {

    const [ account, setAccount ] = useState('');
    const [ searchText, setSearchText ] = useState('');
    const [ selectedCategory, setSelectedCategory ] = useState('Top Offers');
    
    return (
        <AppContext.Provider value={{ 
            account, setAccount,
            searchText, setSearchText,
            selectedCategory, setSelectedCategory
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider;