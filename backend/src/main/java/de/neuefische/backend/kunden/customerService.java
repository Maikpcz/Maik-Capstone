package de.neuefische.backend.kunden;

import de.neuefische.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class customerService {

    private final customerRepository customerRepository;
    private final AppUserService appUserService;

    public List<customer> getAll() {
        return customerRepository.findAllByCreatedBy(
                appUserService.getAuthenticatedUser().getId()
        );
    }

    public customer create(customer customer) {
        customer.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        customer.setStatus(customerStatus.OPEN);
        return customerRepository.save(customer);
    }

    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }

    public Optional<customer> findByID(String id) {
        return customerRepository.findById(id);
    }
}
