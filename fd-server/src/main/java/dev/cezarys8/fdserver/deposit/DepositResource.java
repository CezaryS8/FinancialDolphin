package dev.cezarys8.fdserver.deposit;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//public class DepositResource {
//
//	private DepositService depositService;
//
//	public DepositResource(DepositService depositService) {
//		this.depositService = depositService;
//	}
//
//	@GetMapping("/users/{username}/deposit")
//	public List<Deposit> retrieveDeposits(@PathVariable String username) {
//		return depositService.findByUsername(username);
//	}
//
//	@GetMapping("/users/{username}/deposits/{id}")
//	public Deposit retrieveDeposit(@PathVariable String username,
//			@PathVariable int id) {
//		return depositService.findById(id);
//	}
//
//	@DeleteMapping("/users/{username}/deposits/{id}")
//	public ResponseEntity<Void> deleteDeposit(@PathVariable String username,
//			@PathVariable int id) {
//		depositService.deleteById(id);
//		return ResponseEntity.noContent().build();
//	}
//
//	@PutMapping("/users/{username}/deposits/{id}")
//	public Deposit updateDeposit(@PathVariable String username,
//			@PathVariable int id, @RequestBody Deposit deposit) {
//		depositService.updateDeposit(deposit);
//		return deposit;
//	}
//
//	@PostMapping("/users/{username}/deposits")
//	public Deposit createDeposit(@PathVariable String username,
//			 @RequestBody Deposit deposit) {
//		Deposit createdDeposit = depositService.addDeposit(username, deposit.getDescription(),
//				deposit.getTargetDate(),deposit.isDone() );
//
//		return createdDeposit;
//	}
//
//}
