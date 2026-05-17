import { NumberCircleFourIcon, NumberCircleThreeIcon, NumberCircleTwoIcon, NumberCircleOneIcon, MotorcycleIcon, TentIcon, CarrotIcon, EggCrackIcon, FlowerLotusIcon } from '@phosphor-icons/react';
import type { ElementType } from 'react';


export const ICON_CONFIG: Record<string, { words: string[], icon: ElementType }> = {
    'quad_sharing_room': {
        words: ['quad', 'four'],
        icon: NumberCircleFourIcon
    },
    'triple_sharing_room': { 
        words: ['triple', 'three'], 
        icon: NumberCircleThreeIcon 
    },
    'double_sharing_room': { 
        words: ['double', 'two'], 
        icon: NumberCircleTwoIcon 
    },
    'single_room': { 
        words: ['single'], 
        icon: NumberCircleOneIcon 
    },
    'solo_rider': { 
        words: ['solo'], 
        icon: MotorcycleIcon 
    },
    'camp': {
        words: ['camp', 'camping', 'tent'], 
        icon: TentIcon 
    },
    'veg': { 
        words: ['veg', 'vegetarian'], 
        icon: CarrotIcon 
    },
    'non-veg': { 
        words: ['non veg', 'non-veg', 'chicken'], 
        icon: EggCrackIcon 
    },
    'jain': { 
        words: ['jain'], 
        icon: FlowerLotusIcon 
    }
};