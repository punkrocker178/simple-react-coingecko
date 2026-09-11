export type CoinGeckoNumberMap = Record<string, number | null>;
export type CoinGeckoDateMap = Record<string, string | null>;

export interface CoinGeckoRoi {
  times: number | null;
  currency: string | null;
  percentage: number | null;
}

export interface CoinGeckoImage {
  thumb: string;
  small: string;
  large: string;
}

export interface CoinGeckoPlatformDetails {
  decimal_place: number | null;
  contract_address: string;
}

export interface CoinGeckoLinks {
  homepage: string[];
  whitepaper: string | null;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: string | null;
  twitter_screen_name: string | null;
  facebook_username: string | null;
  bitcointalk_thread_identifier: number | null;
  telegram_channel_identifier: string | null;
  subreddit_url: string | null;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

export interface CoinGeckoSparkline {
  price: number[];
}

export interface CoinMarketsItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
  roi: CoinGeckoRoi | null;
  last_updated: string;
  market_cap_rank_with_rehypothecated?: number | null;
  sparkline_in_7d?: CoinGeckoSparkline;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  price_change_percentage_14d_in_currency?: number | null;
  price_change_percentage_30d_in_currency?: number | null;
  price_change_percentage_200d_in_currency?: number | null;
  price_change_percentage_1y_in_currency?: number | null;
}

export type CoinMarketsResponse = CoinMarketsItem[];

export interface CoinGeckoCategoryDetails {
  id: string;
  name: string;
}

export interface CoinGeckoIcoData {
  ico_start_date: string | null;
  ico_end_date: string | null;
  short_desc: string | null;
  description: string | null;
  links: Record<string, string>;
  softcap_currency: string | null;
  hardcap_currency: string | null;
  total_raised_currency: string | null;
  softcap_amount: number | null;
  hardcap_amount: number | null;
  total_raised: number | null;
  quote_pre_sale_currency: string | null;
  base_pre_sale_amount: number | null;
  quote_pre_sale_amount: number | null;
  quote_public_sale_currency: string | null;
  base_public_sale_amount: number | null;
  quote_public_sale_amount: number | null;
  accepting_currencies: string | null;
  country_origin: string | null;
  pre_sale_start_date: string | null;
  pre_sale_end_date: string | null;
  whitelist_url: string | null;
  whitelist_start_date: string | null;
  whitelist_end_date: string | null;
  bounty_detail_url: string | null;
  amount_for_sale: number | null;
  kyc_required: boolean | null;
  whitelist_available: boolean | null;
  pre_sale_available: boolean | null;
  pre_sale_ended: boolean | null;
}

export interface CoinGeckoStatusUpdate {
  description: string;
  category: string;
  created_at: string;
  user: string;
  user_title: string;
}

export interface CoinGeckoMarketData {
  current_price: CoinGeckoNumberMap;
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: CoinGeckoRoi | null;
  ath: CoinGeckoNumberMap;
  ath_change_percentage: CoinGeckoNumberMap;
  ath_date: CoinGeckoDateMap;
  atl: CoinGeckoNumberMap;
  atl_change_percentage: CoinGeckoNumberMap;
  atl_date: CoinGeckoDateMap;
  market_cap: CoinGeckoNumberMap;
  fully_diluted_valuation: CoinGeckoNumberMap;
  market_cap_fdv_ratio: number | null;
  market_cap_rank: number | null;
  outstanding_token_value_usd: number | null;
  market_cap_rank_with_rehypothecated: number | null;
  total_volume: CoinGeckoNumberMap;
  high_24h: CoinGeckoNumberMap;
  low_24h: CoinGeckoNumberMap;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  price_change_percentage_14d: number | null;
  price_change_percentage_30d: number | null;
  price_change_percentage_60d: number | null;
  price_change_percentage_200d: number | null;
  price_change_percentage_1y: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  price_change_24h_in_currency: CoinGeckoNumberMap;
  price_change_percentage_1h_in_currency: CoinGeckoNumberMap;
  price_change_percentage_24h_in_currency: CoinGeckoNumberMap;
  price_change_percentage_7d_in_currency: CoinGeckoNumberMap;
  price_change_percentage_14d_in_currency: CoinGeckoNumberMap;
  price_change_percentage_30d_in_currency: CoinGeckoNumberMap;
  price_change_percentage_60d_in_currency: CoinGeckoNumberMap;
  price_change_percentage_200d_in_currency: CoinGeckoNumberMap;
  price_change_percentage_1y_in_currency: CoinGeckoNumberMap;
  market_cap_change_24h_in_currency: CoinGeckoNumberMap;
  market_cap_change_percentage_24h_in_currency: CoinGeckoNumberMap;
  total_supply: number | null;
  max_supply: number | null;
  max_supply_infinite: boolean;
  circulating_supply: number | null;
  outstanding_supply: number | null;
  last_updated: string;
  sparkline_7d?: CoinGeckoSparkline;
}

export interface CoinGeckoTicker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: {
    btc: number;
    eth: number;
    usd: number;
  };
  converted_volume: {
    btc: number;
    eth: number;
    usd: number;
  };
  trust_score: string | null;
  bid_ask_spread_percentage: number | null;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string | null;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id: string | null;
  coin_mcap_usd: number | null;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<string, CoinGeckoPlatformDetails>;
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  categories_details?: CoinGeckoCategoryDetails[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  has_supply_breakdown: boolean;
  localization?: Record<string, string>;
  description: Record<string, string>;
  links: CoinGeckoLinks;
  image: CoinGeckoImage;
  country_origin: string;
  genesis_date: string | null;
  ico_data?: CoinGeckoIcoData | null;
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
  watchlist_portfolio_users: number | null;
  market_cap_rank: number | null;
  market_cap_rank_with_rehypothecated: number | null;
  market_data?: CoinGeckoMarketData;
  status_updates: CoinGeckoStatusUpdate[];
  last_updated: string;
  tickers?: CoinGeckoTicker[];
}

export type CoinMarketsOrder =
  | "market_cap_asc"
  | "market_cap_desc"
  | "volume_asc"
  | "volume_desc"
  | "id_asc"
  | "id_desc";

export type CoinMarketsIncludeTokens = "top" | "all";
export type CoinMarketsPrecision = "full" | `${number}`;
export type CoinMarketsLocale =
  | "ar"
  | "bg"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "fi"
  | "fr"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "lt"
  | "nl"
  | "no"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "sv"
  | "th"
  | "tr"
  | "uk"
  | "vi"
  | "zh"
  | "zh-tw";

export interface CoinMarketsQuery {
  vs_currency: string;
  ids?: string;
  names?: string;
  symbols?: string;
  include_tokens?: CoinMarketsIncludeTokens;
  category?: string;
  order?: CoinMarketsOrder;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
  locale?: CoinMarketsLocale;
  precision?: CoinMarketsPrecision;
  include_rehypothecated?: boolean;
}

export type CoinDetailDexPairFormat = "contract_address" | "symbol";

export interface CoinDetailQuery {
  localization?: boolean;
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
  include_categories_details?: boolean;
  dex_pair_format?: CoinDetailDexPairFormat;
}
