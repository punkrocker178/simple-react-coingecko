import Home from './Home';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('Home', () => {
    it('renders the overview and dashboard link', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>,
        );

        expect(screen.getByRole('heading', { name: 'Welcome to Simple React Coingecko' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Go to dashboard' })).toHaveAttribute(
            'href',
            '/dashboard',
        );
    });
});