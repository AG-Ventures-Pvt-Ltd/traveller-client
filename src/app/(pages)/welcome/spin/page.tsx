'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Button from '@/common/ui/Buttons/Button';

interface Segment {
  id: number;
  label: string;
  color: string;
  probability: number; // 0-100, percentage chance
}

interface SpinData {
  reward: string;
  date: string;
  timestamp: number;
}

const SpinWheelPage: React.FC = () => {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [spinData, setSpinData] = useState<SpinData | null>(null);

  const segments: Segment[] = [
    { id: 1, label: '200', color: '#d4fc79', probability: 9 }, // Lime - 20%
    { id: 2, label: '400', color: '#fbbf24', probability: 10 }, // Yellow - 20%
    { id: 3, label: '600', color: '#f472b6', probability: 40 }, // Pink - 20%
    { id: 4, label: '800', color: '#60a5fa', probability: 40 }, // Blue - 20%
    { id: 5, label: '1000', color: '#a78bfa', probability: 1 }, // Purple - 20%
  ];

  const segmentAngle = 360 / segments.length; // 72 degrees per segment

  // Get random segment based on probability weights
  const getRandomSegmentByProbability = (): Segment => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    
    for (const segment of segments) {
      cumulativeProbability += segment.probability;
      if (random <= cumulativeProbability) {
        return segment;
      }
    }
    
    // Fallback to last segment (shouldn't reach here)
    return segments[segments.length - 1];
  };

  // Convert segment to rotation angle
  const getRotationForSegment = (segment: Segment): number => {
    const segmentIndex = segments.findIndex(s => s.id === segment.id);
    const segmentCenter = (segmentIndex * segmentAngle) + (segmentAngle / 2);
    return segmentCenter;
  };

  // Check localStorage on mount
  useEffect(() => {
    const storedSpinData = localStorage.getItem('spinWheelData');
    if (storedSpinData) {
      try {
        const data = JSON.parse(storedSpinData) as SpinData;
        setSpinData(data);
        setHasSpun(true);
      } catch {
        // Silently fail if localStorage data is corrupted
      }
    }
  }, []);

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setSelectedReward(null);
    setShowConfetti(false);
    setSpinCount(prev => prev + 1);

    // Select segment based on probability weights
    const selectedSegment = getRandomSegmentByProbability();
    const targetRotation = getRotationForSegment(selectedSegment);

    // Random number of rotations (5-8 full rotations for more excitement)
    const fullRotations = 5 + Math.random() * 3;
    
    // Total rotation: full rotations + target landing position
    const totalRotation = fullRotations * 360 + targetRotation;
    
    // Set rotation for animation
    setRotation(totalRotation);

    // After animation completes, show the result
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedReward(selectedSegment.label);
      setShowConfetti(true);

      // Store spin data in localStorage
      const now = new Date();
      const spinDataToStore: SpinData = {
        reward: selectedSegment.label,
        date: now.toLocaleDateString(),
        timestamp: now.getTime(),
      };
      localStorage.setItem('spinWheelData', JSON.stringify(spinDataToStore));
      setSpinData(spinDataToStore);
      setHasSpun(true);
    }, 4000);
  };

  const handleClaimReward = () => {
    router.push('/auth?mode=signup&reward=' + selectedReward);
  };

  return (
    <div className="min-h-screen bg-[#fff9f4] overflow-hidden flex flex-col items-center justify-center px-4 md:hidden">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti {
          position: fixed;
          pointer-events: none;
          will-change: transform;
        }

        .confetti-piece {
          animation: fall linear forwards;
        }

        .modal-overlay {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .reward-modal {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from {
            transform: scale(0.8) translateY(50px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Confetti Effect */}
      {showConfetti && (
        <div>
          {Array.from({ length: 50 }).map((_, i) => {
            const randomDelay = Math.random() * 0.2;
            const randomDuration = 2 + Math.random() * 1.5;
            const randomLeft = Math.random() * 100;
            const colors = ['#d4fc79', '#fbbf24', '#f472b6', '#60a5fa', '#a78bfa'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            return (
              <div
                key={i}
                className="confetti confetti-piece"
                style={{
                  left: `${randomLeft}%`,
                  top: '-10px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: randomColor,
                  borderRadius: '50%',
                  animation: `fall ${randomDuration}s linear forwards`,
                  animationDelay: `${randomDelay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Dark Overlay Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay">
          {/* Modal Card */}
          <div className="bg-white rounded-3xl px-8 py-12 text-center max-w-sm mx-4 reward-modal">
            {/* Celebration Icon */}
            <div className="text-6xl mb-6">🎉</div>

            <p className="text-gray-500 font-['Rubik'] text-lg mb-4">Congratulations!</p>
            
            <div className="bg-gradient-to-r from-[#d4fc79] to-[#a78bfa] rounded-2xl py-8 mb-6 border-4 border-black">
              <p className="text-6xl font-black text-black mb-2">₹{selectedReward}</p>
              <p className="text-black font-['Rubik'] font-semibold">Cash Prize!</p>
            </div>

            <p className="text-gray-600 font-['Rubik'] mb-2">You&apos;ve won ₹{selectedReward}!</p>
            <p className="text-gray-500 font-['Rubik'] text-sm mb-6">Sign up now to claim your cash prize</p>

            <Button
              onClick={handleClaimReward}
              className="!h-12 !bg-[#eea0ff] !rounded-2xl !text-black !font-semibold !text-base !normal-case hover:!bg-[#e080ff] font-['Rubik'] px-8 w-full"
            >
              Sign Up & Claim Prize
            </Button>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-black text-black mb-2 text-center">Spin & Win!</h1>
      <p className="text-gray-600 text-center mb-12 font-['Rubik'] text-lg">
        {hasSpun ? 'Thank you for spinning! You won ₹' + spinData?.reward : 'One spin, one chance to win cash!'}
      </p>

      {/* Wheel Container */}
      <div className="relative w-80 h-80 mb-12">
        {/* Lock overlay if already spun */}
        {hasSpun && (
          <div className="absolute inset-0 bg-black/30 rounded-full z-40 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-black font-['Rubik'] font-bold text-sm">Wheel Locked</p>
            </div>
          </div>
        )}

        {/* Pointer/Arrow at top */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            style={{
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '16px solid black',
            }}
          />
        </div>

        {/* Glow effect under wheel */}
        <div className="absolute inset-0 -z-10 blur-2xl rounded-full bg-gradient-to-b from-[#eea0ff]/20 to-transparent" />

        {/* Wheel SVG */}
        <motion.svg
          key={spinCount}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          animate={{ rotate: rotation }}
          transition={{
            duration: 4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{
            transformOrigin: 'center',
            opacity: hasSpun ? 0.6 : 1,
          }}
        >
          {segments.map((segment, index) => {
            const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
            const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

            const x1 = 160 + 120 * Math.cos(startAngle);
            const y1 = 160 + 120 * Math.sin(startAngle);
            const x2 = 160 + 120 * Math.cos(endAngle);
            const y2 = 160 + 120 * Math.sin(endAngle);

            const largeArc = segmentAngle > 180 ? 1 : 0;

            const pathData = [
              `M 160 160`,
              `L ${x1} ${y1}`,
              `A 120 120 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z',
            ].join(' ');

            // Calculate text position (middle of segment, closer to edge)
            const textAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
            const textX = 160 + 85 * Math.cos(textAngle);
            const textY = 160 + 85 * Math.sin(textAngle);
            const textRotation = (index * segmentAngle + segmentAngle / 2);

            return (
              <g key={segment.id}>
                {/* Segment Path with shadow */}
                <path
                  d={pathData}
                  fill={segment.color}
                  stroke="#000"
                  strokeWidth="3"
                  filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
                />
                
                {/* Segment Label */}
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="32"
                  fontWeight="900"
                  fill="#000"
                  transform={`rotate(${textRotation} ${textX} ${textY})`}
                  fontFamily="'Rubik', sans-serif"
                  filter="drop-shadow(1px 1px 2px rgba(255,255,255,0.5))"
                >
                  {segment.label}
                </text>
              </g>
            );
          })}

          {/* Center Circle with gradient */}
          <circle cx="160" cy="160" r="28" fill="#000" stroke="#fff9f4" strokeWidth="3" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))" />
          <circle cx="160" cy="160" r="20" fill="#eea0ff" />
          <circle cx="160" cy="160" r="10" fill="#000" />
        </motion.svg>
      </div>

      {/* Spin Button */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning || hasSpun}
        className={`!h-16 !bg-[#eea0ff] !rounded-2xl !text-black !font-bold !text-lg !normal-case hover:!bg-[#e080ff] disabled:!opacity-60 disabled:!cursor-not-allowed font-['Rubik'] px-16 mb-8 transform transition-all ${
          isSpinning ? 'scale-95' : 'scale-100'
        }`}
      >
        {isSpinning ? '⚡ SPINNING ⚡' : hasSpun ? '✅ Already Spun' : '🎡 SPIN NOW 🎡'}
      </Button>

      {/* Instructions */}
      <div className="mt-12 text-center text-sm text-gray-600 font-['Rubik'] max-w-sm">
        <p className="mb-2">🎯 One spin per user</p>
        <p className="mb-2">💰 Win cash prizes up to ₹500</p>
        <p>📱 Sign up to claim your reward!</p>
      </div>
    </div>
  );
};

export default SpinWheelPage;
