package de.neuefische.backend.kunden;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KundenRepository extends MongoRepository<Kunden,String> {
}
