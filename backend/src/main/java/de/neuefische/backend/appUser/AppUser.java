package de.neuefische.backend.appUser;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor

public class AppUser {
    private String id;
    private String username;
    private String password;
}
