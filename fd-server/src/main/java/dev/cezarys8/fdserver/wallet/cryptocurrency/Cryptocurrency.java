package dev.cezarys8.fdserver.wallet.cryptocurrency;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cryptocurrency {
    @Id
    private String id;

    private String symbol;

    private String image;

    private double currentPrice;

    public String getId() {
        return id;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getImage() {
        return image;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    @Override
    public String toString() {
        return "Cryptocurrency{" +
                "id='" + id + '\'' +
                ", symbol='" + symbol + '\'' +
                ", image='" + image + '\'' +
                ", currentPrice=" + currentPrice +
                '}';
    }
}
