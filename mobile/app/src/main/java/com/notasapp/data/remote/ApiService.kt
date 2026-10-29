package com.notasapp.data.remote

import com.notasapp.data.remote.dto.AuthResponse
import com.notasapp.data.remote.dto.CreateNoteRequest
import com.notasapp.data.remote.dto.LoginRequest
import com.notasapp.data.remote.dto.NoteResponse
import com.notasapp.data.remote.dto.PaginatedNotesResponse
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface ApiService {

    @POST("auth/login")
    suspend fun login(@Body body: LoginRequest): AuthResponse

    @POST("notes")
    suspend fun createNote(@Body body: CreateNoteRequest): NoteResponse

    @GET("notes")
    suspend fun getNotes(
        @Query("page") page: Int,
        @Query("pageSize") pageSize: Int,
    ): PaginatedNotesResponse

    @DELETE("notes")
    suspend fun deleteNote(@Query("id") id: String)
}
