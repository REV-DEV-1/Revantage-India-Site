interface LogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({ className = '', showText = true, textClassName = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center bg-white rounded-xl px-5 py-2.5 border border-[#2DCB3B]/20 shadow-sm ${className}`}>
      <img
        src="/images/revange-logo-final-Curve_1.png"
        alt="Revantage Systems India"
        className="h-14 max-w-[260px] w-auto object-contain"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.nextElementSibling) {
            (target.nextElementSibling as HTMLElement).style.display = 'flex';
          }
        }}
      />
      {showText && (
        <div className={`hidden flex-col gap-0.5 ${textClassName}`}>
          <span className="text-lg font-extrabold tracking-tight leading-none text-[#10159B]">Revantage</span>
          <span className="text-[10px] font-bold text-[#2DCB3B] leading-none">Systems India</span>
        </div>
      )}
    </div>
  );
}
