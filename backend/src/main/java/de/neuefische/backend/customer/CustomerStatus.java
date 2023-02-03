package de.neuefische.backend.customer;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomerStatus {
    public static final String OPEN = "OPEN";
    public static final String DECLINED = "DECLINED";
    public static final String ASSUMED = "ASSUMED";
}
