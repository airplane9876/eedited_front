import { AxiosResponse } from 'axios';
import client from './client';

type UserAPIFollowFunctionType = ({
    userId,
}: UserRouter.UserFollowRequest) => Promise<AxiosResponse<UserRouter.UserFollowResponse>>;
export const userFollow: UserAPIFollowFunctionType = ({
    userId,
}: UserRouter.UserFollowRequest) => client.patch(`/user/${userId}/follow`);

type MyPageFunctionType = ({
    userId,
}: UserRouter.MyPageRequest) => Promise<AxiosResponse<UserRouter.MyPageSuccessResponse>>;
export const myPage: MyPageFunctionType = ({
    userId,
}: UserRouter.MyPageRequest) => client.get(`/user/${userId}`);

type MyPageModifyFunctionType = ({ description }: UserRouter.MypageModifyRequest) => Promise<AxiosResponse<UserRouter.MypageModifySuccessResponse>>;
export const myPageModify: MyPageModifyFunctionType = ({
    description, nickname,
}: UserRouter.MypageModifyRequest) => client.patch('/user/change', {
    description, nickname,
});