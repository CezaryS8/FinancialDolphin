package dev.cezarys8.fdserver.wallet.cryptocurrency;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CryptocurrencyRepository extends JpaRepository<Cryptocurrency, Integer> {

}
