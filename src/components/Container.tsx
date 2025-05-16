import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    width?: string;
}

const Container: React.FC<ContainerProps> = ({ children, width="max-w-7xl" }) => {
    return (
        <div className={`container mx-auto ${width} xl:max-w-[90%] px-6 flex-grow`}>
            {children}
        </div>
    );
};

export default Container;
