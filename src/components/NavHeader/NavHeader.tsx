import { t } from 'i18next';

import { Icon } from '../Icon';
import { useNavigate } from 'react-router-dom';

const NavHeader = () => {
    const navigate = useNavigate();

    const getHeaderTitle = () => {
        switch (location.pathname) {
            case '/withdraw':
                return t('header.withdraw');
            case '/deposit':
                return t('header.deposit');
            case '/shipment-info':
                return t('header.shipmentInfo');
            case '/send-package':
                return t('header.sendPackage');
            case '/package-payment':
                return t('header.packagePayment');
        }
    }

    const handleBack = () => {
        // используем switch вместо navigate('/') для того чтобы не было перерисовки при возврате

        switch (location.pathname) {
            case '/withdraw':
                navigate('/');
                break;
            // case '/deposit':
            //     navigate('/');
            //     break;
            // case '/shipment-info':
            //     navigate('/');
            //     break;
            // case '/send-package':
            //     navigate('/');
            //     break;
            // case '/package-payment':
            //     navigate('/');
            //     break;
        }
    }

    return <header className='flex items-center gap-x-[10px] h-11 relative'>
        <button
            type='button'
            className='flex items-center justify-center size-9 rounded-full bg-gray-200'
            onClick={handleBack}>
            <Icon name="arrow" width={22} height={22} />
        </button>

        <h1 className='text-[20px] font-semibold absolute left-1/2 -translate-x-1/2'>
            {getHeaderTitle()}
        </h1>
    </header>;
};

export default NavHeader;