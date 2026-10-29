package com.notasapp.ui.notes

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
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

        binding.backButton.setOnClickListener { finish() }

        attachSwipeToDelete()
        observeState()
    }

    private fun attachSwipeToDelete() {
        val callback = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.RIGHT) {
            override fun onMove(
                recyclerView: RecyclerView,
                viewHolder: RecyclerView.ViewHolder,
                target: RecyclerView.ViewHolder,
            ): Boolean = false

            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                val position = viewHolder.bindingAdapterPosition
                if (position == RecyclerView.NO_POSITION) return
                val note = adapter.noteAt(position)
                viewModel.deleteNote(note.id)
            }
        }

        ItemTouchHelper(callback).attachToRecyclerView(binding.notesRecyclerView)
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
