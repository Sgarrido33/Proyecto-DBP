package com.example.palplants;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.widget.TableLayout;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class GardenActivity extends AppCompatActivity {

    private TableLayout tableLayout;
    private RequestQueue requestQueue;

    private List<Plant> plantList;

    UserSession userSession = UserSession.getInstance();
    String username = userSession.getUsername();
    String email = userSession.getEmail();

    // Actualizar las vistas correspondientes con los datos del usuario

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_garden);

        tableLayout = findViewById(R.id.tableLayout);

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
                int initialAge = jsonObject.getInt("edad_inicial");
                String user = jsonObject.getString("username");
                int quantity = jsonObject.getInt("cantidad");

                Plant plant = new Plant(plantId, species, username, initialAge, quantity);
                plantList.add(plant);

                addPlantToTable(species, initialAge, user);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void addPlantToTable(String species, int initialAge, String user) {
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
                // Puedes mostrar un diálogo de confirmación antes de eliminar la planta
                // o realizar cualquier otra acción necesaria
                Toast.makeText(GardenActivity.this, "Eliminar planta: " + species, Toast.LENGTH_SHORT).show();
            }
        });

        row.addView(speciesTextView);
        row.addView(initialAgeTextView);
        row.addView(userTextView);

        tableLayout.addView(row);
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
