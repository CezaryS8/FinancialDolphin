package dev.cezarys8.fdserver.wallet.deposit;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
public class Deposit {

	public Deposit() {
		
	}

	public Deposit(Integer id, String username, String name, Double interest, String bank, LocalDate maturityDate, LocalDate openingDate, BigDecimal amount, BigDecimal profit, BigDecimal tax, boolean isActive, String interestType, Integer currencyId) {
		this.id = id;
		this.username = username;
		this.name = name;
		this.interest = interest;
		this.bank = bank;
		this.maturityDate = maturityDate;
		this.openingDate = openingDate;
		this.amount = amount;
		this.profit = profit;
		this.tax = tax;
		this.isActive = isActive;
		this.interestType = interestType;
		this.currencyId = currencyId;
	}

	@Id
	@GeneratedValue
	private Integer id;

	private String username;

	private String name;
	private Double interest;
	private String bank;
	private LocalDate maturityDate;
	private LocalDate openingDate;
	private BigDecimal amount;
	private BigDecimal profit;
	private BigDecimal tax;
	private boolean isActive;
	private String interestType;
	private Integer currencyId;
//	private String description;
//	private LocalDate targetDate;
//	private boolean done;

	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getId() {
		return id;
	}
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getInterest() {
		return interest;
	}

	public void setInterest(Double interest) {
		this.interest = interest;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public LocalDate getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(LocalDate maturityDate) {
		this.maturityDate = maturityDate;
	}

	public LocalDate getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(LocalDate openingDate) {
		this.openingDate = openingDate;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getProfit() {
		return profit;
	}

	public void setProfit(BigDecimal profit) {
		this.profit = profit;
	}

	public BigDecimal getTax() {
		return tax;
	}

	public void setTax(BigDecimal tax) {
		this.tax = tax;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean active) {
		isActive = active;
	}

	public String getInterestType() {
		return interestType;
	}

	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}

	public Integer getCurrencyId() {
		return currencyId;
	}

	public void setCurrencyId(Integer currencyId) {
		this.currencyId = currencyId;
	}

	@Override
	public String toString() {
		return "Deposit{" +
				"id=" + id +
				", username='" + username + '\'' +
				", name='" + name + '\'' +
				", interest=" + interest +
				", bank='" + bank + '\'' +
				", maturityDate=" + maturityDate +
				", openingDate=" + openingDate +
				", amount=" + amount +
				", profit=" + profit +
				", tax=" + tax +
				", isActive=" + isActive +
				", interestType='" + interestType + '\'' +
				", currencyId=" + currencyId +
				'}';
	}
}