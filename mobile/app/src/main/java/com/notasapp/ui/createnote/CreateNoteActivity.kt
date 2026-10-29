package com.notasapp.ui.createnote

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.notasapp.R
import com.notasapp.databinding.ActivityCreateNoteBinding

class CreateNoteActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCreateNoteBinding
    private val viewModel: CreateNoteViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCreateNoteBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.saveButton.setOnClickListener {
            viewModel.create(
                binding.titleEditText.text.toString(),
                binding.contentEditText.text.toString(),
            )
        }

        observeState()
    }

    private fun observeState() {
        viewModel.state.observe(this) { state ->
            when (state) {
                is CreateNoteUiState.Loading -> setLoading(true)
                is CreateNoteUiState.Success -> {
                    setLoading(false)
                    Toast.makeText(this, getString(R.string.create_success), Toast.LENGTH_SHORT).show()
                    finish()
                }
                is CreateNoteUiState.Error -> {
                    setLoading(false)
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
                is CreateNoteUiState.Idle -> setLoading(false)
            }
        }
    }

    private fun setLoading(loading: Boolean) {
        binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        binding.saveButton.isEnabled = !loading
    }
}
