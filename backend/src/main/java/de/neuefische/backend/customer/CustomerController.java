package de.neuefische.backend.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers")

public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<Customer> getAll(){
        return customerService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getById(@PathVariable String id){
        return customerService.findByID(id);
    }

    @PostMapping
    public Customer create (@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    @PutMapping
    public  Customer save (@RequestBody Customer customer){
        return customerService.save(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        customerService.deleteById(id);
    }
    @PostMapping("/status/assumed")
    public Customer setStatusAssumed(@RequestBody Customer customer){
        return customerService.setStatusAssumed(customer);
    }

    @PostMapping ("/status/declined")
    public Customer setStatusDeclined(@RequestBody Customer customer){
        return customerService.setStatusDeclined(customer);
    }
}
