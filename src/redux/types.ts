import { store } from "./store"; // Import default export correctly

// Define types based on the Redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
