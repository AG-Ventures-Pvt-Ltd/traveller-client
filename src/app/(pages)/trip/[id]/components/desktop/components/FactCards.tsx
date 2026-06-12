import {
    MapPinIcon, ClockIcon, MountainsIcon, UsersThreeIcon, SignpostIcon,
    GenderFemaleIcon, HeartIcon,
} from '@phosphor-icons/react';

export interface FactCardsProps {
    location?: string;
    duration?: string;
    difficulty?: string;
    boardingPoint?: string;
    seats?: string;
    certificates?: string[];
}

export default function FactCards({ location, duration, difficulty, boardingPoint, seats, certificates }: FactCardsProps) {
    const facts = [
        { Icon: MapPinIcon, label: 'Destination', value: location, bg: '#D0EF65' },
        { Icon: ClockIcon, label: 'Duration', value: duration, bg: '#EEA0FF' },
        { Icon: MountainsIcon, label: 'Difficulty', value: difficulty, bg: '#FFD976' },
        { Icon: UsersThreeIcon, label: 'Group Size', value: seats, bg: '#E2F4A6' },
        { Icon: SignpostIcon, label: 'Boarding', value: boardingPoint, bg: '#FFEAB2' },
    ].filter((f): f is { Icon: typeof MapPinIcon; label: string; value: string; bg: string } => !!f.value);

    const certMap: Record<string, { label: string; Icon: typeof GenderFemaleIcon; color: string }> = {
        'female-friendly': { label: 'Female Friendly', Icon: GenderFemaleIcon, color: '#E050FF' },
        'solo-friendly': { label: 'Loved by Solo Travelers', Icon: HeartIcon, color: '#FF5A5F' },
    };
    const certs = (certificates || []).filter(c => certMap[c]);

    if (facts.length === 0 && certs.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-3">
            {facts.map((f, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl pl-2.5 pr-5 py-2.5 hover:-translate-y-0.5 transition-transform" style={{ backgroundColor: f.bg }}>
                    <div className="w-10 h-10 rounded-xl bg-white/55 flex items-center justify-center shrink-0">
                        <f.Icon size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] text-black font-semibold">{f.label}</p>
                        <p className="text-sm font-bold text-black leading-tight">{f.value}</p>
                    </div>
                </div>
            ))}
            {certs.map(c => {
                const data = certMap[c];
                return (
                    <div key={c} className="flex items-center gap-2 rounded-2xl px-4 py-2.5" style={{ backgroundColor: `${data.color}1a` }}>
                        <data.Icon size={20} weight="duotone" style={{ color: data.color }} />
                        <span className="text-sm font-semibold" style={{ color: data.color }}>{data.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
