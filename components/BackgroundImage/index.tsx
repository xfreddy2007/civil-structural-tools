import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cx } from '@emotion/css';
import useIntersection from '@/libs/hooks/useIntersection';
import isSupportWebp from '@/libs/utils/isSupportWebp';

type DivElementStyle = NonNullable<JSX.IntrinsicElements['div']['style']>;

export type BackgroundImageProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ComponentType | string;
  src: string;
  webp?: string;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
  backgroundSize?: DivElementStyle['backgroundSize'];
  backgroundPosition?: DivElementStyle['backgroundPosition'];
  backgroundRepeat?: DivElementStyle['backgroundRepeat'];
  onImageLoaded?: () => void;
}

const BackgroundImage:React.FC<BackgroundImageProps> = (props) => {
  const {
    as: Component = 'div',
    src,
    webp,
    className,
    children,
    backgroundSize,
    backgroundRepeat,
    backgroundPosition,
    onImageLoaded,
    ...rest
  } = props;

  const [ref, isInView] = useIntersection();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageLoadedRef = useRef(onImageLoaded);
  imageLoadedRef.current = onImageLoaded;
  const [img] = useState(() => {
    // if (!process.browser) {
    //   return null;
    // }
    const i = new Image();
    i.onload = () => {
      setIsImageLoaded(true);
      i.onload = null;
      imageLoadedRef.current?.();
    };
    return i;
  });

  useEffect(() => {
    if (!src || !img) return;
    if (isInView) {
      if (webp) {
        isSupportWebp().then((isWebp) => {
          img.src = isWebp ? webp : src;
        });
      } else {
        img.src = src;
      }
    }
  }, [img, isInView, src, webp]);

  const containerStyle = useMemo(() => {
    if (isInView && isImageLoaded && img) {
      return {
        backgroundImage: `url(${img.src})`,
        backgroundSize,
        backgroundRepeat,
        backgroundPosition,
      };
    }
    return {};
  }, [backgroundPosition, backgroundRepeat, backgroundSize, img, isImageLoaded, isInView]);

  return (
    <Component
      // @ts-ignore
      ref={ref}
      className={cx(className, isImageLoaded && 'is-image-loaded')}
      data-component="BackgroundImage"
      style={containerStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default React.memo(BackgroundImage);
