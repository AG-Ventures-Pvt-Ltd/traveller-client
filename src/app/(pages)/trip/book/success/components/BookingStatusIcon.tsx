'use client';

import { CheckCircle, WarningCircle, Clock } from '@phosphor-icons/react';
import type { StatusType } from '../types';

const STATUS_CONFIG: Record<StatusType, { Icon: React.ElementType; color: string }> = {
    success: { Icon: CheckCircle, color: '#43a047' },
    failed: { Icon: WarningCircle, color: '#f44336' },
    pending: { Icon: Clock, color: '#FF9800' },
};

interface BookingStatusIconProps {
    status: StatusType;
}

export default function BookingStatusIcon({ status }: BookingStatusIconProps) {
    const { Icon, color } = STATUS_CONFIG[status];
    return (
        <Icon size={162} weight="fill" color={color} />
    );
}
