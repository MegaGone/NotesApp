package com.notasapp.data.repository

import com.notasapp.data.local.TokenStore
import com.notasapp.data.remote.ApiService
import com.notasapp.data.remote.dto.AuthResponse
import com.notasapp.data.remote.dto.LoginRequest

class AuthRepository(
    private val api: ApiService,
    private val tokenStore: TokenStore,
) {
    suspend fun login(email: String, password: String): AuthResponse {
        val response = api.login(LoginRequest(email, password))
        tokenStore.saveSession(response.accessToken, response.refreshToken, email)
        return response
    }

    fun logout() = tokenStore.clear()
}
