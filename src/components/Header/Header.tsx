import { t } from 'i18next';
import { useUserStore } from '../../store/userStore';

import userAvatar from '../../assets/images/user-avatar-mock.jpg'

const Header = () => {
    const username = useUserStore((state) => state.username);

    return <div className='flex items-center gap-x-[10px] mt-5'>
        <div className='flex items-center justify-center overflow-hidden rounded-full size-11 bg-gray-100'>
            <div className='flex items-center justify-center overflow-hidden rounded-full size-[40px] outline outline-white-100 padding-[1px]'>
                <img src={userAvatar} alt="user avatar" className='size-full object-cover' />
            </div>
        </div>
        <span className='text-[20px] font-semibold'>
            {username ? t('header.greetingWithName', { name: username }) : t('header.greeting')}
        </span>
    </div>;
};

export default Header;