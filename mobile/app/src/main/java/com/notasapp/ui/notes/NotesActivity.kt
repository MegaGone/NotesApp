package com.notasapp.ui.notes

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.notasapp.databinding.ActivityNotesBinding

class NotesActivity : AppCompatActivity() {

    private lateinit var binding: ActivityNotesBinding
    private val viewModel: NotesViewModel by viewModels()
    private val adapter = NotesAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityNotesBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.notesRecyclerView.layoutManager = LinearLayoutManager(this)
        binding.notesRecyclerView.adapter = adapter

        observeState()
    }

    override fun onResume() {
        super.onResume()
        // Reload so notes created in CreateNoteActivity show up when returning.
        viewModel.loadNotes()
    }

    private fun observeState() {
        viewModel.state.observe(this) { state ->
            when (state) {
                is NotesUiState.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.emptyTextView.visibility = View.GONE
                }
                is NotesUiState.Success -> {
                    binding.progressBar.visibility = View.GONE
                    adapter.submit(state.notes)
                    binding.emptyTextView.visibility =
                        if (state.notes.isEmpty()) View.VISIBLE else View.GONE
                }
                is NotesUiState.Error -> {
                    binding.progressBar.visibility = View.GONE
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
                is NotesUiState.Idle -> Unit
            }
        }
    }
}
