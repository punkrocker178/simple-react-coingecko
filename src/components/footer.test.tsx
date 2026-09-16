import Footer from './footer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Footer', () => {
    it('links to CoinGecko and the project repository', () => {
        render(<Footer />);

        expect(screen.getByRole('link', { name: 'CoinGecko' })).toHaveAttribute(
            'href',
            'https://www.coingecko.com',
        );
        expect(screen.getByRole('link', { name: 'View project on GitHub' })).toHaveAttribute(
            'href',
            'https://github.com/punkrocker178/simple-react-coingecko',
        );
    });
});