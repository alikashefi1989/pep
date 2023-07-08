export interface DataOfStore {
    darkMode: boolean;
};

export interface ActionOfStore {
    setDarkMode: (darkMode: boolean) => void;
};

export type Store = DataOfStore & ActionOfStore;