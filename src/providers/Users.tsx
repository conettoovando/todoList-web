import { createContext, useState } from 'react';

type Props = {
    children: React.ReactNode
}
const UserContext = createContext({} as { isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> })

export function UserProvider({ children }: Props) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext };
