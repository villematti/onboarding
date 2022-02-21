import React from 'react';
import styles from './listComponent.module.scss';

interface IListComponentProps {
    title: string;
}

const ListComponent: React.FC<IListComponentProps> = ({
    title,
    children,
}) => {
    return (
        <div data-testid={title} className={styles.wrapper}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default ListComponent;