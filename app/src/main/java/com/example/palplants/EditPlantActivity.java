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

public class EditPlantActivity extends AppCompatActivity {

    private EditText plantTypeEditText;
    private EditText plantInitialAgeEditText;
    private Button updatePlantButton;
    private RequestQueue requestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_plant);
        requestQueue = Volley.newRequestQueue(this);

        // Obtener referencias a los elementos de la interfaz de usuario
        plantTypeEditText = findViewById(R.id.plantTypeEditText);
        plantInitialAgeEditText = findViewById(R.id.plantInitialAgeEditText);
        updatePlantButton = findViewById(R.id.saveChangesButton);

        // Obtener los datos de la planta a editar del intent
        Intent intent = getIntent();
        String plantType = intent.getStringExtra("plantType");
        double plantInitialAge = intent.getDoubleExtra("plantInitialAge", 0.0);

        // Establecer los datos de la planta en los campos de edición
        plantTypeEditText.setText(plantType);
        plantInitialAgeEditText.setText(String.valueOf(plantInitialAge));

        // Configurar el clic del botón de actualización de la planta
        updatePlantButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Obtener los nuevos datos de la planta editados por el usuario
                String updatedPlantType = plantTypeEditText.getText().toString();
                double updatedPlantInitialAge = Double.parseDouble(plantInitialAgeEditText.getText().toString());

                // Crear un intent con los datos actualizados de la planta
                Intent resultIntent = new Intent();
                resultIntent.putExtra("updatedPlantType", updatedPlantType);
                resultIntent.putExtra("updatedPlantInitialAge", updatedPlantInitialAge);

                // Establecer el resultado como RESULT_OK y agregar el intent con los datos actualizados
                setResult(RESULT_OK, resultIntent);
                finish(); // Finalizar la actividad de edición de plantas
            }
        });
    }
    private void updatePlant(String plantId) {
        String species = plantTypeEditText.getText().toString();
        double plantInitialAge = Double.parseDouble(plantInitialAgeEditText.getText().toString());

        JSONObject jsonBody = new JSONObject();
        try {
            jsonBody.put("especie", species);
            jsonBody.put("edad_inicial", plantInitialAge);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String url = "http://192.168.0.55:5000/plantas/" + plantId;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.PUT, url, jsonBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(EditPlantActivity.this, "Planta actualizada exitosamente", Toast.LENGTH_SHORT).show();
                        finish();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(EditPlantActivity.this, "Error al actualizar la planta", Toast.LENGTH_SHORT).show();
                    }
                });

        requestQueue.add(jsonObjectRequest);
    }

}

