import { fireEvent, render, screen } from '@testing-library/react';
import Task from '../../components/task/task';

describe('Task', () => {
    test('should show correct task name', () => {
        const mockTaskName = 'Test Task';
        render(<Task isCompleted={true} onComplete={() => {}} title={mockTaskName} />);
        const taskName = screen.getByText(mockTaskName);
        expect(taskName).toBeInTheDocument();
    });

    test('should call onComplete when isComplete is false', () => {
        const testTaskName = 'Test Task';
        const onCompleteMock = jest.fn();
        render(<Task isCompleted={false} onComplete={onCompleteMock} title={testTaskName} />);
        const el = screen.queryByTestId(testTaskName);
        fireEvent.click(el)
        expect(onCompleteMock).toBeCalledTimes(1);
    })

    test('should not have called onComplete when isComplete is true', () => {
        const testTaskName = 'Test Task';
        const onCompleteMock = jest.fn();
        render(<Task isCompleted={true} onComplete={onCompleteMock} title={testTaskName} />);
        const el = screen.queryByTestId(testTaskName);
        fireEvent.click(el)
        expect(onCompleteMock).toBeCalledTimes(0);
    })
})