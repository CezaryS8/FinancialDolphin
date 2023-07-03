package dev.cezarys8.fdserver.wallet.cryptocurrency;

import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import org.json.JSONArray;
import org.json.JSONObject;
@Component
public class CryptocurrencyDataFetcher {
    private final String API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    private CryptocurrencyRepository cryptocurrencyRepository;

    public CryptocurrencyDataFetcher(CryptocurrencyRepository cryptocurrencyRepository) {
        this.cryptocurrencyRepository = cryptocurrencyRepository;
    }

    @PostConstruct
    @Transactional
    @Scheduled(cron = "0 0 * * * *")
    public void fetchAndSaveCryptocurrencyData() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(API_URL, String.class);

        JSONArray coinsArray = new JSONArray(response);
        for (int i = 0; i < coinsArray.length(); i++) {
            JSONObject coinObject = coinsArray.getJSONObject(i);

            String id = coinObject.getString("id");
            String symbol = coinObject.getString("symbol");
            String image = coinObject.getString("image");
            double currentPrice = coinObject.getDouble("current_price");

            Cryptocurrency cryptocurrency = new Cryptocurrency();
            cryptocurrency.setId(id);
            cryptocurrency.setSymbol(symbol);
            cryptocurrency.setImage(image);
            cryptocurrency.setCurrentPrice(currentPrice);

            cryptocurrencyRepository.save(cryptocurrency);
        }
    }
}