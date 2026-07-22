import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useGetData } from "@/services/useGetData";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";
import { ReviewCard } from "./components/ReviewCard";

interface TripReviewResponse {
  reviews: {
    _id: string;
    username: string;
    review: string;
    rating: number;
    createdAt: string;
  }[];
}

interface HostReviewsProps {
  hostUsername: string;
  onDataLoaded?: (count: number) => void;
}

const PEEK = 0.12;
const CARD_GAP = 0;
const CARD_HEIGHT = 180; // fixed height for every card

function CarouselCard({
  review,
  index,
  trackX,
  cardWidth,
  step,
}: {
  review: {
    id: string;
    reviewerName: string;
    reviewerInitials: string;
    rating: number;
    comment: string;
    tripName: string;
    date: string;
  };
  index: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
  cardWidth: number;
  step: number;
}) {
  const distFromCenter = useTransform(
    trackX,
    (tx) => Math.abs(tx + index * step) / step
  );
  const scale = useTransform(distFromCenter, [0, 1, 2], [1, 0.88, 0.78], { clamp: false });
  const opacity = useTransform(distFromCenter, [0, 0.8, 1.5], [1, 0.55, 0.3], { clamp: false });

  return (
    <motion.div
      style={{
        width: cardWidth,
        // Fixed height: card never grows with content
        height: CARD_HEIGHT,
        flexShrink: 0,
        scale,
        opacity,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      <div className="rc-clamp" style={{ height: CARD_HEIGHT }}>
        <ReviewCard review={review} />
      </div>
    </motion.div>
  );
}

export function HostReviews({ hostUsername }: HostReviewsProps) {
  const { data, isLoading, error } = useGetData<TripReviewResponse>(
    API_ENDPOINTS.REVIEW.PROFILE(hostUsername)
  );

  const [current, setCurrent] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const currentRef = useRef(0);
  const totalRef = useRef(0);
  const trackX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const pointerStartTime = useRef(0);
  const isPointerDown = useRef(false);

  // Set initial current to middle of reviews when data loads
  useEffect(() => {
    if (data && data.reviews.length > 0) {
      const middleIndex = Math.floor(data.reviews.length / 2);
      setCurrent(middleIndex);
      currentRef.current = middleIndex;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Measure the real container width (re-runs once the carousel mounts after
  // data loads). Without this, render falls back to 340px while the effect that
  // positions the track used the real width — the mismatch made the desktop
  // carousel position cards off-screen ("collapsing completely").
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [data]);

  // Keep the track centred on the active card whenever the width changes.
  useEffect(() => {
    if (!data || data.reviews.length === 0 || !containerWidth) return;
    const cw = Math.floor((containerWidth - 2 * CARD_GAP) / (1 + 2 * PEEK));
    const st = cw + CARD_GAP;
    trackX.set(-currentRef.current * st);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, data]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-8">Loading reviews...</div>;
  }
  if (error || !data) {
    return <div className="flex items-center justify-center py-8">Error loading reviews</div>;
  }
  if (data.reviews.length <= 0) {
    return <></>;
  }

  const reviews = data.reviews.map((r) => ({
    id: r._id,
    reviewerName: r.username,
    reviewerInitials: r.username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase(),
    rating: r.rating,
    comment: r.review,
    tripName: "",
    date: r.createdAt,
  }));

  const total = reviews.length;
  totalRef.current = total;

  const measuredWidth = containerWidth || containerRef.current?.offsetWidth || 340;
  const cardWidth = Math.floor((measuredWidth - 2 * CARD_GAP) / (1 + 2 * PEEK));
  const step = cardWidth + CARD_GAP;
  const peekPx = Math.floor(cardWidth * PEEK);

  const snapTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    currentRef.current = clamped;
    setCurrent(clamped);
    animate(trackX, -clamped * step, {
      type: "spring",
      stiffness: 380,
      damping: 36,
      mass: 0.8,
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    pointerStartX.current = e.clientX;
    pointerStartTime.current = Date.now();
    isPointerDown.current = true;
    trackX.stop();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const delta = e.clientX - pointerStartX.current;
    const base = -currentRef.current * step;
    const atStart = currentRef.current === 0 && delta > 0;
    const atEnd = currentRef.current === totalRef.current - 1 && delta < 0;
    const resistance = atStart || atEnd ? 0.15 : 1;
    trackX.set(base + delta * resistance);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    const delta = e.clientX - pointerStartX.current;
    const elapsed = Date.now() - pointerStartTime.current;
    const velocity = (delta / elapsed) * 1000;
    if (delta < -40 || velocity < -300) snapTo(currentRef.current + 1);
    else if (delta > 40 || velocity > 300) snapTo(currentRef.current - 1);
    else snapTo(currentRef.current);
  };

  return (
    <>
      <style>{`
        .rc-clamp p {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: calc(1rem * 5);
        }
      `}</style>

      <div className="my-8">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-medium text-neutral-900">
            What travellers say
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <div
            ref={containerRef}
            className="relative w-full select-none overflow-hidden"
            style={{ height: CARD_HEIGHT, cursor: "grab", touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <motion.div
              className="absolute flex items-center h-full"
              style={{
                left: peekPx + CARD_GAP,
                gap: CARD_GAP,
                x: trackX,
              }}
            >
              {reviews.map((review, index) => (
                <CarouselCard
                  key={review.id}
                  review={review}
                  index={index}
                  trackX={trackX}
                  cardWidth={cardWidth}
                  step={step}
                />
              ))}
            </motion.div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => snapTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current
                    ? "bg-neutral-900 w-6 h-2"
                    : "bg-neutral-300 w-2 h-2 hover:bg-neutral-400"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}