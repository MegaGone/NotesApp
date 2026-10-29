package com.notasapp.ui.notes

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.notasapp.data.local.TokenStore
import com.notasapp.data.remote.RetrofitClient
import com.notasapp.data.repository.NotesRepository
import kotlinx.coroutines.launch
import retrofit2.HttpException
import java.io.IOException

class NotesViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: NotesRepository

    init {
        val tokenStore = TokenStore(application)
        val api = RetrofitClient.create(tokenStore)
        repository = NotesRepository(api)
    }

    private val _state = MutableLiveData<NotesUiState>(NotesUiState.Idle)
    val state: LiveData<NotesUiState> = _state

    fun loadNotes() {
        _state.value = NotesUiState.Loading

        viewModelScope.launch {
            try {
                val response = repository.getNotes(page = 1, pageSize = 50)
                _state.value = NotesUiState.Success(response.data)
            } catch (e: HttpException) {
                val message = when (e.code()) {
                    401 -> "Tu sesión expiró. Iniciá sesión de nuevo."
                    else -> "Error del servidor (${e.code()})."
                }
                _state.value = NotesUiState.Error(message)
            } catch (e: IOException) {
                _state.value = NotesUiState.Error("Error de conexión. ¿El backend está corriendo?")
            } catch (e: Exception) {
                _state.value = NotesUiState.Error("Ocurrió un error inesperado.")
            }
        }
    }
}
