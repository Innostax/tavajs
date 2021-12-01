import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromuser from '../reducer/user.reducer';

export const selectuserState = createFeatureSelector<fromuser.userState>(
  fromuser.userFeatureKey,
);

export const selectusers = createSelector(
  selectuserState,
  (state: fromuser.userState) => state.users
);
