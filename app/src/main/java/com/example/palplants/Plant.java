package com.example.palplants;

public class Plant {
    private String plantId;
    private String species;
    private String username;
    private int initialAge;
    private int quantity;

    public Plant(String plantId, String species, String username, int initialAge, int quantity) {
        this.plantId = plantId;
        this.species = species;
        this.username = username;
        this.initialAge = initialAge;
        this.quantity = quantity;
    }

    public String getPlantId() {
        return plantId;
    }

    public void setPlantId(String plantId) {
        this.plantId = plantId;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getInitialAge() {
        return initialAge;
    }

    public void setInitialAge(int initialAge) {
        this.initialAge = initialAge;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
