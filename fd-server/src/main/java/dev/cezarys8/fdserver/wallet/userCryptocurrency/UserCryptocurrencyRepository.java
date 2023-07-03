package dev.cezarys8.fdserver.wallet.userCryptocurrency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface UserCryptocurrencyRepository extends JpaRepository<UserCryptocurrency, Integer> {
    List<UserCryptocurrency> findByUsername(String username);

    @Query("select SUM(uc.amount) as total_value " + "from UserCryptocurrency uc where uc.username = :username")
    BigDecimal getSumOfUserCryptocurrencies(String username);

}
