import { useState, useRef, useEffect, ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
  maxPull?: number;
}

const PullToRefresh = ({ 
  onRefresh, 
  children, 
  threshold = 80, 
  maxPull = 120 
}: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startTouch: Touch | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0 && !isRefreshing) {
        startTouch = e.touches[0];
        startY.current = startTouch.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startTouch || isRefreshing) return;

      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      if (diff > 0 && container.scrollTop === 0) {
        e.preventDefault();
        const distance = Math.min(diff * 0.5, maxPull);
        setPullDistance(distance);
        setCanRefresh(distance >= threshold);
      }
    };

    const handleTouchEnd = async () => {
      if (!startTouch) return;

      if (canRefresh && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch (error) {
          console.error("Refresh failed:", error);
        } finally {
          setIsRefreshing(false);
        }
      }

      setPullDistance(0);
      setCanRefresh(false);
      startTouch = null;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh, threshold, maxPull, isRefreshing, canRefresh]);

  const refreshOpacity = Math.min(pullDistance / threshold, 1);
  const iconRotation = (pullDistance / threshold) * 360;

  return (
    <div ref={containerRef} className="relative h-full overflow-auto">
      {/* Refresh Indicator */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-200 ease-out"
        style={{
          transform: `translateX(-50%) translateY(${Math.max(pullDistance - 40, -40)}px)`,
          opacity: refreshOpacity,
        }}
      >
        <div className={`
          flex items-center justify-center w-12 h-12 rounded-full
          ${canRefresh ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
          transition-colors duration-200
        `}>
          <RefreshCw 
            className={`w-6 h-6 transition-transform duration-200 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: isRefreshing ? 'rotate(0deg)' : `rotate(${iconRotation}deg)`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${pullDistance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;