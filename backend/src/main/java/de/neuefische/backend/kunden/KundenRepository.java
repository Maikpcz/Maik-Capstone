package de.neuefische.backend.kunden;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KundenRepository extends MongoRepository<Kunden,String> {
    List<Kunden> findAllByCreatedBy(String createdBy);
}
