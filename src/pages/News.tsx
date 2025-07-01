
import React from 'react';
import { useMetaTags } from '@/hooks/useMetaTags';
import NewsBentoGrid, { NewsItem } from '@/components/NewsBentoGrid';

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Major Legal Reform Announced',
    snippet: 'A new bill passed today is set to change the landscape of corporate law. Experts are weighing in on the potential impacts.',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1497008386681-a7941f08014e?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-10-26',
    category: 'Legislation',
  },
  {
    id: '2',
    title: 'Upcoming Webinar: AI in Law',
    snippet: 'Join us next month for an exciting discussion on how artificial intelligence is transforming legal research and practice.',
    link: '#',
    date: '2023-10-25',
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Student Law Society Elections',
    snippet: 'Results are in for the new Student Law Society committee. Meet your new representatives!',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-10-24',
    category: 'University',
  },
  {
    id: '4',
    title: 'Moot Court Competition Highlights',
    snippet: "This year's moot court competition saw fierce debate and impressive performances. Read the highlights here.",
    link: '#',
    date: '2023-10-22',
    category: 'Competition',
  },
  {
    id: '5',
    title: 'New Library Resources Available',
    snippet: 'The law library has expanded its collection of online journals and databases. Explore the new resources today.',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1521737852577-6869f4a90341?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: '2023-10-20',
    category: 'Resources',
  }
];

const News = () => {
  useMetaTags({
    title: "Latest News & Updates - LLB28 Hub",
    description: "Stay updated with the latest legal news, reforms, webinars, and university updates relevant to law students.",
    image: "/og-image.png",
    type: "website"
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl md:text-4xl font-black text-law-dark mb-8 text-center"
      >
        Latest News & Updates
      </h1>
      <NewsBentoGrid newsItems={mockNewsData} />
    </div>
  );
};

export default News;
