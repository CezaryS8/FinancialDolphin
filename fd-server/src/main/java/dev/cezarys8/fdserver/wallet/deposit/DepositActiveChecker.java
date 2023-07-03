package dev.cezarys8.fdserver.wallet.deposit;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class DepositActiveChecker {

    private final DepositRepository depositRepository;

    public DepositActiveChecker(DepositRepository depositRepository) {
        this.depositRepository = depositRepository;
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *") // Runs at midnight every day
    public void updateIsActiveColumn() {
        LocalDate today = LocalDate.now();

        depositRepository.updateIsActiveByMaturityDate(today);
    }
}
