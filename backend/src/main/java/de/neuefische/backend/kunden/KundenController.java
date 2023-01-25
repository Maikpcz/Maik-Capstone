package de.neuefische.backend.kunden;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/kunden")

public class KundenController {

    private final KundenService kundenService;

    @GetMapping
    public List<Kunden> getAll(){
        return kundenService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Kunden> getById(@RequestBody String id){
        return kundenService.findByID(id);
    }

    @PostMapping
    public Kunden create (@RequestBody Kunden kunden) {
        return kundenService.create(kunden);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable String id){
        kundenService.deleteById(id);
    }
}
