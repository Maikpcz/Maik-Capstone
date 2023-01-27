package de.neuefische.backend.customer;

import de.neuefische.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class CustomerService {

    private final CustomerRepository customerRepository;
    private final AppUserService appUserService;

    public List<Customer> getAll() {
        return customerRepository.findAllByCreatedBy(
                appUserService.getAuthenticatedUser().getId()
        );
    }

    public Customer create(Customer customer) {
        customer.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        customer.setStatus("Open");
        return customerRepository.save(customer);
    }

    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }

    public Optional<Customer> findByID(String id) {
        return customerRepository.findById(id);
    }
}
