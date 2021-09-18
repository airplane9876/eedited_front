import { AxiosResponse } from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import LikeButton from '../../components/video/LikeButton';
import { videoLike } from '../../api/video';

interface LikeResponse {
    success: VideoRouter.VideoLikeSuccessResponse | null
    failure: VideoRouter.VideoLikeFailureResponse | null
}
interface Props {
    video: VideoRouter.VideoSuccessResponse
}

const LikeButtonContainer: React.FC<Props> = ({ video }: Props) => {
    const [likeResponse, setLikeResponse]: [LikeResponse, React.Dispatch<React.SetStateAction<LikeResponse>>] = useState<LikeResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

    useEffect(() => {
        setToggle(false);
        if (video) {
            if (video.WhatVideoUpload) {
                if (video.WhatVideoUpload.length > 0) {
                    setToggle(true);
                }
            }
        }
    }, [video]);

    const onButtonClick: (VIDEOID: string) => Promise<void> = useCallback(async (VIDEOID: string) => {
        setLikeResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<VideoRouter.VideoLikeSuccessResponse> = await videoLike({ videoId: VIDEOID });
            setLikeResponse({ ...likeResponse, success: response });
            setToggle((prevState: boolean) => !prevState);
        }
        catch (err) {
            setLikeResponse({ ...likeResponse, failure: err.response.data });
        }
    }, [likeResponse]);

    return <LikeButton onButtonClick={() => onButtonClick(video.id)} toggle={toggle} />;
};

export default LikeButtonContainer;
