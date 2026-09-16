import { CoinTable } from './coin-table';
import type { CoinMarketsItem } from '@/models/coin-gecko';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock('react-router', () => ({
    useNavigate: () => navigate,
}));

const coin: CoinMarketsItem = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: '',
    current_price: 68000,
    market_cap: 1000000,
    market_cap_rank: 1,
    fully_diluted_valuation: null,
    total_volume: 250000,
    high_24h: null,
    low_24h: null,
    price_change_24h: 1200,
    price_change_percentage_24h: 1.8,
    market_cap_change_24h: null,
    market_cap_change_percentage_24h: null,
    circulating_supply: null,
    total_supply: null,
    max_supply: null,
    ath: null,
    ath_change_percentage: null,
    ath_date: null,
    atl: null,
    atl_change_percentage: null,
    atl_date: null,
    roi: null,
    last_updated: '2026-09-16T00:00:00.000Z',
};

describe('CoinTable', () => {
    beforeEach(() => navigate.mockReset());
    afterEach(() => cleanup());

    it('shows the loading state', () => {
        render(<CoinTable coins={[]} isLoading error={null} />);
        expect(screen.getByText('Loading market data...')).toBeInTheDocument();
    });

    it('shows the error state', () => {
        render(<CoinTable coins={[]} isLoading={false} error="Request failed" />);
        expect(screen.getByText('Request failed')).toBeInTheDocument();
    });

    it('renders market data and navigates when a coin row is clicked', () => {
        render(<CoinTable coins={[coin]} isLoading={false} error={null} />);

        expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
        expect(screen.getByText('$68,000.00')).toBeInTheDocument();
        expect(screen.getByText('$1,200.00 (1.80%)')).toHaveClass('text-green-600');

        fireEvent.click(screen.getByText('Bitcoin (BTC)').closest('tr')!);
        expect(navigate).toHaveBeenCalledWith('/coin/bitcoin');
    });
});