import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../redux/auth/auth';

interface formReduceType{
    form: authRouter.singupRequest&{passwordConfirm: string}
    Auth?: authRouter.authSuccessResponse|null
    AuthError?: authModule.authFailureResponse|null
}
interface props{
    history: RouteComponentProps['history']
}
const SignupForm: React.FC<props> = ({ history }: props) => {
    const { changeField, signup, intializeForm }: authModule.ActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError,
    }: formReduceType = useAppSelector(((state: selectorStateType) => ({
        form: state.authReducer.signup,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
    })));
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'signup',
                key: name,
                value,
            }),
        );
    };
    const ValidateEmail: (main: string) => boolean = (mail: string) => {
        const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(mail).toLowerCase())) {
            return true;
        }
        return false;
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            userId, password, passwordConfirm, email, nickname,
        }: {userId: string, password: string, passwordConfirm: string, email: string, nickname: string} = form;
        if ([userId, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({
                form: 'signup',
                key: 'password',
                value: '',
            }));
            dispatch(changeField({
                form: 'signup',
                key: 'passwordConfirm',
                value: '',
            }));
            return;
        }
        if (!ValidateEmail(email)) {
            setError('올바른 형식의 이메일이 아닙니다');
            return;
        }
        dispatch(signup({
            userId,
            password,
            email,
            nickname,
        }));
    };
    useEffect(() => () => {
        dispatch(intializeForm());
    }, [dispatch, intializeForm]);
    useEffect(() => {
        if (AuthError) {
            setError(`회원가입 실패 ${AuthError.info}`);
        }
        if (Auth) {
            history.push('/login');
        }
    }, [Auth, AuthError, history]);
    return (
        <AuthForm
            type="signup"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(SignupForm);
