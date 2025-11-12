import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
    children: React.ReactNode;
    animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scale' | 'slideUp';
    delay?: number;
    duration?: number;
    className?: string;
}

const ScrollAnimation = ({
    children,
    animation = 'fadeUp',
    delay = 0,
    duration = 0.8,
    className = ''
}: ScrollAnimationProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        margin: "-30px",
        amount: 0.2
    });

    const animations = {
        fadeUp: {
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 }
        },
        fadeLeft: {
            hidden: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0 }
        },
        fadeRight: {
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        slideUp: {
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={animations[animation]}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;

