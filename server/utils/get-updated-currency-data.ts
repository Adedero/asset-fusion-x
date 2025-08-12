import type { Currency } from "../generated/prisma/client";
import axios from "axios";
import { prisma } from "../lib/prisma";

const COINLAYER_API = process.env.COINLAYER_API;
const COINLAYER_API_KEY = process.env.COINLAYER_API_KEY;

export default async function getUpdatedCurrencyData(
  currency: Currency,
): Promise<Currency> {
  const ONE_DAY_AGO = new Date().getTime() - 24 * 60 * 60 * 1000;
  const updatedAt = currency.rateUpdatedAt
    ? new Date(currency.rateUpdatedAt).getTime()
    : null;

  if (!updatedAt || updatedAt < ONE_DAY_AGO) {
    try {
      const uri = `${COINLAYER_API}/live?access_key=${COINLAYER_API_KEY}&target=USD&symbols=${currency.symbol.toUpperCase()}`;
      const response = await axios.get(uri);
      const data = response.data as Record<string, unknown>;
      if (!data.error) {
        const coinbaseRate = (data.rates as Record<string, number>)[
          currency.symbol.toUpperCase()
        ];
        if (coinbaseRate) {
          const updatedCurrency = await prisma.currency.update({
            where: { id: currency.id },
            data: {
              rate: coinbaseRate,
              rateUpdatedAt: new Date(),
            },
          });
          return updatedCurrency;
        }
        return currency;
      }

      return currency;
    } catch (error) {
      logger.error(
        `Failed to retrieve new rate for ${currency.name} from Coinbase`,
        error as Error,
      );
      return currency;
    }
  } else {
    return currency;
  }
}
