import ReactPlayer from 'react-player';
import './video.css'; // Import your CSS file

const VideoBackground = () => {
    const videoUrl = 'https://www.youtube.com/watch?v=Y0iWiZnUNJs'; // Replace with the YouTube video URL

    return (
        <div className="video-background">
            <ReactPlayer
                url={videoUrl}
                playing
                loop
                controls={false}
                muted
                width="100%"
                height="100%"
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            loop: 1,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                            fs: 0,
                            vq: 'hd1080', // Set the quality to 1080p
                        },
                    },
                }}
            />
        </div>
    );
};

export default VideoBackground;
