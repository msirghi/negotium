import { RootState } from '../store';

export const notificationsEnabledSelector = (state: RootState) => state.account.notificationsEnabled;
