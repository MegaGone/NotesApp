package com.notasapp.ui.login

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.notasapp.data.local.TokenStore
import com.notasapp.data.remote.RetrofitClient
import com.notasapp.data.repository.AuthRepository
import kotlinx.coroutines.launch
import retrofit2.HttpException
import java.io.IOException

class LoginViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: AuthRepository

    init {
        val tokenStore = TokenStore(application)
        val api = RetrofitClient.create(tokenStore)
        repository = AuthRepository(api, tokenStore)
    }

    private val _state = MutableLiveData<LoginUiState>(LoginUiState.Idle)
    val state: LiveData<LoginUiState> = _state

    fun login(email: String, password: String) {
        if (email.isBlank() || password.isBlank()) {
            _state.value = LoginUiState.Error("Completá el email y la contraseña.")
            return
        }

        _state.value = LoginUiState.Loading

        viewModelScope.launch {
            try {
                repository.login(email.trim(), password)
                _state.value = LoginUiState.Success
            } catch (e: HttpException) {
                val message = when (e.code()) {
                    400, 401, 422 -> "Email o contraseña incorrectos."
                    else -> "Error del servidor (${e.code()})."
                }
                _state.value = LoginUiState.Error(message)
            } catch (e: IOException) {
                _state.value = LoginUiState.Error("Error de conexión. ¿El backend está corriendo?")
            } catch (e: Exception) {
                _state.value = LoginUiState.Error("Ocurrió un error inesperado.")
            }
        }
    }
}
