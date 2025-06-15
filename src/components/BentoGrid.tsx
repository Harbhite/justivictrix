
import React from "react";

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  date: string;
  created_at: string;
}

interface BentoGridProps {
  images: GalleryImage[];
  onImageClick?: (img: GalleryImage, index: number) => void;
  user: any;
  onDelete?: (id: number, e: React.MouseEvent) => void;
}

const bentoPattern = [
  // A pattern for first 10 images: [columns, rows]
  { col: "col-span-2", row: "row-span-2" }, // big
  { col: "col-span-1", row: "row-span-1" }, // small
  { col: "col-span-1", row: "row-span-2" }, // tall
  { col: "col-span-2", row: "row-span-1" }, // wide
  { col: "col-span-1", row: "row-span-1" }, // small
  { col: "col-span-1", row: "row-span-2" }, // tall
  { col: "col-span-2", row: "row-span-1" }, // wide
  { col: "col-span-1", row: "row-span-1" }, // small
  { col: "col-span-1", row: "row-span-1" }, // small
  { col: "col-span-2", row: "row-span-2" }, // big
];

// fallback to regular grid if too many images
const getItemClass = (index: number) => {
  if (index < bentoPattern.length) {
    return `${bentoPattern[index].col} ${bentoPattern[index].row}`;
  }
  return "col-span-1 row-span-1";
};

export default function BentoGrid({
  images,
  onImageClick,
  user,
  onDelete,
}: BentoGridProps) {
  return (
    <div
      className="
        grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6
        auto-rows-[120px] sm:auto-rows-[150px] lg:auto-rows-[170px]
        gap-3 sm:gap-4 lg:gap-6"
      style={{}}
    >
      {images.map((img, i) => (
        <div
          key={img.id}
          className={`
            group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow 
            ${getItemClass(i)}
            transition-transform hover:scale-[1.03]
          `}
          onClick={() => onImageClick?.(img, i)}
        >
          <img
            src={img.image_url}
            alt={img.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div
            className="
              absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-80 transition-opacity duration-300
              flex items-end p-3"
          >
            <div>
              <div className="text-white font-semibold text-xs sm:text-sm line-clamp-2">
                {img.title}
              </div>
              <div className="text-gray-200 text-xs">
                {new Date(img.date).toLocaleDateString()}
              </div>
            </div>
          </div>
          {user && (
            <button
              className="absolute top-2 right-2 bg-white/90 text-red-600 rounded-full shadow p-1 opacity-0 group-hover:opacity-100 transition"
              onClick={e => {
                e.stopPropagation();
                onDelete?.(img.id, e);
              }}
              aria-label="Delete image"
              tabIndex={0}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 6h18M8 6v14c0 1 1 2 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
