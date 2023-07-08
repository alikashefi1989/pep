// module
import { create } from "zustand";
import { persist } from "zustand/middleware";
// custom
import { Store } from "../models/store";

const persistedStoreName = 'app-golbal-store'

const useStore = create<Store, any>(
    persist((set, _) =>
    ({
        darkMode: false,
        setDarkMode: (darkMode: Store['darkMode']) => {
            set({ darkMode });
        },
    }),
        {
            name: persistedStoreName,
            getStorage: () => localStorage,
        }
    )
);

export default useStore;