import './DogItem.scss'
import { memo, useRef, useState, type FC } from 'react'
import play from '../../assets/img/play.png'
import { SaveButton } from '../../ui/SaveButton/SaveButton'

interface DogItemProps {
    dog: string
}

const HOST = 'http://localhost:4200/api/dog/'

const DogItemComponent: FC<DogItemProps> = ({ dog }) => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (isVideo && videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            videoRef.current.currentTime = 0;
        }
    };

    const isVideo = dog.toLowerCase().endsWith('.mp4') || dog.toLowerCase().endsWith('.webm')
    const isImage = dog.toLowerCase().endsWith('.jpg') || dog.toLowerCase().endsWith('.jpeg') || dog.toLowerCase().endsWith('.png') || dog.toLowerCase().endsWith('.gif');

    return (
        <article onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} className='dog'>
            {isVideo && (
                <div className="dog__video">
                    <video
                        className='dog__img'
                        ref={videoRef}
                        muted
                        loop
                    >
                        <source src={HOST + dog} type="video/mp4" />
                    </video>
                    <img style={{ display: isPlaying ? 'none' : 'block' }} className="dog__play" src={play} alt='play' />
                </div>
            )}
            {isImage && (
                <img className='dog__img' src={HOST + dog} alt={dog} />
            )}
            {isHovered && (
                <SaveButton dog={dog} />
            )}
        </article>
    )
}

export const DogItem = memo(DogItemComponent);