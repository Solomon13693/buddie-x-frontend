import { useState, useRef, ChangeEvent } from 'react'
import { Spinner } from '@heroui/react';

interface ProfileImageProps {
    initialImage?: string;
    onImageUpload?: (file: File) => void;
    loading?: boolean;
}

export default function ProfileImage({ initialImage, onImageUpload, loading }: ProfileImageProps) {

    const [isHovered, setIsHovered] = useState(false);
    const [image, setImage] = useState(initialImage);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            onImageUpload?.(file);
        }
    };

    const handleChangeClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative transition-all duration-300 aspect-square size-20 rounded-full flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden">
                <img
                    width={500}
                    height={500}
                    src={image}
                    alt="Profile picture"
                    className="object-cover w-full h-full"
                />
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full z-50">
                    <Spinner color="white" />
                </div>
            )}

            {!loading && isHovered && (
                <button onClick={handleChangeClick} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white hover:bg-opacity-80 text-xs transition-colors rounded-full z-30"
                    aria-label="Change profile picture">
                    Change Profile
                </button>
            )}

            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" aria-label="Upload new profile picture" />

        </div>
    );
}
