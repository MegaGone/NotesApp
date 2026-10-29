package com.notasapp.data.repository

import com.notasapp.data.remote.ApiService
import com.notasapp.data.remote.dto.CreateNoteRequest
import com.notasapp.data.remote.dto.NoteResponse
import com.notasapp.data.remote.dto.PaginatedNotesResponse

class NotesRepository(private val api: ApiService) {

    suspend fun createNote(title: String, content: String): NoteResponse =
        api.createNote(CreateNoteRequest(title, content))

    suspend fun getNotes(page: Int = 1, pageSize: Int = 20): PaginatedNotesResponse =
        api.getNotes(page, pageSize)

    suspend fun deleteNote(id: String) = api.deleteNote(id)
}
