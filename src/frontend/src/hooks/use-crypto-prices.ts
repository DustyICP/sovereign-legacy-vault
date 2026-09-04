import type { PriceMap } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

/**
 * CoinGecko Keyless Public API — no API key required. Response shape:
 * `{ [coinId]: { usd: number } }`.
 */
const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price";

/** Map a vault asset symbol to its CoinGecko coin id. */
export function symbolToCoinId(symbol: string): string | null {
  const map: Record<string, string> = {
    ICP: "internet-computer",
    BTC: "bitcoin",
    ETH: "ethereum",
    USDC: "usd-coin",
    USDT: "tether",
    SOL: "solana",
    DOT: "polkadot",
  };
  return map[symbol.toUpperCase()] ?? null;
}

/**
 * Fetch live USD prices for the given CoinGecko coin ids. Deduplicates ids,
 * caches for 60s, and refetches on a 60s interval so the Wallet page always
 * shows fresh per-asset and portfolio USD values. Returns an empty map when
 * there are no ids or the feed is unavailable.
 */
export function useCryptoPrices(coinIds: string[]) {
  const ids = [...new Set(coinIds.filter((id) => id.length > 0))];

  return useQuery({
    queryKey: ["crypto-prices", ids],
    queryFn: async (): Promise<PriceMap> => {
      if (ids.length === 0) return {};
      const params = new URLSearchParams({
        ids: ids.join(","),
        vs_currencies: "usd",
      });
      const res = await fetch(`${COINGECKO_URL}?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Price feed error: ${res.status}`);
      }
      const data = (await res.json()) as Record<string, { usd?: number }>;
      const prices: PriceMap = {};
      for (const id of ids) {
        const usd = data[id]?.usd;
        if (typeof usd === "number") prices[id] = usd;
      }
      return prices;
    },
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}
