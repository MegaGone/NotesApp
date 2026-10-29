package com.notasapp.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.notasapp.databinding.ActivityLoginBinding
import com.notasapp.ui.dashboard.DashboardActivity

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.loginButton.setOnClickListener {
            viewModel.login(
                binding.emailEditText.text.toString(),
                binding.passwordEditText.text.toString(),
            )
        }

        observeState()
    }

    private fun observeState() {
        viewModel.state.observe(this) { state ->
            when (state) {
                is LoginUiState.Loading -> setLoading(true)
                is LoginUiState.Success -> {
                    setLoading(false)
                    startActivity(Intent(this, DashboardActivity::class.java))
                    finish()
                }
                is LoginUiState.Error -> {
                    setLoading(false)
                    Toast.makeText(this, state.message, Toast.LENGTH_LONG).show()
                }
                is LoginUiState.Idle -> setLoading(false)
            }
        }
    }

    private fun setLoading(loading: Boolean) {
        binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        binding.loginButton.isEnabled = !loading
    }
}
