package dev.cezarys8.fdserver.wallet.deposit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{
	
	List<Deposit> findByUsername(String username);

}
