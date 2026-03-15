import MyImage from "@/common/ui/Image";

interface HostAvatarProps {
  avatar?: string;
  fullName: string;
  className?: string;
}

export default function HostAvatar({ avatar, fullName, className = "" }: HostAvatarProps) {
  // Get first letter of name for initials
  const initials = fullName.charAt(0).toUpperCase();

  if (avatar) {
    return (
      <div className={`w-22 h-22 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden bg-neutral-100 ${className}`}>
        <MyImage
          src={avatar}
          alt={fullName}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`w-16 h-16 md:w-28 md:h-28 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${className}`}>
      <span className="text-white text-3xl md:text-5xl font-bold font-['Satoshi']">{initials}</span>
    </div>
  );
}
