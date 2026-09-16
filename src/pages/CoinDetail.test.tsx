import { CoinDetail } from './CoinDetail';
import type {
    CoinDetail as CoinDetailModel,
    CoinGeckoMarketChartResponse,
    CoinGeckoOhlcResponse,
} from '@/models/coin-gecko';
import { getCoinDetail, getCoinMarketChart, getCoinOhlc } from '@/services/coin-service';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { useParams } = vi.hoisted(() => ({ useParams: vi.fn() }));

vi.mock('react-router', () => ({ useParams }));
vi.mock('@/services/coin-service', () => ({
    getCoinDetail: vi.fn(),
    getCoinMarketChart: vi.fn(),
    getCoinOhlc: vi.fn(),
}));
vi.mock('@/components/chart/echart-wrapper', () => ({
    EchartWrapper: ({ options }: { options?: { series?: unknown[] } }) => (
        <div data-testid="chart" data-series-count={options?.series?.length ?? 0} />
    ),
}));

const detail = {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    description: { en: 'Digital currency' },
} as unknown as CoinDetailModel;
const ohlc = [[1, 10, 12, 8, 11]] as CoinGeckoOhlcResponse;
const market = {
    prices: [[1, 10]],
    market_caps: [[1, 100]],
    total_volumes: [[1, 5]],
} as CoinGeckoMarketChartResponse;

describe('CoinDetail', () => {
    beforeEach(() => {
        useParams.mockReturnValue({ id: 'bitcoin' });
        vi.mocked(getCoinDetail).mockResolvedValue(detail);
        vi.mocked(getCoinOhlc).mockResolvedValue(ohlc);
        vi.mocked(getCoinMarketChart).mockResolvedValue(market);
    });
    afterEach(() => cleanup());

    it('loads the coin and its default candlestick chart', async () => {
        render(<CoinDetail />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Bitcoin (btc)' })).toBeInTheDocument());

        expect(getCoinDetail).toHaveBeenCalledWith('bitcoin', expect.any(AbortSignal));
        expect(getCoinOhlc).toHaveBeenCalledWith('bitcoin', 7, expect.any(AbortSignal));
        expect(screen.getByTestId('chart')).toHaveAttribute('data-series-count', '1');
    });

    it('switches to the line chart after selecting Line', async () => {
        render(<CoinDetail />);
        await waitFor(() => expect(screen.getByRole('button', { name: 'Line' })).toBeInTheDocument());

        fireEvent.click(screen.getByRole('button', { name: 'Line' }));

        await waitFor(() => expect(getCoinMarketChart).toHaveBeenCalledWith(
            'bitcoin',
            7,
            expect.any(AbortSignal),
        ));
        expect(screen.getByTestId('chart')).toHaveAttribute('data-series-count', '2');
    });
});