package com.notasapp.ui.dashboard

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import com.notasapp.data.local.TokenStore

class DashboardViewModel(application: Application) : AndroidViewModel(application) {

    private val tokenStore = TokenStore(application)

    val email: String = tokenStore.getEmail() ?: "usuario"

    fun logout() = tokenStore.clear()
}
