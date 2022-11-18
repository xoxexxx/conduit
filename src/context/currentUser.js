import { createContext, useState } from "react";

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserProvider = ({ children }) => {
    const [state, setState] = useState({
        isLoading: false,
        isLoggedIn: false,
        currentUser: null,
        tags: null,
        isError: null,
        method: null
    })
  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  );
};
