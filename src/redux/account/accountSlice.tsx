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
    language: ''
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
    setUserName: (state, action: PayloadAction<string>) => {
      state.info.name = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.metadata.language = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.info.email = action.payload;
    },
  },
});

export const { setAccountInfo, setSiteTheme, setMetadata, setUserName, setLanguage, setUserEmail } =
  accountSlice.actions;

export default accountSlice.reducer;
