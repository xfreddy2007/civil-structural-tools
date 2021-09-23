/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import useIntersection from '@/libs/hooks/useIntersection';
import { cx } from '@emotion/css';
import isSupportWebp from '@/libs/utils/isSupportWebp';

export type PureImageProps = JSX.IntrinsicElements['img'] & {
  className?: string;
  onImageLoaded?: () => void;
  webp?: string;
};

const PureImage: React.FC<PureImageProps> = (props) => {
  const {
    className = '',
    src,
    alt,
    onImageLoaded,
    webp,
    ...rest
  } = props;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imgAttriables, setImageAttriables] = useState({});
  const [ref, isInView] = useIntersection();

  useEffect(() => {
    if (isInView) {
      if (webp) {
        isSupportWebp().then((isWebp) => {
          setImageAttriables({
            src: isWebp ? webp : src,
          });
        });
      } else {
        setImageAttriables({src});
      }
    }
  }, [isInView, src, webp]);

  const atLoaded = useCallback(() => {
    setIsImageLoaded(true);
    onImageLoaded?.();
  }, [onImageLoaded]);

  return (
    <img
      // @ts-ignore
      ref={ref}
      className={cx(className, isImageLoaded && 'is-image-loaded')}
      onLoad={atLoaded}
      alt={alt}
      {...rest}
      {...imgAttriables}
    />
  );
};

export default React.memo(PureImage);
