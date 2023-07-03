package dev.cezarys8.fdserver.wallet.userCryptocurrency;

import dev.cezarys8.fdserver.wallet.deposit.Deposit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserCryptocurrencyController {

    private UserCryptocurrencyRepository userCryptocurrencyRepository;

    public UserCryptocurrencyController(UserCryptocurrencyRepository userCryptocurrencyRepository) {
        this.userCryptocurrencyRepository = userCryptocurrencyRepository;
    }

    @GetMapping("/users/{username}/cryptocurrencies")
    public List<UserCryptocurrency> retrieveUserCryptocurrencies(@PathVariable String username) {
        return userCryptocurrencyRepository.findByUsername(username);
    }

    @GetMapping("/users/{username}/cryptocurrencies/{id}")
    public UserCryptocurrency retrieveUserCryptocurrency(@PathVariable String username,
                                   @PathVariable int id) {
        return userCryptocurrencyRepository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/cryptocurrencies/{id}")
    public ResponseEntity<Void> deleteUserCryptocurrency(@PathVariable String username,
                                              @PathVariable int id) {
        userCryptocurrencyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/cryptocurrencies/{id}")
    public UserCryptocurrency updateUserCryptocurrency(@PathVariable String username,
                                 @PathVariable int id, @RequestBody UserCryptocurrency userCryptocurrency) {
        userCryptocurrencyRepository.save(userCryptocurrency);
        return userCryptocurrency;
    }

    @PostMapping("/users/{username}/cryptocurrencies")
    public UserCryptocurrency createUserCryptocurrency(@PathVariable String username,
                                 @RequestBody UserCryptocurrency userCryptocurrency) {
        userCryptocurrency.setUsername(username);
        userCryptocurrency.setId(null);
        return userCryptocurrencyRepository.save(userCryptocurrency);
    }

}
