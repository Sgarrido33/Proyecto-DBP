package com.example.palplants;

public class Plant {
    private String species;
    private String inscriptionDate;
    private int initialAge;
    private String user;

    public Plant(String species, String inscriptionDate, int initialAge, String user) {
        this.species = species;
        this.inscriptionDate = inscriptionDate;
        this.initialAge = initialAge;
        this.user = user;
    }

    // Métodos getters y setters

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getInscriptionDate() {
        return inscriptionDate;
    }

    public void setInscriptionDate(String inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public int getInitialAge() {
        return initialAge;
    }

    public void setInitialAge(int initialAge) {
        this.initialAge = initialAge;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
