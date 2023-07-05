package dev.cezarys8.fdserver.wallet.deposit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{
	
	List<Deposit> findByUsername(String username);

	@Query("select SUM(d.amount) as total_value from Deposit d where d.username = :username and d.isActive = true")
	BigDecimal getSumOfUserActiveDeposits(String username);

	@Transactional
	@Modifying
	@Query("UPDATE Deposit d SET d.isActive = false WHERE d.maturityDate <= :today")
	void updateIsActiveByMaturityDate(LocalDate today);

	@Query("SELECT d "+
			"FROM Deposit d " +
			"WHERE d.username = :username and (YEAR(d.openingDate) = :year OR Year(d.maturityDate) = :year) " +
			"ORDER BY d.openingDate")
	List<Deposit> getUserDepositsByYear(String username, int year);

}
