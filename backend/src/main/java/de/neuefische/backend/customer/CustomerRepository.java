package de.neuefische.backend.customer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends MongoRepository<Customer,String> {
    List<Customer> findAllByCreatedBy(String createdBy);
}
