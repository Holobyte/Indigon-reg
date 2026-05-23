package com.example.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.AppDatabase
import com.example.data.AppRepository
import com.example.data.Registration
import com.example.data.SponsorInquiry
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

class AppViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: AppRepository

    init {
        val database = AppDatabase.getDatabase(application)
        repository = AppRepository(database.registrationDao(), database.sponsorInquiryDao())
    }

    // Screens / Pages
    enum class Screen {
        Home,
        RegistrationPage,
        EventDetails,
        Categories,
        Presenters,
        Sponsor,
        VtcPath,
        AdminDashboard
    }

    // Navigation State
    private val _currentScreen = MutableStateFlow(Screen.Home)
    val currentScreen: StateFlow<Screen> = _currentScreen.asStateFlow()

    fun navigateTo(screen: Screen) {
        _currentScreen.value = screen
    }

    // Lists for Admin Dashboard
    private val _registrationsList = MutableStateFlow<List<Registration>>(emptyList())
    val registrationsList: StateFlow<List<Registration>> = _registrationsList.asStateFlow()

    private val _sponsorInquiriesList = MutableStateFlow<List<SponsorInquiry>>(emptyList())
    val sponsorInquiriesList: StateFlow<List<SponsorInquiry>> = _sponsorInquiriesList.asStateFlow()

    init {
        viewModelScope.launch {
            repository.registrations.collectLatest { list ->
                _registrationsList.value = list
            }
        }
        viewModelScope.launch {
            repository.inquiries.collectLatest { list ->
                _sponsorInquiriesList.value = list
            }
        }
        
        // Seed dummy initial values for testing the dashboard if none exist
        viewModelScope.launch {
            try {
                val list = repository.registrations.first()
                if (list.isEmpty()) {
                    seedDummyData()
                }
            } catch (e: Exception) {
                // Ignore initial seeding query exceptions gracefully
            }
        }
    }

    private suspend fun seedDummyData() {
        val demo1 = Registration(
            fullName = "Alex Chen",
            emailAddress = "alex.chen@example.com",
            phoneNumber = "+1-555-0199",
            cityState = "Richmond, VA",
            attendingAs = "Filmmaker",
            categoryInterest = "AI Movie Trailers",
            experienceLevel = "Intermediate",
            deviceToBring = "Laptop",
            receiveUpdates = true,
            businessOrgName = "Hyperion Films",
            websiteSocialLink = "hyperionfilms.co",
            hopeToLearn = "How to generate high fidelity trailer sequences using Runway and Midjourney.",
            considerFutureChallenges = "Yes"
        )
        val demo2 = Registration(
            fullName = "Sarah Jenkins",
            emailAddress = "sarah.j@example.com",
            phoneNumber = "+1-555-0142",
            cityState = "Virginia Beach, VA",
            attendingAs = "Content Creator",
            categoryInterest = "AI Commercials / Ads",
            experienceLevel = "Beginner",
            deviceToBring = "Tablet",
            receiveUpdates = true,
            businessOrgName = "Sarah Media Group",
            websiteSocialLink = "instagram.com/sarahcreate",
            hopeToLearn = "Practical automation workflows for short-form video ads.",
            considerFutureChallenges = "Maybe"
        )
        repository.insertRegistration(demo1)
        repository.insertRegistration(demo2)

        val inquiry1 = SponsorInquiry(
            fullName = "Victoria Vance",
            companyOrg = "Vance Tech Lab",
            email = "victoria@vancetech.io",
            phone = "+1-555-8888",
            interests = "Interested in sponsoring the Technology Partner category and showcasing local tech tools."
        )
        repository.insertSponsorInquiry(inquiry1)
    }

    // Registration Form Fields State
    val regName = MutableStateFlow("")
    val regEmail = MutableStateFlow("")
    val regPhone = MutableStateFlow("")
    val regCityState = MutableStateFlow("")
    val regAttendingAs = MutableStateFlow("Filmmaker")
    val regCategoryInterest = MutableStateFlow("AI Commercials / Ads")
    val regExperienceLevel = MutableStateFlow("Beginner")
    val regDevice = MutableStateFlow("Laptop")
    val regReceiveUpdates = MutableStateFlow(true)
    val regConsent = MutableStateFlow(false)

    // Optional Fields
    val regBusinessName = MutableStateFlow("")
    val regWebsiteSocial = MutableStateFlow("")
    val regHopeToLearn = MutableStateFlow("")
    val regConsiderChallenges = MutableStateFlow("Yes")

    // Submission states
    private val _isSubmitting = MutableStateFlow(false)
    val isSubmitting: StateFlow<Boolean> = _isSubmitting.asStateFlow()

    private val _registrationSuccess = MutableStateFlow(false)
    val registrationSuccess: StateFlow<Boolean> = _registrationSuccess.asStateFlow()

    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage.asStateFlow()

    fun resetRegForm() {
        regName.value = ""
        regEmail.value = ""
        regPhone.value = ""
        regCityState.value = ""
        regAttendingAs.value = "Filmmaker"
        regCategoryInterest.value = "AI Commercials / Ads"
        regExperienceLevel.value = "Beginner"
        regDevice.value = "Laptop"
        regReceiveUpdates.value = true
        regConsent.value = false
        regBusinessName.value = ""
        regWebsiteSocial.value = ""
        regHopeToLearn.value = ""
        regConsiderChallenges.value = "Yes"
        _registrationSuccess.value = false
        _errorMessage.value = null
    }

    fun submitRegistration() {
        if (regName.value.isBlank()) {
            _errorMessage.value = "Please enter your full name."
            return
        }
        if (regEmail.value.isBlank() || !regEmail.value.contains("@")) {
            _errorMessage.value = "Please enter a valid email address."
            return
        }
        if (regPhone.value.isBlank()) {
            _errorMessage.value = "Please enter your phone number."
            return
        }
        if (regCityState.value.isBlank()) {
            _errorMessage.value = "Please enter your City / State."
            return
        }
        if (!regConsent.value) {
            _errorMessage.value = "You must agree to the free training terms to reserve your seat."
            return
        }

        _errorMessage.value = null
        _isSubmitting.value = true

        viewModelScope.launch {
            try {
                val newReg = Registration(
                    fullName = regName.value.trim(),
                    emailAddress = regEmail.value.trim(),
                    phoneNumber = regPhone.value.trim(),
                    cityState = regCityState.value.trim(),
                    attendingAs = regAttendingAs.value,
                    categoryInterest = regCategoryInterest.value,
                    experienceLevel = regExperienceLevel.value,
                    deviceToBring = regDevice.value,
                    receiveUpdates = regReceiveUpdates.value,
                    businessOrgName = regBusinessName.value.trim(),
                    websiteSocialLink = regWebsiteSocial.value.trim(),
                    hopeToLearn = regHopeToLearn.value.trim(),
                    considerFutureChallenges = regConsiderChallenges.value
                )
                repository.insertRegistration(newReg)
                _registrationSuccess.value = true
            } catch (e: Exception) {
                _errorMessage.value = "An error occurred: ${e.localizedMessage}"
            } finally {
                _isSubmitting.value = false
            }
        }
    }

    // Sponsor Inquiry Form State
    val spName = MutableStateFlow("")
    val spCompany = MutableStateFlow("")
    val spEmail = MutableStateFlow("")
    val spPhone = MutableStateFlow("")
    val spInterests = MutableStateFlow("")

    private val _sponsorSubmitting = MutableStateFlow(false)
    val sponsorSubmitting: StateFlow<Boolean> = _sponsorSubmitting.asStateFlow()

    private val _sponsorSuccess = MutableStateFlow(false)
    val sponsorSuccess: StateFlow<Boolean> = _sponsorSuccess.asStateFlow()

    private val _sponsorError = MutableStateFlow<String?>(null)
    val sponsorError: StateFlow<String?> = _sponsorError.asStateFlow()

    fun resetSponsorForm() {
        spName.value = ""
        spCompany.value = ""
        spEmail.value = ""
        spPhone.value = ""
        spInterests.value = ""
        _sponsorSuccess.value = false
        _sponsorError.value = null
    }

    fun submitSponsorInquiry() {
        if (spName.value.isBlank()) {
            _sponsorError.value = "Please enter your name."
            return
        }
        if (spCompany.value.isBlank()) {
            _sponsorError.value = "Please enter your company/organization."
            return
        }
        if (spEmail.value.isBlank() || !spEmail.value.contains("@")) {
            _sponsorError.value = "Please enter a valid email address."
            return
        }
        if (spPhone.value.isBlank()) {
            _sponsorError.value = "Please enter your phone number."
            return
        }

        _sponsorError.value = null
        _sponsorSubmitting.value = true

        viewModelScope.launch {
            try {
                val newInquiry = SponsorInquiry(
                    fullName = spName.value.trim(),
                    companyOrg = spCompany.value.trim(),
                    email = spEmail.value.trim(),
                    phone = spPhone.value.trim(),
                    interests = spInterests.value.trim()
                )
                repository.insertSponsorInquiry(newInquiry)
                _sponsorSuccess.value = true
            } catch (e: Exception) {
                _sponsorError.value = "Error sending inquiry: ${e.localizedMessage}"
            } finally {
                _sponsorSubmitting.value = false
            }
        }
    }
}
