import { useState, useEffect, type RefObject } from 'react';
/**
 * Check if an element is in the viewport of a container
 * @param ref the element we want to observe
 * @param containerRef the container we want to observe the element in (needs to be the first scrollable parent)
 * @param options the options for the intersection observer
 * - threshold is used to configure how much of the element needs to be visible before the callback is invoked
 * - rootMargin is used to configure the margin around the root (container) where the intersection observer will trigger
 * @returns a boolean indicating if the element is in the viewport
 */
const useElementInView = <T extends HTMLElement>(
  ref?: RefObject<T>,
  containerRef?: RefObject<HTMLElement>,
  options: IntersectionObserverInit = {
    threshold: 1,
    rootMargin: `0px`,
  }
): boolean => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref?.current;
    const root = containerRef?.current || null;

    if (!currentRef) {
      // If the user implementing ui-manchette doesn't provide a ref to handle the menu visibility,
      // the menu should always be visible
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        ...options,
        root,
      }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [ref, containerRef, options]);

  return isInView;
};

export default useElementInView;
