package dev.cezarys8.fdserver.wallet.cryptocurrency;

import dev.cezarys8.fdserver.wallet.cryptocurrency.CryptocurrencyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CryptocurrencyController {
    private CryptocurrencyRepository cryptocurrencyRepository;

    public CryptocurrencyController(CryptocurrencyRepository cryptocurrencyRepository) {
        this.cryptocurrencyRepository = cryptocurrencyRepository;
    }

    @GetMapping("/cryptocurrencies")
    public List<Cryptocurrency> retrieveCryptocurrencies() {
        return cryptocurrencyRepository.findAll();
    }

    @GetMapping("/cryptocurrencies/{id}")
    public Cryptocurrency retrieveCryptocurrency(@PathVariable int id) {
        return cryptocurrencyRepository.findById(id).get();
    }
}
