import React from 'react';

const Header = ({ logo, currentStep }) => {
  const steps = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Confirmation' }
  ];

  return (
    <header className="w-full h-[88px] bg-white border-b border-[#DBDDE3] flex items-center justify-between px-4 md:px-8 lg:px-16 flex-shrink-0">
      <h1 className="text-black text-2xl md:text-4xl font-semibold font-poppins">
        {logo}
      </h1>
      
      <div className="flex items-center gap-2 md:gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center gap-2 md:gap-[10px]">
              <div className={`w-8 h-8 px-2 py-1 rounded-full flex flex-col justify-center items-center ${
                step.number <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}>
                <span className="text-white text-sm font-semibold font-dm-sans">
                  {step.number}
                </span>
              </div>
              <span className="text-black text-sm md:text-base font-medium font-dm-sans hidden sm:block">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 md:w-12 h-0 border-t border-[#DBDDE3]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default Header;
