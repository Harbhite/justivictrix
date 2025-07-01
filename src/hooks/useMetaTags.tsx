
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

export const useMetaTags = ({
  title = "LLB28 Hub - Law Student Portal",
  description = "A comprehensive portal for law students with resources, tools, and community features",
  image = "/og-image.png",
  type = "website",
  author,
  publishedTime,
  tags
}: UseMetaTagsProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = `${window.location.origin}${location.pathname}`;
    
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        if (isName) {
          tag.setAttribute('name', property);
        } else {
          tag.setAttribute('property', property);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Clean up previous article tags
    const existingArticleTags = document.querySelectorAll('meta[property^="article:"]');
    existingArticleTags.forEach(tag => tag.remove());

    // Update basic meta tags
    updateMetaTag('description', description, true);
    
    // Update Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image.startsWith('http') ? image : `${window.location.origin}${image}`);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'LLB28 Hub');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `${window.location.origin}${image}`, true);

    // Article-specific tags
    if (type === 'article') {
      if (author) {
        updateMetaTag('article:author', author);
      }
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime);
      }
      if (tags && tags.length > 0) {
        tags.forEach(tag => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    }
  }, [title, description, image, type, author, publishedTime, tags, location.pathname]);
};
