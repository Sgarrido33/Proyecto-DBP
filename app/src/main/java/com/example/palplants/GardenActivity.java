package com.example.palplants;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
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

    private RecyclerView recyclerView;
    private PlantAdapter plantAdapter;
    private List<Plant> plantList;
    private Button addPlantButton;
    private RequestQueue requestQueue;

    UserSession userSession = UserSession.getInstance();
    String username = userSession.getUsername();
    String email = userSession.getEmail();

    // Actualizar las vistas correspondientes con los datos del usuario

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_garden);

        recyclerView = findViewById(R.id.recyclerView);
        addPlantButton = findViewById(R.id.addPlantButton);

        plantList = new ArrayList<Plant>();
        plantAdapter = new PlantAdapter(plantList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(plantAdapter);

        requestQueue = Volley.newRequestQueue(this);

        // Actualizar el TextView del nombre de usuario
        TextView userNameTextView = findViewById(R.id.userNameTextView);
        userNameTextView.setText(username);

        fetchData();

        addPlantButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openPlantActivity();
            }
        });
    }

    private void openPlantActivity() {
        Intent intent = new Intent(this, PlantActivity.class);
        startActivity(intent);
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
                String inscriptionDate = jsonObject.getString("fecha_registro");
                int initialAge = jsonObject.getInt("edad_inicial");
                String user = jsonObject.getString("username");

                Plant plant = new Plant(species, inscriptionDate, initialAge, user);
                plantList.add(plant);
            }

            plantAdapter.notifyDataSetChanged();

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private class PlantAdapter extends RecyclerView.Adapter<PlantAdapter.ViewHolder> {

        private List<Plant> plantList;

        public PlantAdapter(List<Plant> plantList) {
            this.plantList = plantList;
        }

        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.cardview_item, parent, false);
            return new ViewHolder(view);
        }

        @Override
        public void onBindViewHolder(ViewHolder holder, int position) {
            Plant plant = plantList.get(position);

            holder.speciesTextView.setText(plant.getSpecies());
            holder.inscriptionDateTextView.setText(plant.getInscriptionDate());
            holder.initialAgeTextView.setText(String.valueOf(plant.getInitialAge()));
            holder.userTextView.setText(plant.getUser());
        }

        @Override
        public int getItemCount() {
            return plantList.size();
        }

        public class ViewHolder extends RecyclerView.ViewHolder {
            public TextView speciesTextView;
            public TextView inscriptionDateTextView;
            public TextView initialAgeTextView;
            public TextView userTextView;

            public ViewHolder(View itemView) {
                super(itemView);
                speciesTextView = itemView.findViewById(R.id.speciesTextView);
                inscriptionDateTextView = itemView.findViewById(R.id.inscriptionDateTextView);
                initialAgeTextView = itemView.findViewById(R.id.initialAgeTextView);
                userTextView = itemView.findViewById(R.id.userTextView);
            }
        }
    }
}
