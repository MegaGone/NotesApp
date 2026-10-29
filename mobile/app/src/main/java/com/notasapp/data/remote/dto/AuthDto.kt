package com.notasapp.data.remote.dto

data class LoginRequest(
    val email: String,
    val password: String,
)

data class AuthResponse(
    val accessToken: String,
    val refreshToken: String,
)
