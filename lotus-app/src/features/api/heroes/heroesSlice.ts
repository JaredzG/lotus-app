import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [] as number[],
  entities: [] as any[],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchHeroes(state, action) {
      action.payload.forEach((hero: any, idx: number) => {
        state.ids.push(idx + 1);
        state.entities.push({
          hero,
          enabled: true,
        });
      });
    },
  },
});

export default usersSlice.reducer;
