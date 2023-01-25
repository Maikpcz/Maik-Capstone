package de.neuefische.backend.kunden;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class customer {
    private String id;
    private String firstname;
    private String surnname;
    private String adress;
    private String postalCode;
    private int phonenumber;
    private String status;
    private int credit;
    private String reason;
    private String describtion;
    private String notes;
    private String createdBy;
}
