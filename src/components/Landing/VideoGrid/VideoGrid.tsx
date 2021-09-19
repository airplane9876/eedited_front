import React from 'react';
import VideoContainer from '../../../containers/landing/VideoContainer';
import VideoDescription1 from './videoDescription/VideoDescription1';
import './VideoGrid.scss';

type VideoInfo = Video
interface Props {
    videoInfos: Video[] | null
}

const VideoGrid: React.FC<Props> = ({ videoInfos }: Props) => (
    <div className="videoGrid">
        {
            videoInfos === null
                ? <div>loading</div>
                : videoInfos.map((video: VideoInfo, idx: number) => (
                    <div key={video.id}>
                        <VideoContainer videoInfo={video} />
                        <VideoDescription1 videoInfo={video} />
                    </div>
                ))
        }
    </div>
);

export default VideoGrid;
