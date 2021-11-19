import {Action, createReducer, on} from '@ngrx/store';

import * as userActions from '../action/user.actions';

import { User } from 'src/app/module/user';

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
    user.id = (state.users.length+1).toString();

    return  {...state,

        users: [...state.users, user]
    };
      }),

      on(userActions.updateUser ,

        (state, action) =>{
          console.log('Action.User',action.user)
          const newUser = state.users.map(user=>{
             return action.user.id === user.id ? action.user:user
          });
          console.log('action.user.id',action.user.id)
          console.log('NewUser',newUser)
        return  {...state,
         
            users:newUser
            
        };
          }),
    
          on(userActions.deleteUser ,

            (state, action) =>{
              console.log('Action.id',action.id)
              const newUser = state.users.filter(user=>{
                return user.id !== action.id 
              });
              console.log('action.ID',action.id)
              console.log('NewUser',newUser)
            return  {...state,
             
                users:newUser
                
            };
              }), 
      
  

);


export function reducer(state: userState | undefined, action: Action): any {
  return userReducer(state, action);
}