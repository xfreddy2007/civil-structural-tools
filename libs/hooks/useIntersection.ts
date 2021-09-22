import { type } from 'os';
import React, { useState, useEffect, useRef } from 'react';

// https://betterprogramming.pub/lazy-loading-images-with-intersection-observer-in-react-ad6135f1ca59

type IntersectionEntry = {
  isOnce: boolean;
  cb: (isIntersecting:boolean) => void;
}

const listenerCallbacks = new WeakMap<Element, IntersectionEntry>();

function handleIntersections (entries:IntersectionObserverEntry[]) {
  entries.forEach((entry:IntersectionObserverEntry) => {
    if (listenerCallbacks.has(entry.target)) {
      const item = listenerCallbacks.get(entry.target);
      if (item) {
        const { cb, isOnce } = item;
        const isEntry = entry.isIntersecting;
        cb(isEntry);
        if (isEntry && isOnce) {
          observer.unobserve(entry.target);
          listenerCallbacks.delete(entry.target);
        }
      }
    }
  });
};

let observer:IntersectionObserver;
function getIntersectionObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver !== 'function') {
    return null;
  }
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: [0.15],
    })
  }
  return observer;
}

type UseIntersection = [React.RefObject<HTMLElement>, boolean];

export default function useIntersection(isOnce = true):UseIntersection {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const { current } = ref;
    const observerInstance = getIntersectionObserver();
    const atInViewHandler = (isEntry:boolean) => setIsInView(isEntry);

    if (current && observerInstance) {
      listenerCallbacks.set(current, {
        isOnce,
        cb: atInViewHandler,
      });
      observerInstance.observe(current);
    }

    return () => {
      if (current && observerInstance) {
        listenerCallbacks.delete(current);
        observerInstance.unobserve(current);
      }
    };
  }, [isOnce]);

  return [
    ref,
    isInView,
  ];
}