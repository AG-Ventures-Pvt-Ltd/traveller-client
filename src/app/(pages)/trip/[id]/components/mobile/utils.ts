import { AvailableDate } from '../../types';

export const formatDate = (dateInput: string | Date | undefined): string => {
    if (!dateInput) return '';
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
    } catch {
        return '';
    }
};

export const getSeatsMessage = (batch: AvailableDate): string => {
    const totalSeats = batch.totalSeats || 0;
    const seatsAvailable = batch.seatsAvailable || 0;
    if (seatsAvailable > totalSeats * 0.4) {
        return `${seatsAvailable}/${totalSeats} seats remaining`;
    }
    return `Last ${seatsAvailable} seats left`;
};

export const sortBatchesByDate = (batches: AvailableDate[]): AvailableDate[] => {
    return [...batches].sort((a, b) => {
        const dateA = new Date(a.startDate || a.startDateTime || '').getTime();
        const dateB = new Date(b.startDate || b.startDateTime || '').getTime();
        return dateA - dateB;
    });
};

export const findClosestBatchIndex = (batches: AvailableDate[]): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let closestIndex = 0;
    let closestDifference = Infinity;

    batches.forEach((batch, index) => {
        try {
            const batchDate = new Date(batch.startDate);
            if (isNaN(batchDate.getTime())) return;
            batchDate.setHours(0, 0, 0, 0);
            const difference = Math.abs(batchDate.getTime() - today.getTime());
            if (difference < closestDifference) {
                closestDifference = difference;
                closestIndex = index;
            }
        } catch {
            // skip invalid dates
        }
    });

    return closestIndex;
};
