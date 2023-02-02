package de.neuefische.backend.appuser;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppUser {
    private String id;
    private String username;
    private String password;
}
