package com.notasapp.data.local

import android.content.Context

class TokenStore(context: Context) {

    private val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun saveSession(accessToken: String, refreshToken: String, email: String) {
        prefs.edit()
            .putString(KEY_ACCESS, accessToken)
            .putString(KEY_REFRESH, refreshToken)
            .putString(KEY_EMAIL, email)
            .apply()
    }

    fun getAccessToken(): String? = prefs.getString(KEY_ACCESS, null)

    fun getRefreshToken(): String? = prefs.getString(KEY_REFRESH, null)

    fun getEmail(): String? = prefs.getString(KEY_EMAIL, null)

    fun clear() = prefs.edit().clear().apply()

    private companion object {
        const val PREFS = "notasapp_prefs"
        const val KEY_ACCESS = "access_token"
        const val KEY_REFRESH = "refresh_token"
        const val KEY_EMAIL = "email"
    }
}
