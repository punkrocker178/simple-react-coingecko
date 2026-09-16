import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    getCoinDetail,
    getCoinMarketChart,
    getCoinOhlc,
    getMarketCoins,
} from './coin-service';

const { get } = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock('axios', () => ({
    default: { get },
}));

describe('coin service', () => {
    beforeEach(() => get.mockReset());

    it('gets market coins and forwards the abort signal', async () => {
        const coins = [{ id: 'bitcoin' }];
        const signal = new AbortController().signal;
        get.mockResolvedValue({ data: coins });

        await expect(getMarketCoins(signal)).resolves.toBe(coins);
        expect(get).toHaveBeenCalledWith('/api/coins/markets', { signal });
    });

    it('gets a coin detail by id', async () => {
        const detail = { id: 'bitcoin' };
        get.mockResolvedValue({ data: detail });

        await expect(getCoinDetail('bitcoin')).resolves.toBe(detail);
        expect(get).toHaveBeenCalledWith('/api/coins/bitcoin', {
            signal: undefined,
        });
    });

    it('gets OHLC data with the requested number of days', async () => {
        const ohlc = [[1, 2, 3, 4, 5]];
        const signal = new AbortController().signal;
        get.mockResolvedValue({ data: ohlc });

        await expect(getCoinOhlc('bitcoin', 7, signal)).resolves.toBe(ohlc);
        expect(get).toHaveBeenCalledWith('/api/coins/bitcoin/ohlc', {
            params: { days: 7 },
            signal,
        });
    });

    it('gets market chart data with the requested number of days', async () => {
        const chart = { prices: [], market_caps: [], total_volumes: [] };
        get.mockResolvedValue({ data: chart });

        await expect(getCoinMarketChart('bitcoin', 30)).resolves.toBe(chart);
        expect(get).toHaveBeenCalledWith('/api/coins/bitcoin/market_chart', {
            params: { days: 30 },
            signal: undefined,
        });
    });

});