package dev.cezarys8.fdserver.wallet.deposit;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class DepositService {
	
	private static List<Deposit> deposits = new ArrayList<>();
	
	private static int depositsCount = 0;
	
	public List<Deposit> findByUsername(String username){
		Predicate<? super Deposit> predicate =
				deposit -> deposit.getUsername().equalsIgnoreCase(username);
		return deposits.stream().filter(predicate).toList();
	}
	
	public Deposit addDeposit(String username, String name, Double interest, String bank, LocalDate maturityDate, LocalDate openingDate, BigDecimal amount, BigDecimal profit, BigDecimal tax, boolean isActive, String interestType, Integer currencyId) {
		Deposit deposit = new Deposit(++depositsCount,username,name,interest,bank,maturityDate,openingDate,amount,profit,tax,isActive,interestType,currencyId);
		deposits.add(deposit);
		return deposit;
	}
	
	public void deleteById(int id) {
		Predicate<? super Deposit> predicate = deposit -> deposit.getId() == id;
		deposits.removeIf(predicate);
	}

	public Deposit findById(int id) {
		Predicate<? super Deposit> predicate = deposit -> deposit.getId() == id;
		Deposit deposit = deposits.stream().filter(predicate).findFirst().get();
		return deposit;
	}

	public void updateDeposit(Deposit deposit) {
		deleteById(deposit.getId());
		deposits.add(deposit);
	}
}