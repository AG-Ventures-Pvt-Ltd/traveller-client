import { UserListIcon } from '@phosphor-icons/react';

interface UserDetailsCardProps {
    user: {
        fullName: string;
        email: string;
        phoneNumber: string;
    };
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ user }) => {
    return (
        <div className="border border-[#D9D9D9] rounded-[16px] flex items-center gap-[26px] px-[19px] py-[21px]">
            <UserListIcon size={24} weight="thin" className="text-black flex-shrink-0" />
            <div className="flex flex-col gap-[7px] text-black">
                <p className="font-medium text-[16px] tracking-[-0.48px] leading-normal">
                    {user.fullName}
                </p>
                <div className="flex flex-col gap-[3px] text-[13px] tracking-[-0.39px]">
                    <p>{user.email}</p>
                    <p>+91 {user.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsCard;