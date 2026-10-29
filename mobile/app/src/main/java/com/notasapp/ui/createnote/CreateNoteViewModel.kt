package com.notasapp.ui.createnote

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

class CreateNoteViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: NotesRepository

    init {
        val tokenStore = TokenStore(application)
        val api = RetrofitClient.create(tokenStore)
        repository = NotesRepository(api)
    }

    private val _state = MutableLiveData<CreateNoteUiState>(CreateNoteUiState.Idle)
    val state: LiveData<CreateNoteUiState> = _state

    fun create(title: String, content: String) {
        if (title.isBlank() || content.isBlank()) {
            _state.value = CreateNoteUiState.Error("Completá el título y el contenido.")
            return
        }

        _state.value = CreateNoteUiState.Loading

        viewModelScope.launch {
            try {
                repository.createNote(title.trim(), content.trim())
                _state.value = CreateNoteUiState.Success
            } catch (e: HttpException) {
                val message = when (e.code()) {
                    401 -> "Tu sesión expiró. Iniciá sesión de nuevo."
                    400 -> "Datos inválidos."
                    else -> "Error del servidor (${e.code()})."
                }
                _state.value = CreateNoteUiState.Error(message)
            } catch (e: IOException) {
                _state.value = CreateNoteUiState.Error("Error de conexión. ¿El backend está corriendo?")
            } catch (e: Exception) {
                _state.value = CreateNoteUiState.Error("Ocurrió un error inesperado.")
            }
        }
    }
}
