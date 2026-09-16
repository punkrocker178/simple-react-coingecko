import Counter from './counter';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Counter', () => {
    it('increments the displayed count', () => {
        render(<Counter />);

        fireEvent.click(screen.getByRole('button', { name: 'Increment' }));

        expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });
});