import React from 'react';

export interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  link: string;
  imageUrl?: string;
  date: string;
  category?: string;
  // Potentially add fields for column/row span if we want item-specific sizing
  // colSpan?: string;
  // rowSpan?: string;
}

interface NewsBentoGridProps {
  newsItems: NewsItem[];
  // onItemClick?: (item: NewsItem) => void; // Optional click handler
}

const bentoPattern = [
  // A pattern for first 10 items: [columns, rows]
  // Adjust as needed for news, e.g., more text-heavy items might need more row span
  { col: "col-span-2", row: "row-span-2" }, // Primary story
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-1" },
  { col: "col-span-1", row: "row-span-2" }, // Taller item
  { col: "col-span-2", row: "row-span-1" }, // Wider item
  // ... more patterns or a default
];

const getItemClass = (index: number /*, item: NewsItem */) => {
  // Optional: if item itself defines sizing, use that.
  // if (item.colSpan && item.rowSpan) return `${item.colSpan} ${item.rowSpan}`;
  if (index < bentoPattern.length) {
    return `${bentoPattern[index].col} ${bentoPattern[index].row}`;
  }
  return "col-span-1 row-span-1"; // Default for items beyond the pattern
};

const NewsBentoGrid: React.FC<NewsBentoGridProps> = ({ newsItems }) => {
  if (!newsItems || newsItems.length === 0) {
    return <p>No news items to display.</p>;
  }

  return (
    <div
      className="
        grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
        auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[200px]
        gap-4"
    >
      {newsItems.map((item, i) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank" // Open in new tab
          rel="noopener noreferrer"
          className={`
            group relative overflow-hidden rounded-xl shadow-lg bg-white
            ${getItemClass(i /*, item */)}
            transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]
            flex flex-col p-4
          `}
        >
          {item.imageUrl && (
            <div className="w-full h-1/2 mb-2 overflow-hidden rounded-md">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          )}
          <div className={`flex-grow flex flex-col ${item.imageUrl ? 'h-1/2' : 'h-full'}`}>
            <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 flex-grow line-clamp-3">
              {item.snippet}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
              <span>{new Date(item.date).toLocaleDateString()}</span>
              {item.category && <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">{item.category}</span>}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default NewsBentoGrid;
