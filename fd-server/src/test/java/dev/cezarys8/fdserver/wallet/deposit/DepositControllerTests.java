package dev.cezarys8.fdserver.wallet.deposit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class DepositControllerTests {

    @Mock
    private DepositService depositService;

    @Mock
    private DepositRepository depositRepository;

    private DepositController depositController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        depositController = new DepositController(depositService, depositRepository);
    }

    @Test
    public void testRetrieveDeposits() {
        String username = "czarek";

        Deposit sampleDeposit = new Deposit();
        sampleDeposit.setId(1);
        sampleDeposit.setUsername(username);

        when(depositRepository.findByUsername(username)).thenReturn(Arrays.asList(sampleDeposit));

        List<Deposit> result = depositController.retrieveDeposits(username);

        assertEquals(1, result.size());
        assertEquals(sampleDeposit, result.get(0));

        verify(depositRepository).findByUsername(username);
    }

    @Test
    public void testRetrieveDeposit() {
        String username = "czarek";
        Integer id = 1;

        Deposit sampleDeposit = new Deposit();
        sampleDeposit.setId(1);
        sampleDeposit.setUsername("czarek");

        when(depositRepository.findById(id)).thenReturn(Optional.of(sampleDeposit));

        Deposit result = depositController.retrieveDeposit(username, id);

        assertEquals(sampleDeposit, result);

        verify(depositRepository).findById(id);
    }

    @Test
    public void testUpdateDeposit() {
        String username = "czarek";
        int id = 1;

        Deposit sampleDeposit = new Deposit();
        sampleDeposit.setId(id);
        sampleDeposit.setUsername(username);

        Deposit result = depositController.updateDeposit(username, id, sampleDeposit);

        assertEquals(sampleDeposit, result);

        verify(depositRepository).save(sampleDeposit);
    }

    @Test
    public void testCreateDeposit() {
        String username = "czarek";

        Deposit sampleDeposit = new Deposit();
        sampleDeposit.setId(1);
        sampleDeposit.setUsername(username);

        when(depositRepository.save(sampleDeposit)).thenReturn(sampleDeposit);

        Deposit result = depositController.createDeposit(username, sampleDeposit);

        assertEquals(sampleDeposit, result);

        verify(depositRepository).save(sampleDeposit);
    }

    //TODO: other tests
}