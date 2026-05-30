package com.example

import android.app.Application
import android.content.Context
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.test.core.app.ActivityScenario
import androidx.test.core.app.ApplicationProvider
import com.example.ui.AppViewModel
import com.example.ui.theme.MyApplicationTheme
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun readStringFromContext() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val appName = context.getString(R.string.app_name)
        assertEquals("Indigon AI Film Gauntlet", appName)
    }

    @Test
    fun verifyMainActivityLaunches() {
        ActivityScenario.launch(MainActivity::class.java).use { scenario ->
            scenario.onActivity { activity ->
                assertNotNull(activity)
            }
        }
    }

    @Test
    fun verifyHomeAndNavigationScreens() {
        val app = ApplicationProvider.getApplicationContext<Application>()
        val viewModel = AppViewModel(app)

        composeTestRule.setContent {
            MyApplicationTheme {
                MainScreen(viewModel)
            }
        }

        // Test Navigation to other pages
        viewModel.navigateTo(AppViewModel.Screen.RegistrationPage)
        composeTestRule.waitForIdle()

        viewModel.navigateTo(AppViewModel.Screen.EventDetails)
        composeTestRule.waitForIdle()

        viewModel.navigateTo(AppViewModel.Screen.Categories)
        composeTestRule.waitForIdle()

        viewModel.navigateTo(AppViewModel.Screen.Presenters)
        composeTestRule.waitForIdle()

        viewModel.navigateTo(AppViewModel.Screen.Sponsor)
        composeTestRule.waitForIdle()

        viewModel.navigateTo(AppViewModel.Screen.VtcPath)
        composeTestRule.waitForIdle()
    }

    @Test
    fun verifyAdminLoginAndNavigation() {
        val app = ApplicationProvider.getApplicationContext<Application>()
        val viewModel = AppViewModel(app)

        composeTestRule.setContent {
            MyApplicationTheme {
                MainScreen(viewModel)
            }
        }

        // Navigate to AdminDashboard
        viewModel.navigateTo(AppViewModel.Screen.AdminDashboard)
        composeTestRule.waitForIdle()

        // Admin page displays AdminLoginPage initially
        composeTestRule.onNodeWithTag("admin_password_input").assertExists()
        composeTestRule.onNodeWithTag("admin_login_submit_button").assertExists()

        // Simulate typing and submitting a password
        composeTestRule.onNodeWithTag("admin_password_input")
            .performTextInput("change-me-indigon-admin")
        composeTestRule.onNodeWithTag("admin_login_submit_button")
            .performClick()

        composeTestRule.waitForIdle()
    }
}
