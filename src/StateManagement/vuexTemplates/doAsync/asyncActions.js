import { doAsync } from "./index.js";

export function GetAllUsers() {
    return doAsync({
        url: `users`,
        errorMessage: 'Unable to fetch users',
        successMessage: 'Users are successfully fetched',
    })
}

export function AddUsers(data) {
    return doAsync({
        url: `users`,
        httpMethod: 'post',
        data,
        erroMessage: 'Unable to add user. Please try again later',
    })
}

export function DeleteUser(id) {
    return doAsync({
        url: `users/${id}`,
        httpMethod: 'delete',
        erroMessage: 'Unable to delete user. Please try again later',
    })
}

export function EditItem(data) {
    return doAsync({
        url: `users/${data.id}`,
        httpMethod: 'patch',
        data,
        erroMessage: 'Unable to update user. Please try again later',
    })
}
