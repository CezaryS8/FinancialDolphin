package dev.cezarys8.fdserver.wallet.deposit;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DepositController {
	
	private DepositService depositService;
	
	private DepositRepository depositRepository;
	
	public DepositController(DepositService depositService, DepositRepository depositRepository) {
		this.depositService = depositService;
		this.depositRepository = depositRepository;
	}
	
	@GetMapping("/users/{username}/deposits")
	public List<Deposit> retrieveDeposits(@PathVariable String username) {
		return depositRepository.findByUsername(username);
	}

	@GetMapping("/users/{username}/deposits/{id}")
	public Deposit retrieveDeposit(@PathVariable String username,
			@PathVariable int id) {
		return depositRepository.findById(id).get();
	}

	@DeleteMapping("/users/{username}/deposits/{id}")
	public ResponseEntity<Void> deleteDeposit(@PathVariable String username,
			@PathVariable int id) {
		depositRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{username}/deposits/{id}")
	public Deposit updateDeposit(@PathVariable String username,
			@PathVariable int id, @RequestBody Deposit deposit) {
		depositRepository.save(deposit);
		return deposit;
	}

	@PostMapping("/users/{username}/deposits")
	public Deposit createDeposit(@PathVariable String username,
			 @RequestBody Deposit deposit) {
//		deposit.setUsername(username);
//		deposit.setId(null);
		return depositRepository.save(deposit);
	}

}
