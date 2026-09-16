import { EchartWrapper } from './echart-wrapper';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const { dispose, init, setOption } = vi.hoisted(() => ({
    dispose: vi.fn(),
    init: vi.fn(),
    setOption: vi.fn(),
}));

vi.mock('./echartsConfig', () => ({
    default: { init },
}));

describe('EchartWrapper', () => {
    afterEach(() => {
        cleanup();
        dispose.mockReset();
        init.mockReset();
        setOption.mockReset();
    });

    it('shows a no-data state without initializing ECharts', () => {
        render(<EchartWrapper />);

        expect(screen.getByText('No data')).toBeInTheDocument();
        expect(init).not.toHaveBeenCalled();
    });

    it('initializes the chart and disposes it on unmount', () => {
        const chart = { dispose, setOption };
        init.mockReturnValue(chart);
        const options = { title: { text: 'Price' } };

        const { unmount } = render(<EchartWrapper options={options} />);
        expect(init).toHaveBeenCalledWith(expect.any(HTMLDivElement));
        expect(setOption).toHaveBeenCalledWith(options);

        unmount();
        expect(dispose).toHaveBeenCalledOnce();
    });
});