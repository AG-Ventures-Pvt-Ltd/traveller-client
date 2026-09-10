'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import StatesDropdown from '../StatesDropdown';
import MonthDropdown from './MonthDropdown';
import { monthOptions } from '../../buildApiUrl';
import { FilterMeta, FilterValues } from '../../types';

interface TripFiltersPanelProps {
  value: FilterValues;
  onChange: (next: FilterValues) => void;
  /** Price slider domain from the API. Falls back to a sane range before it arrives. */
  meta?: FilterMeta;
}

/** "At most N days" — the API applies numberOfDays as a ceiling, not a range. */
const LENGTH_OPTIONS = [
  { label: 'Any length', value: null },
  { label: 'Up to 2 days', value: 2 },
  { label: 'Up to 5 days', value: 5 },
  { label: 'Up to 8 days', value: 8 },
];

const PRICE_STEP = 500;

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}> = ({ title, children, defaultOpen = true, badge = 0 }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-neutral-900">
          {title}
          {badge > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1.5 text-[11px] font-bold text-white">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && children}
    </div>
  );
};

const Chip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
      active
        ? 'border-neutral-900 bg-[#D0EF65] text-neutral-900'
        : 'border-neutral-300 bg-transparent text-neutral-600 hover:border-neutral-500'
    }`}
  >
    {children}
  </button>
);

/**
 * Dual-handle price range built from two native range inputs — no dependency, and the
 * handles can't cross. Commits on release so dragging doesn't fire a request per pixel.
 */
const PriceRange: React.FC<{
  min: number;
  max: number;
  value: [number, number];
  onCommit: (next: [number, number]) => void;
}> = ({ min, max, value, onCommit }) => {
  const [draft, setDraft] = useState<[number, number]>(value);

  useEffect(() => setDraft(value), [value]);

  const span = Math.max(1, max - min);
  const pct = (v: number) => Math.min(100, Math.max(0, ((v - min) / span) * 100));
  const leftPct = pct(draft[0]);
  const rightPct = pct(draft[1]);

  const commit = () => onCommit(draft);

  // A handle resting at the end of the track is not a bound — releasing it there clears
  // that side. Spelling the filter out stops the track's endpoints, which are just the
  // cheapest and priciest trips on sale, from reading as limits the user didn't set.
  const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;
  const lo = draft[0] > min ? draft[0] : null;
  const hi = draft[1] < max ? draft[1] : null;
  const summary =
    lo === null && hi === null ? 'Any price'
      : lo !== null && hi === null ? `${rupees(lo)} and above`
        : lo === null && hi !== null ? `Up to ${rupees(hi)}`
          : `${rupees(lo!)} – ${rupees(hi!)}`;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold text-neutral-900">{summary}</span>

      <div className="relative h-5">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-neutral-300" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-neutral-900"
          style={{ left: `${leftPct}%`, width: `${Math.max(0, rightPct - leftPct)}%` }}
        />
        {([0, 1] as const).map((handle) => (
          <input
            key={handle}
            type="range"
            aria-label={handle === 0 ? 'Minimum price' : 'Maximum price'}
            min={min}
            max={max}
            step={PRICE_STEP}
            value={draft[handle]}
            onChange={(e) => {
              const n = Number(e.target.value);
              // Keep each handle inside the track as well as on its own side of the other.
              // Without the min/max clamp a narrow domain — every trip priced the same —
              // pushes a handle past the end and the filled bar renders at a wild offset.
              setDraft((d) =>
                handle === 0
                  ? [Math.max(min, Math.min(n, d[1] - PRICE_STEP)), d[1]]
                  : [d[0], Math.min(max, Math.max(n, d[0] + PRICE_STEP))]
              );
            }}
            onPointerUp={commit}
            onKeyUp={commit}
            onTouchEnd={commit}
            className="pointer-events-none absolute inset-x-0 top-0 h-5 w-full appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neutral-900
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-neutral-900 [&::-moz-range-thumb]:bg-white"
          />
        ))}
      </div>

      {/* Axis ticks — the extent of what's on sale, not the applied filter. */}
      <div className="flex items-center justify-between text-[10px] font-medium text-neutral-400">
        <span>{rupees(min)}</span>
        <span>{rupees(max)}+</span>
      </div>
    </div>
  );
};

/**
 * The one filter UI. Rendered inside the desktop sidebar and the mobile bottom sheet, so
 * there is a single set of controls and a single set of defaults — the two used to be
 * separate copies whose defaults had drifted apart.
 *
 * Fully controlled: the parent owns the state and decides when it reaches the URL.
 */
const TripFiltersPanel: React.FC<TripFiltersPanelProps> = ({ value, onChange, meta }) => {
  // The catalogue's cheapest and priciest trip move as hosts publish and reprice, so a
  // budget carried in from a shared or bookmarked URL can land outside today's bounds.
  // Widening the track to include it keeps the handle where the user put it and the label
  // honest; clamping to the bounds would show a number the URL doesn't say.
  const minPrice = Math.min(meta?.minPrice ?? 0, value.minBudget ?? Infinity);
  const maxPrice = Math.max(meta?.maxPrice ?? 50000, value.maxBudget ?? 0);

  // Derived from today's date, so it is recomputed per render tree rather than frozen
  // into a module constant that would go stale across a month boundary.
  const months = useMemo(() => monthOptions(), []);

  const set = <K extends keyof FilterValues>(key: K, next: FilterValues[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="flex flex-col gap-5">
      <Section title="States" badge={value.states.length}>
        <StatesDropdown selected={value.states} onChange={(next) => set('states', next)} />
      </Section>

      <div className="h-px bg-neutral-200" />

      <Section title="Departure month" badge={value.month ? 1 : 0}>
        <MonthDropdown
          options={[{ key: null, label: 'Any month' }, ...months]}
          selected={value.month}
          onChange={(month) => set('month', month)}
        />
      </Section>

      <div className="h-px bg-neutral-200" />

      <Section title="Price per person" badge={value.minBudget !== null || value.maxBudget !== null ? 1 : 0}>
        <PriceRange
          min={minPrice}
          max={maxPrice}
          value={[value.minBudget ?? minPrice, value.maxBudget ?? maxPrice]}
          onCommit={([lo, hi]) =>
            onChange({
              ...value,
              // Treat a handle parked at the end of the domain as "no bound", so the URL
              // stays clean and the filter chip doesn't claim a limit the user didn't set.
              minBudget: lo <= minPrice ? null : lo,
              maxBudget: hi >= maxPrice ? null : hi,
            })
          }
        />
      </Section>

      <div className="h-px bg-neutral-200" />

      <Section title="Trip length" badge={value.numberOfDays !== null ? 1 : 0}>
        <div className="flex flex-wrap gap-1.5">
          {LENGTH_OPTIONS.map((opt) => (
            <Chip
              key={opt.label}
              active={value.numberOfDays === opt.value}
              onClick={() => set('numberOfDays', opt.value)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </Section>

      <div className="h-px bg-neutral-200" />

      <Section title="International" badge={value.international ? 1 : 0}>
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={value.international}
            onChange={(e) => set('international', e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 accent-neutral-900"
          />
          <span className="text-sm font-medium text-neutral-700">Show international trips only</span>
        </label>
      </Section>
    </div>
  );
};

export default TripFiltersPanel;
