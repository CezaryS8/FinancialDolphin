package dev.cezarys8.fdserver.deposit.repository;

import dev.cezarys8.fdserver.deposit.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{
	
	List<Deposit> findByUsername(String username);

}
