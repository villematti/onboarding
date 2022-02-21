import { render, screen } from '@testing-library/react';
import ListComponent from '../../components/listComponent/listComponent';

describe('ListComponent', () => {
    test('should show correct title', () => {
        const listTitle = 'Test list';
        render(<ListComponent title={listTitle} />);
        expect(screen.queryByText(listTitle)).toBeInTheDocument();
    })
});