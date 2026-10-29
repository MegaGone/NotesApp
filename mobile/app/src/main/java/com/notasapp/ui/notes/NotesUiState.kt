package com.notasapp.ui.notes

import com.notasapp.data.remote.dto.NoteResponse

sealed interface NotesUiState {
    data object Idle : NotesUiState
    data object Loading : NotesUiState
    data class Success(val notes: List<NoteResponse>) : NotesUiState
    data class Error(val message: String) : NotesUiState
}
