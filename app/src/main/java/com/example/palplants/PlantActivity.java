package com.example.palplants;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class PlantActivity extends AppCompatActivity {
    private EditText plantTypeEditText;
    private EditText plantInitialAgeEditText;
    private Button registerPlantButton;

    private RequestQueue requestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_plant);

        plantTypeEditText = findViewById(R.id.plantTypeEditText);
        plantInitialAgeEditText = findViewById(R.id.plantInitialAgeEditText);
        registerPlantButton = findViewById(R.id.addPlantButton);

        // Crear el objeto RequestQueue
        requestQueue = Volley.newRequestQueue(this);

        registerPlantButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                registerPlant();
            }
        });
    }
    public void goBackToGarden(View view) {
        Intent intent = new Intent(this, GardenActivity.class);
        startActivity(intent);
        finish();
    }
    private void registerPlant() {
        String species = plantTypeEditText.getText().toString();
        int plantInitialAge = Integer.parseInt(plantInitialAgeEditText.getText().toString());
        UserSession userSession = UserSession.getInstance();
        String username = userSession.getUsername();
        String email = userSession.getEmail();


        JSONObject jsonBody = new JSONObject();
        try {
            jsonBody.put("especie", species);
            jsonBody.put("edad_inicial", plantInitialAge);
            jsonBody.put("username",username);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String url = "http://192.168.0.55:5000/plantas";

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, jsonBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // Aquí puedes procesar la respuesta del servidor
                        Toast.makeText(PlantActivity.this, "Planta registrada exitosamente", Toast.LENGTH_SHORT).show();
                        // Regresar a GardenActivity
                        Intent intent = new Intent(PlantActivity.this, GardenActivity.class);
                        startActivity(intent);
                        // Crear un objeto Intent con los datos de la planta registrada
                        Intent intent2 = new Intent();
                        intent.putExtra("species", species);
                        intent.putExtra("plantInitialAge", plantInitialAge);
                        intent.putExtra("username", username);

                        // Establecer el resultado como RESULT_OK y agregar el intent con los datos de la planta registrada
                        setResult(RESULT_OK, intent2);
                        finish(); // Finalizar PlantActivity para que no se pueda volver atrás
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Aquí puedes manejar los errores de la solicitud
                        Toast.makeText(PlantActivity.this, "Error al registrar la planta", Toast.LENGTH_SHORT).show();
                    }
                });

        // Agregar la solicitud a la cola de solicitudes
        requestQueue.add(jsonObjectRequest);
    }

}