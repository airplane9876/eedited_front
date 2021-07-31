// TODO: 투명한 사각형을 하나 올려서 거지같은 유튜브 로고도 없앨 수 있을거 같고, 클랙했을 때, 마우스 올라왔을 때 등등의 이벤트도 몰아서 처리하면 될거 같음. 그런데 이게 이미지에 이벤트 핸들링 하는거랑 다를게 있는가? 는 좀 생각해 볼 필요가 있음.

import React, {
    useRef, useState, useCallback,
    useEffect,
} from 'react';

import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Largevideo from '../../components/Video/Largevideo';

import { rootActionType, rootStateType } from '../../modules';
import { video } from '../../modules/Video/video';
import { videoSuccessType } from '../../modules/Video/videoType';

interface fromReducerType{
    Video: videoSuccessType|null
}
interface props extends RouteComponentProps{
    videoId: string
}

const LargeVideoContainer: React.FC<props> = ({ history, videoId }: props) => {
    const [isLoading, setisLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(true);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const dispatch: React.Dispatch<rootActionType> = useDispatch();
    const {
        Video,
    }: fromReducerType = useSelector(({ videoReducer }: rootStateType) => ({
        Video: videoReducer.video,
    }));
    useEffect(() => {
        dispatch((video(videoId))); // 쿼리 스트링으로 넘어와야함.
    }, [dispatch, Video, videoId]);
    const onLoad: (plyaer: ReactPlayer)=> void = (player: ReactPlayer) => {
        setisLoading(false);
    };
    return (
        <div>
            {// Video === null
                //   ? <div>error</div>
                //   : (
                <Largevideo
                    onLoad={onLoad}
                    thumbnailUrl="https://img.youtube.com/vi/Nh27WsNdymo/0.jpg"
                    videoUrl="https://www.youtube.com/watch?v=Nh27WsNdymo"
                    ref={youtubeRef}
                />
                // )
            }
        </div>
    );
};

export default withRouter(LargeVideoContainer);
