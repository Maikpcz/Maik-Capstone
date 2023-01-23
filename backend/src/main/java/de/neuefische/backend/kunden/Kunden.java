package de.neuefische.backend.kunden;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
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
    private String bild;
    private String ownerID;
}
