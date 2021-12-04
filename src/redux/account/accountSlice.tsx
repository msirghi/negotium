import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountInfo, AccountMetadata } from '../../common/types/account.types';

export interface AccountState {
  info: AccountInfo;
  metadata: AccountMetadata;
}

const initialState: AccountState = {
  info: {
    name: '',
    email: '',
    id: '',
  },
  metadata: {
    theme: '',
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.info = action.payload;
    },
    setSiteTheme: (state, action: PayloadAction<string>) => {
      state.metadata.theme = action.payload;
    },
    setMetadata: (state, action: PayloadAction<AccountMetadata>) => {
      state.metadata = action.payload;
    },
  },
});

export const { setAccountInfo, setSiteTheme, setMetadata } =
  accountSlice.actions;

export default accountSlice.reducer;