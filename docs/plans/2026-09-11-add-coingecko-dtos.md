# Plan: Add CoinGecko DTOs

**Status:** Completed

Add application-wide TypeScript DTOs for CoinGecko `/coins/markets` and `/coins/{id}`, then type the existing Axios calls. The complete documented detail response will be modeled in a shared module usable by both Nitro and React, without adding runtime validation or dependencies.

## Steps

1. Create `src/models/coin-gecko.ts` containing:
   - Reusable currency-map, ROI, image, platform, links, status, and sparkline types.
   - `CoinMarketsItem` and `CoinMarketsResponse`.
   - Complete `CoinDetail` and nested `market_data`/ticker types.
   - `CoinMarketsQuery` and `CoinDetailQuery` request types.
2. Type the Axios response in `src/server/api/coins/markets.ts`.
3. Type the Axios response in `src/server/api/coins/[id].ts`.
4. Preserve current route behavior, including the USD default and path-only detail requests.
5. Run `npm run lint` and `npm run build`.

## Relevant files

- `src/models/coin-gecko.ts` — shared DTO module usable by server and React.
- `src/server/api/coins/markets.ts` — typed markets response.
- `src/server/api/coins/[id].ts` — typed detail response.

## Decisions

- TypeScript DTOs only; no runtime schemas or new dependencies.
- Model the complete `/coins/{id}` response.
- Keep DTOs under `src/models` so both server and React can import the same contract.
- Do not add query forwarding or frontend projections yet.
- Exclude removed `community_data` and `developer_data` response fields.

## Verification

1. `npm run lint` passes.
2. `npm run build` passes.
3. Confirm nullable CoinGecko fields and optional response sections are represented correctly.

## Results

- Added shared DTOs in `src/models/coin-gecko.ts` for markets, coin details, nested market data, tickers, and documented query parameters.
- Typed both CoinGecko Axios responses and typed the markets query boundary.
- `npm run build` passes, including TypeScript and Nitro bundling.
- Editor diagnostics report no errors in the new model or modified handlers.
- `npm run lint` is blocked only by the existing Fast Refresh export error in `src/components/ui/button.tsx`; the modified handler no longer has lint errors.
