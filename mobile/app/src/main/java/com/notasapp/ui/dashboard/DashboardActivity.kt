package com.notasapp.ui.dashboard

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.notasapp.R
import com.notasapp.databinding.ActivityDashboardBinding
import com.notasapp.ui.createnote.CreateNoteActivity
import com.notasapp.ui.login.LoginActivity
import com.notasapp.ui.notes.NotesActivity

class DashboardActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDashboardBinding
    private val viewModel: DashboardViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.welcomeTextView.text = getString(R.string.dashboard_welcome, viewModel.email)

        binding.createNoteButton.setOnClickListener {
            startActivity(Intent(this, CreateNoteActivity::class.java))
        }

        binding.listNotesButton.setOnClickListener {
            startActivity(Intent(this, NotesActivity::class.java))
        }

        binding.logoutButton.setOnClickListener {
            viewModel.logout()
            val intent = Intent(this, LoginActivity::class.java)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            startActivity(intent)
            finish()
        }
    }
}
