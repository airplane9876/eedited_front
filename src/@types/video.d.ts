import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    interface Tag {
        name: string;
    }

    interface VideoTags {
        videoTag: Tag[];
    }

    interface Video {
        id: string;
        uploader: string;
        title: string;
        discription: string;
        url: string;
        thumbnail: string;
        likeCnt: number;
        viewCnt: number;
        createdAt: Date;
        updatedAt: Date;
        deleted: Date | null;
        User: {
            nickname: string;
            followTo?: {
                followerId: string;
            }[];
        };
        WhatVideoUpload?: {
            liker: string;
        }[];
    }

    interface VideoUpload {
        title: string;
        discription: string;
        url: string;
        thumbnail: string;
        tags: string[];
    }

    namespace VideoRouter {
        interface VideoRequest {
            videoId: string;
        }

        type VideoSuccessResponse = Video & {
            WhatVideoUploadTag: { tagName: string }[];
        };

        interface VideoFailureResponse {
            info: string;
        }

        interface VideoListRequest {
            criteria: string;
            page: number;
        }

        interface VideoListSuccessResponse {
            videos: Video[];
        }

        interface VideoListFailureResponse {
            info: string;
        }

        type VideoUploadRequest = VideoUpload;

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface VideoUploadSuccessResponse {}

        interface VideoUploadFailureResponse {
            info: string;
        }

        interface UserVideoRequest {
            uploader: string;
        }

        interface UserVideoSuccessResponse {
            videos: Video[];
        }

        interface UserVideoFailureResponse {
            info: string;
        }

        interface VideoLikeRequest {
            videoId: string;
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface VideoLikeSuccessResponse {}

        interface VideoLikeFailureResponse {
            info: string;
        }

        interface VideoModifyRequest {
            id: string;
            title: string;
            discription: string;
            url: string;
            thumbnail: string;
            tags: string[];
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface VideoModifySuccessResponse {}

        interface VideoModifyFailureResponse {
            info: string;
        }
    }

    namespace RDXVideoModule {
        interface VideoFailureResponse
            extends VideoRouter.VideoFailureResponse {
            error: Error;
        }
        interface VideoListFailureResponse
            extends VideoRouter.VideoListFailureResponse {
            error: Error;
        }
        interface VideoUploadFailureResponse
            extends VideoRouter.VideoUploadFailureResponse {
            error: Error;
        }
        interface UserVideoFailureResponse
            extends VideoRouter.UserVideoFailureResponse {
            error: Error;
        }
        interface VideoModifyFailureResponse
            extends VideoRouter.VideoModifyFailureResponse {
            error: Error;
        }

        export interface StateType {
            video: VideoRouter.VideoSuccessResponse | null;
            videoList: VideoRouter.VideoListSuccessResponse | null;
            endVideoList: boolean;
            videoUserUpload: VideoRouter.UserVideoSuccessResponse | null;
            videoUploadSuccess: VideoRouter.VideoUploadSuccessResponse | null;
            videoModifySuccess: VideoRouter.VideoModifySuccessResponse | null;
            getVideoError: VideoFailureResponse | null;
            videoUploadError: VideoUploadFailureResponse | null;
            videoUserUploadError: UserVideoFailureResponse | null;
            videoModifyError: VideoModifyFailureResponse | null;
        }

        export type ActionType = CaseReducerActions<{
            videoClear(state: WritableDraft<StateType>): void;
            video(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoRequest>,
            ): void;
            videoSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoSuccessResponse>,
            ): void;
            videoFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<RDXVideoModule.VideoFailureResponse>,
            ): void;
            videoList(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoListRequest>,
            ): void;
            videoListSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoListSuccessResponse>,
            ): void;
            videoListFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<RDXVideoModule.VideoListFailureResponse>,
            ): void;
            videoUpload(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoUploadRequest>,
            ): void;
            videoUploadSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoUploadSuccessResponse>,
            ): void;
            videoUploadFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<RDXVideoModule.VideoUploadFailureResponse>,
            ): void;
            videoUserUploaded(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.UserVideoRequest>,
            ): void;
            videoUserUploadedSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.UserVideoSuccessResponse>,
            ): void;
            videoUserUploadedFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<RDXVideoModule.UserVideoFailureResponse>,
            ): void;
            videoModify(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoModifyRequest>,
            ): void;
            videoModifySuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoRouter.VideoModifySuccessResponse>,
            ): void;
            videoModifyFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<VideoModifyFailureResponse>,
            ): void;
        }>;
    }
}
