package de.neuefische.backend.customer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface customerRepository extends MongoRepository<customer,String> {
    List<customer> findAllByCreatedBy(String createdBy);
}
