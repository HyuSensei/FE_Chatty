import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, removeData, setData } from "../../helpers/localStorage";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const initialState = {
  loading: false,
  isAuthenticated: false,
  _id: "",
  name: "",
  email: "",
  profileImage: "",
  gender: "",
  onlineUsers: [],
  isNightMode: getData("isNightMode") || false,
};

export const getDataUser = createAsyncThunk("user/getUser", async () => {
  try {
    const token = getData("token");
    let res = null;
    if (token) {
      res = await axios.get(API_URL + `/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return res.data;
  } catch (error) {
    console.log("Login chatty require");
  }
});

export const userSlice = createSlice({
  name: "chat/user",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setUser(state, action) {
      state.name = action.payload.name;
      state.profileImage = action.payload.profileImage;
      state.gender = action.payload.gender;
    },
    logout(state, action) {
      removeData("token");
      state._id = "";
      state.name = "";
      state.email = "";
      state.profileImage = "";
      state.gender = "";
      state.isAuthenticated = false;
      (state.isNightMode = false), removeData("isNightMode");
    },
    setNightMode(state, action) {
      state.isNightMode = action.payload;
      if (action.payload) {
        setData("isNightMode", action.payload);
      } else {
        removeData("isNightMode");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataUser.pending, (state, action) => {
        state.loading = true;
        state._id = "";
        state.name = "";
        state.email = "";
        state.profileImage = "";
        state.gender = "";
        state.isAuthenticated = false;
      })
      .addCase(getDataUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          state._id = action.payload.data._id;
          state.name = action.payload.data.name;
          state.email = action.payload.data.email;
          state.profileImage = action.payload.data.profileImage;
          state.gender = action.payload.data.gender;
          state.isAuthenticated = true;
        }
      })
      .addCase(getDataUser.rejected, (state, action) => {
        state.loading = false;
        state._id = "";
        state.name = "";
        state.email = "";
        state.profileImage = "";
        state.gender = "";
        state.isAuthenticated = false;
      });
  },
});

export const { setOnlineUsers, logout, setNightMode, setUser } =
  userSlice.actions;

export default userSlice.reducer;
