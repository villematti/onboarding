import React from 'react';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './task.module.scss';

interface ITaskProps {
    title: string;
    isCompleted: boolean;
    onComplete: () => void;
}

const Task: React.FC<ITaskProps> = ({
    title,
    isCompleted,
    onComplete,
}) => {
    return (
        <button role="checkbox" aria-checked={isCompleted} data-testid={title} className={`${styles.wrapper} ${isCompleted ? '' : styles.hasCursor}`} onClick={() => isCompleted ? null : onComplete()}>
            <span className={styles.icon}>{isCompleted ? <FontAwesomeIcon data-testid={`${title}-complete-icon`} icon={faSquareCheck} /> : <FontAwesomeIcon data-testid={`${title}-incomplete-icon`} icon={faSquare} />}</span>
            {title}
        </button>
    );
}

export default Task;