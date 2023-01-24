package de.neuefische.backend.kunden;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Kunden {
    private String id;
    private String vorname;
    private String nachname;
    private String adresse;
    private String postleihzahl;
    private int telefonnummer;
    private String status;
    private int kredit;
    private String grund;
    private String beschreibung;
    private String notizen;
    private String ownerID;
}
