package com.example.palplants;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import android.widget.TableLayout;
import android.view.View;

import android.widget.Button;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;

import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GardenActivity extends AppCompatActivity {

    private TableLayout tableLayout;
    private RequestQueue requestQueue;
    private List<Plant> plantList = new ArrayList<>();

    UserSession userSession = UserSession.getInstance();
    String username = userSession.getUsername();
    String email = userSession.getEmail();

    // Actualizar las vistas correspondientes con los datos del usuario

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_garden);

        tableLayout = findViewById(R.id.tableLayout);
        plantList = new ArrayList<>();
        requestQueue = Volley.newRequestQueue(this);

        // Actualizar el TextView del nombre de usuario
        TextView userNameTextView = findViewById(R.id.userNameTextView);
        userNameTextView.setText(username);

        fetchData();
    }

    private void fetchData() {
        String url = "http://192.168.0.55:5000/plantas";

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        processResponse(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(GardenActivity.this, "Error en la solicitud: " + error.toString(), Toast.LENGTH_SHORT).show();
                    }
                });

        requestQueue.add(request);
    }

    private void processResponse(JSONArray response) {
        try {
            for (int i = 0; i < response.length(); i++) {
                JSONObject jsonObject = response.getJSONObject(i);
                String species = jsonObject.getString("especie");
                String plantId = jsonObject.getString("plant_id");
                double initialAge = jsonObject.getInt("edad");
                String username = jsonObject.getString("username");
                int quantity = jsonObject.getInt("cantidad");

                Plant plant = new Plant(String.valueOf(plantId), species, username, initialAge, quantity);
                plantList.add(plant);

                addPlantToTable(species, initialAge, username, quantity, plantId);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void openPlantActivity(View view) {
        // Acciones a realizar cuando se hace clic en el botón 'addPlantButton'
        // Puedes abrir la actividad para agregar una nueva planta o realizar cualquier otra acción necesaria
        Intent intent = new Intent(this, PlantActivity.class);
        startActivityForResult(intent, REQUEST_CODE_ADD_PLANT);
    }
    private void addPlantToTable(String species, double initialAge, String user, int quantity,String plantId) {
        TableRow row = new TableRow(this);
        TableRow.LayoutParams layoutParams = new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT);

        TextView speciesTextView = new TextView(this);
        speciesTextView.setText(species);
        speciesTextView.setLayoutParams(layoutParams);

        TextView initialAgeTextView = new TextView(this);
        initialAgeTextView.setText(String.valueOf(initialAge));
        initialAgeTextView.setLayoutParams(layoutParams);

        TextView userTextView = new TextView(this);
        userTextView.setText(user);
        userTextView.setLayoutParams(layoutParams);

        TextView quantityTextView = new TextView(this);
        quantityTextView.setText(String.valueOf(quantity));
        quantityTextView.setLayoutParams(layoutParams);

        Button editButton=new Button(this);
        editButton.setText("Editar");
        editButton.setLayoutParams(layoutParams);
        editButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                // Acción de editar
                // Puedes abrir una nueva actividad para editar los detalles de la planta
                // o realizar cualquier otra acción necesaria
                Toast.makeText(GardenActivity.this, "Editar planta: " + species, Toast.LENGTH_SHORT).show();
            }
        });

        Button deleteButton = new Button(this);
        deleteButton.setText("Eliminar");
        deleteButton.setLayoutParams(layoutParams);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Acción de eliminar
                deletePlantFromDatabase(plantId);
                removePlantFromList(plantId);
                // Puedes mostrar un diálogo de confirmación antes de eliminar la planta
                // o realizar cualquier otra acción necesaria
                Toast.makeText(GardenActivity.this, "Eliminar planta: " + species, Toast.LENGTH_SHORT).show();
            }
        });

        row.addView(speciesTextView);
        row.addView(initialAgeTextView);
        row.addView(userTextView);
        row.addView(quantityTextView);
        row.addView(editButton);
        row.addView(deleteButton);

        tableLayout.addView(row);
    }
    // Función para eliminar una planta del registro
    private void deletePlantFromDatabase(String plantId) {
        // Realiza la solicitud al servidor para eliminar la planta correspondiente
        // Utiliza Request.Method.DELETE para enviar una solicitud de eliminación
        String url = "http://192.168.0.55:5000/plantas/" + plantId;

        JsonArrayRequest request = new JsonArrayRequest(Request.Method.DELETE, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        // Se eliminó la planta del servidor correctamente
                        // Continúa con los pasos para eliminarla de la lista y actualizar la vista
                        removePlantFromList(plantId);
                        updateTable();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(GardenActivity.this, "Error en la solicitud: " + error.toString(), Toast.LENGTH_SHORT).show();
                    }
                });

        requestQueue.add(request);
    }

    // Función para eliminar una planta de la lista plantList
    private void removePlantFromList(String plantId) {
        Iterator<Plant> iterator = plantList.iterator();
        while (iterator.hasNext()) {
            Plant plant = iterator.next();
            if (plant.getPlantId().equals(plantId)) {
                iterator.remove();
                break;
            }
        }
    }

    private static final int REQUEST_CODE_ADD_PLANT = 1;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_CODE_ADD_PLANT && resultCode == RESULT_OK) {
            // Obtener los datos de la planta registrada desde el intent
            String plantId = data.getStringExtra("plantId");
            String species = data.getStringExtra("species");
            double plantInitialAge = data.getIntExtra("plantInitialAge", 0);
            String username = data.getStringExtra("username");
            int quantity = data.getIntExtra("quantity",1);

            // Crear un objeto Plant con los datos obtenidos
            Plant plant = new Plant(plantId,species, username, plantInitialAge,quantity);

            // Agregar la nueva planta a la lista de plantas
            plantList.add(plant);

            // Actualizar la tabla de plantas
            addPlantToTable(species, plantInitialAge, username,quantity,plantId);
        }
    }


    // Función para actualizar la vista de la tabla
    private void updateTable() {
        // Limpia la tabla
        tableLayout.removeAllViews();

        // Vuelve a agregar las filas actualizadas
        for (Plant plant : plantList) {
            addPlantToTable(plant.getSpecies(), plant.getInitialAge(), plant.getUsername(), plant.getQuantity(),plant.getPlantId());
        }
    }

    public void logout(View view) {
        // Aquí puedes realizar cualquier operación necesaria para cerrar la sesión
        // Por ejemplo, borrar los datos de usuario guardados en caché
        userSession.clearSession();
        // Luego, redirecciona a MainActivity
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish(); // Cierra GardenActivity para que no se pueda volver atrás
    }
}
