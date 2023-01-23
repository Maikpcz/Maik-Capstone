package de.neuefische.backend.kunden;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kunden")

public class KundenController {

    private final KundenRepository kundenRepository;

}
