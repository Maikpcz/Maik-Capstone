package de.neuefische.backend.customer;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerStatus {
    public final static String OPEN = "OPEN";
    public final static String DECLINED = "DECLINED";
    public final static String ASSUMED = "ASSUMED";
}
