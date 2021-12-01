import { createSlice } from '@reduxjs/toolkit';
import { AccountInfo } from '../../common/types/account.types';

export interface AccountState {
  info: AccountInfo;
}

const initialState: AccountState = {
  info: {
    name: '',
    email: '',
    id: ''
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setAccountInfo } = accountSlice.actions;

export default accountSlice.reducer;
