import About from './About';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('About', () => {
    it('renders the page heading and application information', () => {
        render(<About />);

        expect(screen.getByRole('heading', { name: 'About Page' })).toBeInTheDocument();
        expect(screen.getByText('This page provides information about the application.')).toBeInTheDocument();
    });
});