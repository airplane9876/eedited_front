import { AxiosResponse } from 'axios';
import client from './client';

type VideoAPIFunctionType = ({ videoId }: VideoRouter.VideoRequest) => Promise<AxiosResponse<VideoRouter.VideoSuccessResponse>>;
export const video: VideoAPIFunctionType = ({ videoId }: VideoRouter.VideoRequest) => client.get(`/video/${videoId}`);

type videoListAPIFunctionType = ({ category, platform, program, sorting, page }: VideoRouter.VideoListRequest) => Promise<AxiosResponse<VideoRouter.VideoListSuccessResponse>>
export const videoList: videoListAPIFunctionType = ({ category, platform, program, sorting, page }: VideoRouter.VideoListRequest) => client.get(`/video/sort/${sorting}/?page=${page}`);

type VideoAPIUploadFunctionType = ({
    title, description, url, thumbnail, tags,
}: VideoRouter.VideoUploadRequest) => Promise<AxiosResponse<VideoRouter.VideoUploadSuccessResponse>>
export const videoUpload: VideoAPIUploadFunctionType = ({
    title, description, url, thumbnail, tags,
}: VideoRouter.VideoUploadRequest) => client.post('/video/upload', {
    title, description, url, thumbnail, tags,
});

type VideoAPIModifyFunctionType = ({
    id, title, description, url, thumbnail, tags,
}: VideoRouter.VideoModifyRequest) => Promise<AxiosResponse<VideoRouter.VideoModifySuccessResponse>>
export const videoModify: VideoAPIModifyFunctionType = ({
    id, title, description, url, thumbnail, tags,
}: VideoRouter.VideoModifyRequest) => client.patch('/video/upload', {
    id, title, description, url, thumbnail, tags,
});

type VideoAPIUserFunctionType = ({ uploader }: VideoRouter.UserVideoRequest) => Promise<AxiosResponse<VideoRouter.UserVideoSuccessResponse>>
export const videoUser: VideoAPIUserFunctionType = ({ uploader }: VideoRouter.UserVideoRequest) => client.get(`/video/${uploader}/list/?page=1`);

type VideoAPILikeFunctionType = ({ videoId }: VideoRouter.VideoLikeRequest) => Promise<AxiosResponse<VideoRouter.VideoLikeSuccessResponse>>
export const videoLike: VideoAPILikeFunctionType = ({ videoId }: VideoRouter.VideoLikeRequest) => client.patch(`/video/${videoId}/like`);
