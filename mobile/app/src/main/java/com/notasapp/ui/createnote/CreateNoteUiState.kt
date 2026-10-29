package com.notasapp.ui.createnote

sealed interface CreateNoteUiState {
    data object Idle : CreateNoteUiState
    data object Loading : CreateNoteUiState
    data object Success : CreateNoteUiState
    data class Error(val message: String) : CreateNoteUiState
}
