package de.neuefische.backend.file;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

@Generated
@Data
@NoArgsConstructor
@AllArgsConstructor

public class FileMetadata {
    private String id;
    private String name;
    private String contentType;
    private long size;
    private String createdBy;
}
