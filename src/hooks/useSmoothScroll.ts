
import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll function with easing
    const smoothScroll = (target: Element, duration: number) => {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      // Easing function for smooth deceleration (ease-out quad)
      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    // Handle hash navigation with custom smooth scroll
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Prevent default scroll behavior
          // Note: Window doesn't have preventDefault, removing this line
          
          // Custom smooth scroll with 1000ms duration for slowmo effect
          smoothScroll(element, 1000);
        }
      }
    };

    // Add event listeners
    window.addEventListener('hashchange', handleHashNavigation);
    window.addEventListener('load', handleHashNavigation);

    // Remove smooth scroll behavior when component unmounts
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('load', handleHashNavigation);
    };
  }, []);
};
