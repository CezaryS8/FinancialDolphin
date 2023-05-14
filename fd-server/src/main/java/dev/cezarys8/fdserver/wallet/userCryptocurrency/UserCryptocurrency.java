package dev.cezarys8.fdserver.wallet.userCryptocurrency;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class UserCryptocurrency {

    public UserCryptocurrency() {

    }
    public UserCryptocurrency(Integer id, String username, String name, LocalDate openingDate, BigDecimal amount, Integer currencyId) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.openingDate = openingDate;
        this.amount = amount;
        this.currencyId = currencyId;
    }

    @Id
    @GeneratedValue
    private Integer id;
    private String username;
    private String name;
    private LocalDate openingDate;
    private BigDecimal amount;
    private Integer currencyId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Integer currencyId) {
        this.currencyId = currencyId;
    }

    @Override
    public String toString() {
        return "Cryptocurrency{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", openingDate=" + openingDate +
                ", amount=" + amount +
                ", currencyId=" + currencyId +
                '}';
    }
}
