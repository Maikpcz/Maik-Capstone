package de.neuefische.backend.customer;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Customer {
    private String id;
    private String firstname;
    private String surname;
    private String address;
    private String postalCode;
    private long phonenumber;
    private String status;
    private int credit;
    private String reason;
    private String description;
    private String notes;
    private String imgId;
    private String createdBy;
}
