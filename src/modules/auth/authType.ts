import {
    authFailureReturnProp, signupProp, loginProp, authSuccessReturnProp,
} from '../../lib/api/auth';
import {
    CHANGE_FIELD, INITIALIZE_FORM, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS,
} from './auth';

export type responseSuccessType = authSuccessReturnProp
export type responseFailureType = authFailureReturnProp&Error

export interface changeFieldActionType{
    type: typeof CHANGE_FIELD,
    payload: {
        form: 'signup' | 'login',
        key: string,
        value: string
    }
}
export interface initializeFormActionType{
    type: typeof INITIALIZE_FORM,
    payload: {
        form: 'signup' | 'login',
    }
}
export interface signupActionType{
    type: typeof SIGNUP,
    payload: signupProp;
}
export interface loginActionType{
    type: typeof LOGIN,
    payload: loginProp;
}
export interface responseSuccessActionType{
    type: typeof LOGIN_SUCCESS|typeof SIGNUP_SUCCESS
    payload: responseSuccessType|null
}
export interface responseFailureActionType{
    type: typeof LOGIN_FAILURE|typeof SIGNUP_FAILURE
    payload: responseFailureType|null
}

export type authActionType =
    |initializeFormActionType
    |changeFieldActionType
    |signupActionType
    |loginActionType
    |responseSuccessActionType
    |responseFailureActionType

export interface signupFormType{
    [key: string]: string
    userId: string,
    password: string,
    passwordConfirm: string,
    email: string
    nickname: string
}
export interface loginFormType{
    [key: string]: string
    userId: string,
    password: string
}
export interface authStateType{
    signup: signupFormType,
    login: loginFormType
    auth?: responseSuccessType|null
    authError?: responseFailureType|null
}
