package de.neuefische.backend.kunden;

import de.neuefische.backend.appUser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class KundenService {

    private final KundenRepository kundenRepository;
    private final AppUserService appUserService;

    public List<Kunden> getAll() {
        return kundenRepository.findAllByCreatedBy(
                appUserService.getAuthenticatedUser().getId()
        );
    }

    public Kunden create(Kunden kunden) {
        kunden.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        return kundenRepository.save(kunden);
    }

    public void deleteById(String id) {
        kundenRepository.deleteById(id);
    }

    public Optional<Kunden> findByID(String id) {
        return kundenRepository.findById(id);
    }
}
