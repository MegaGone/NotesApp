package com.notasapp.data.remote

import com.notasapp.data.local.TokenStore
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

    // 10.0.2.2 = host machine from the Android emulator.
    // For a physical device, replace with your PC's LAN IP (e.g. http://192.168.1.50:3000/api/v1/).
    private const val BASE_URL = "http://10.0.2.2:3000/api/v1/"

    fun create(tokenStore: TokenStore): ApiService {
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }

        val client = OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(tokenStore))
            .addInterceptor(logging)
            .build()

        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
