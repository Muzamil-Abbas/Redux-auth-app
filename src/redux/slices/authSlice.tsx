import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the user interface
interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}

// Define the initial state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Fetch user credentials with a thunk
export const authenticateUser = createAsyncThunk<
  User,
  { username: string; password: string; isSignUp?: boolean },
  { rejectValue: string }
>(
  "auth/authenticateUser",
  async ({ username, password, isSignUp = false }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || (isSignUp ? "Failed to sign up" : "Failed to sign in")
        );
      }

      const data: User = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Sign out thunk
export const signOut = createAsyncThunk<void>("auth/signOut", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  return;
});

// Fetch current user thunk
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return rejectWithValue("No token found");
  }

  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Refresh token thunk
export const refreshToken = createAsyncThunk<
  { token: string; refreshToken: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return rejectWithValue("No refresh token found");
  }

  try {
    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Define initial state
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        authenticateUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        refreshToken.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; refreshToken: string }>
        ) => {
          state.user = {
            ...state.user!,
            token: action.payload.token,
          };
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
