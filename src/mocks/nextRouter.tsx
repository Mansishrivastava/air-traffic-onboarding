import React from 'react';

// Mock the useRouter hook
export const useRouter = () => ({
  push: (url: string) => console.log('Navigating to:', url),
  replace: (url: string) => console.log('Replacing with:', url),
  back: () => console.log('Going back'),
  forward: () => console.log('Going forward'),
  refresh: () => console.log('Refreshing'),
  prefetch: (url: string) => console.log('Prefetching:', url),
  pathname: '/competitors', // Add default pathname
});

// Mock the Next.js router provider
export const RouterDecorator = (Story: React.ComponentType) => {
  // Mock window.location for Storybook
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/competitors',
      },
      writable: true,
    });
  }

  return (
    <div>
      <Story />
    </div>
  );
}; 