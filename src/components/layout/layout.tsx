import React from 'react';
import { SITE_TITLE } from '../../constants/constants';
import styles from './layout.module.scss';

const Layout: React.FC = ({
    children
}) => {
    return (
        <div>
            <div className={styles.header}>
                <h1>{SITE_TITLE}</h1>
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    )
}

export default Layout;