package com.example.palplants;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
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

public class LoginActivity extends AppCompatActivity {

    private EditText emailEditText;
    private EditText passwordEditText;
    private Button loginButton;

    private RequestQueue requestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        emailEditText = findViewById(R.id.emailEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        loginButton = findViewById(R.id.loginButton);

        // Crear el objeto RequestQueue
        requestQueue = Volley.newRequestQueue(this);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginUser();
            }
        });
    }

    private void loginUser() {
        String email = emailEditText.getText().toString();
        String password = passwordEditText.getText().toString();

        JSONObject jsonBody = new JSONObject();
        try {
            jsonBody.put("email", email);
            jsonBody.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        String url = "http://192.168.0.55:5000/login";

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, jsonBody,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        // Aquí puedes procesar la respuesta del servidor
                        Log.d("LoginActivity", "Response: " + response.toString());

                        try {
                            boolean success = response.getBoolean("success");
                            if (success) {
                                JSONObject userData = response.getJSONObject("data");
                                String email = userData.getString("email");
                                String username = userData.getString("username");

                                // Inicio de sesión exitoso,
                                // Guardado de datos de usuario iniciado en la clase UserSession
                                UserSession userSession = UserSession.getInstance();
                                userSession.setUsername(username);
                                userSession.setEmail(email);
                                // redireccionar a GardenActivity
                                Intent intent = new Intent(LoginActivity.this, GardenActivity.class);
                                intent.putExtra("email", email);
                                intent.putExtra("username", username);
                                startActivity(intent);
                                finish();
                            } else {
                                // Inicio de sesión fallido, muestra un mensaje de error o realiza otra acción necesaria
                                Toast.makeText(LoginActivity.this, "Inicio de sesión fallido", Toast.LENGTH_SHORT).show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Aquí puedes manejar los errores de la solicitud
                        Log.e("LoginActivity", "Error: " + error.getMessage());
                    }
                });

        // Agregar la solicitud a la cola de solicitudes
        requestQueue.add(jsonObjectRequest);
    }
}
