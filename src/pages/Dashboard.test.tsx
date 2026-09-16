import { Dashboard } from './Dashboard';
import type { CoinMarketsItem } from '@/models/coin-gecko';
import { getMarketCoins } from '@/services/coin-service';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/services/coin-service', () => ({
    getMarketCoins: vi.fn(),
}));

vi.mock('react-router', () => ({
    useNavigate: () => vi.fn(),
}));

const coin = { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 68000 } as CoinMarketsItem;

describe('Dashboard', () => {
    beforeEach(() => vi.mocked(getMarketCoins).mockReset());
    afterEach(() => cleanup());

    it('loads and displays market coins from the service', async () => {
        vi.mocked(getMarketCoins).mockResolvedValue([coin]);

        render(<Dashboard />);
        expect(screen.getByText('Loading market data...')).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument());
        expect(getMarketCoins).toHaveBeenCalledWith(expect.any(AbortSignal));
    });

});