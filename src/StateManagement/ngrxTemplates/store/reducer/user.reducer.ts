import {Action, createReducer, on} from '@ngrx/store';
import * as userActions from '../action/user.actions';
import { User } from '../User';

export const userFeatureKey = 'user';
export interface userState {
  users: User[];
}
export const initialState: userState = {
  users: []
};
export const userReducer =createReducer(
  initialState,
  on(userActions.addUser ,
    (state, action) =>{
    let user = {...action.user};
    return  {...state,users: [...state.users, user]};
  }),

  on(userActions.updateUser ,
    (state, action) =>{
      const newUser = state.users.map(user=>{
          return action.user.id === user.id ? action.user:user
      });
    return  {...state, users:newUser };
  }),
    
  on(userActions.deleteUser ,
    (state, action) =>{
      const newUser = state.users.filter(user=>{
        return user.id !== action.id 
      });
    return  {...state, users:newUser };
  }), 
);
export function reducer(state: userState | undefined, action: Action): any {
  return userReducer(state, action);
}
