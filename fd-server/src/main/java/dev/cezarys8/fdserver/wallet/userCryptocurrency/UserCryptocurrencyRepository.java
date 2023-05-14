package dev.cezarys8.fdserver.wallet.userCryptocurrency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCryptocurrencyRepository extends JpaRepository<UserCryptocurrency, Integer> {
    List<UserCryptocurrency> findByUsername(String username);

}
