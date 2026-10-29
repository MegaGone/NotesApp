package com.notasapp.data.remote.dto

data class CreateNoteRequest(
    val title: String,
    val content: String,
)

data class NoteResponse(
    val id: String,
    val title: String,
    val content: String,
    val createdAt: String,
)

data class PaginatedNotesResponse(
    val data: List<NoteResponse>,
    val total: Int,
    val page: Int,
    val pageSize: Int,
)
