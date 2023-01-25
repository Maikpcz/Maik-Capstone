package de.neuefische.backend.customer;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")

public class customerController {

    private final customerService customerService;

    @GetMapping
    public List<customer> getAll(){
        return customerService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<customer> getById(@RequestBody String id){
        return customerService.findByID(id);
    }

    @PostMapping
    public customer create (@RequestBody customer customer) {
        return customerService.create(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        customerService.deleteById(id);
    }
}
