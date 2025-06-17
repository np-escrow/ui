import { t } from 'i18next';

import { Icon } from '../Icon';
import { Link } from 'react-router-dom';

const NavHeader = () => {

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

    const getBackLink = () => {
        // используем switch вместо navigate('/') для того чтобы не было перерисовки при возврате

        switch (location.pathname) {
            case '/withdraw':
                return '/';
            // case '/deposit':
            //     return '/';
            // case '/shipment-info':
            //     return '/';
            // case '/send-package':
            //     return '/';
            // case '/package-payment':
            //     return '/';
        }
    }

    return <header className='flex items-center gap-x-[10px] h-11 relative'>
        <Link
            to={getBackLink() || '/'}
            className='flex items-center justify-center size-9 rounded-full bg-gray-200'>
            <Icon name="arrow" width={22} height={22} />
        </Link>

        <h1 className='text-[20px] font-semibold absolute left-1/2 -translate-x-1/2'>
            {getHeaderTitle()}
        </h1>
    </header>;
};

export default NavHeader;