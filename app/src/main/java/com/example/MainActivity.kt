package com.example

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.Registration
import com.example.data.SponsorInquiry
import com.example.ui.AppViewModel
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {

    private val viewModel: AppViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        val oldHandler = Thread.getDefaultUncaughtExceptionHandler()
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            android.util.Log.e("MainActivityCrash", "CRASH DETECTED IN THREAD $thread", throwable)
            try {
                java.io.File("crash_log_root.txt").printWriter().use { writer ->
                    throwable.printStackTrace(writer)
                }
            } catch (e: Exception) {}
            try {
                java.io.File("/app/crash_log.txt").printWriter().use { writer ->
                    throwable.printStackTrace(writer)
                }
            } catch (e: Exception) {}
            oldHandler?.uncaughtException(thread, throwable)
        }
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                MainScreen(viewModel)
            }
        }
    }
}

// Gorgeous Custom Color Palette for Cinematic Indigo Glowing Style matching light themes
object BrandColors {
    val MidnightIndigo = Color(0xFF130A38)
    val ElectricPurple = Color(0xFF7C3AED)
    val NeonCyan = Color(0xFF06B6D4)
    val CoralPink = Color(0xFFF43F5E)
    val LightGrayBg = Color(0xFFF8FAFC)
    val CardShadowColor = Color(0x1A6366F1)
    val AccentGradientLight = Brush.linearGradient(
        colors = listOf(Color(0xFF8B5CF6), Color(0xFF06B6D4))
    )
    val DarkGradient = Brush.verticalGradient(
        colors = listOf(Color(0xFF1E1B4B), Color(0xFF0F0B2A))
    )
    val SoftIndigoGradient = Brush.horizontalGradient(
        colors = listOf(Color(0xFFEEF2FF), Color(0xFFE0E7FF))
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(viewModel: AppViewModel) {
    val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()
    val context = LocalContext.current

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        // Custom logo marker
                        Box(
                            modifier = Modifier
                                .size(28.dp)
                                .clip(RoundedCornerShape(6.dp))
                                .background(BrandColors.AccentGradientLight),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.PlayArrow,
                                contentDescription = "Indigo AI Icon",
                                tint = Color.White,
                                modifier = Modifier.size(16.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "INDIGON",
                            fontWeight = FontWeight.Black,
                            letterSpacing = 2.sp,
                            fontSize = 20.sp,
                            color = BrandColors.MidnightIndigo
                        )
                    }
                },
                navigationIcon = {
                    if (currentScreen != AppViewModel.Screen.Home) {
                        IconButton(
                            onClick = { viewModel.navigateTo(AppViewModel.Screen.Home) },
                            modifier = Modifier.testTag("nav_back_button")
                        ) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                                contentDescription = "Back",
                                tint = BrandColors.MidnightIndigo
                            )
                        }
                    }
                },
                actions = {
                    IconButton(
                        onClick = { viewModel.navigateTo(AppViewModel.Screen.AdminDashboard) },
                        modifier = Modifier.testTag("nav_admin_button")
                    ) {
                        Icon(
                            imageVector = Icons.Default.AdminPanelSettings,
                            contentDescription = "Admin Area",
                            tint = BrandColors.MidnightIndigo
                        )
                    }
                },
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                    containerColor = Color.White,
                    titleContentColor = BrandColors.MidnightIndigo
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 8.dp,
                modifier = Modifier.windowInsetsPadding(WindowInsets.navigationBars)
            ) {
                NavigationBarItem(
                    selected = currentScreen == AppViewModel.Screen.Home,
                    onClick = { viewModel.navigateTo(AppViewModel.Screen.Home) },
                    icon = { Icon(imageVector = Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home", fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = BrandColors.ElectricPurple,
                        selectedTextColor = BrandColors.ElectricPurple,
                        unselectedIconColor = Color.Gray,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFFF3E8FF)
                    )
                )
                NavigationBarItem(
                    selected = currentScreen == AppViewModel.Screen.RegistrationPage,
                    onClick = { viewModel.navigateTo(AppViewModel.Screen.RegistrationPage) },
                    icon = { Icon(imageVector = Icons.Default.AppRegistration, contentDescription = "Register") },
                    label = { Text("Register", fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = BrandColors.ElectricPurple,
                        selectedTextColor = BrandColors.ElectricPurple,
                        unselectedIconColor = Color.Gray,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFFF3E8FF)
                    ),
                    modifier = Modifier.testTag("nav_register_tab")
                )
                NavigationBarItem(
                    selected = currentScreen == AppViewModel.Screen.EventDetails,
                    onClick = { viewModel.navigateTo(AppViewModel.Screen.EventDetails) },
                    icon = { Icon(imageVector = Icons.Default.Event, contentDescription = "Details") },
                    label = { Text("Details", fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = BrandColors.ElectricPurple,
                        selectedTextColor = BrandColors.ElectricPurple,
                        unselectedIconColor = Color.Gray,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFFF3E8FF)
                    )
                )
                NavigationBarItem(
                    selected = currentScreen == AppViewModel.Screen.Categories,
                    onClick = { viewModel.navigateTo(AppViewModel.Screen.Categories) },
                    icon = { Icon(imageVector = Icons.Default.Movie, contentDescription = "Categories") },
                    label = { Text("Categories", fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = BrandColors.ElectricPurple,
                        selectedTextColor = BrandColors.ElectricPurple,
                        unselectedIconColor = Color.Gray,
                        unselectedTextColor = Color.Gray,
                        indicatorColor = Color(0xFFF3E8FF)
                    )
                )
            }
        },
        containerColor = BrandColors.LightGrayBg
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentScreen) {
                AppViewModel.Screen.Home -> HomeScreen(viewModel)
                AppViewModel.Screen.RegistrationPage -> RegistrationPage(viewModel)
                AppViewModel.Screen.EventDetails -> EventDetailsPage(viewModel)
                AppViewModel.Screen.Categories -> CategoriesPage(viewModel)
                AppViewModel.Screen.Presenters -> PresentersPage(viewModel)
                AppViewModel.Screen.Sponsor -> SponsorPage(viewModel)
                AppViewModel.Screen.VtcPath -> VtcPathPage(viewModel)
                AppViewModel.Screen.AdminDashboard -> AdminDashboardPage(viewModel)
            }
        }
    }
}

// --------------------------------------------------
// 1. HOME SCREEN
// --------------------------------------------------
@Composable
fun HomeScreen(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Presented by Badge
        Surface(
            color = Color(0xFFEEF2FF),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier.padding(bottom = 8.dp)
        ) {
            Text(
                text = "PRESENTED BY VOLLYWOOD®",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = BrandColors.ElectricPurple,
                letterSpacing = 1.5.sp,
                modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
            )
        }

        // Hero Cinematic Banner Title
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 12.dp)
                .shadow(16.dp, RoundedCornerShape(20.dp), ambientColor = BrandColors.CardShadowColor),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(BrandColors.DarkGradient)
                    .padding(24.dp)
            ) {
                // Subtle glowing grid circles manually
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "Indigon AI Film Gauntlet",
                        style = MaterialTheme.typography.headlineMedium.copy(
                            fontWeight = FontWeight.Black,
                            textAlign = TextAlign.Center,
                            fontSize = 28.sp,
                            lineHeight = 34.sp
                        ),
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "AI Media Training • Film • Music Videos • Commercials • Trailers • Short Films",
                        style = MaterialTheme.typography.bodyMedium.copy(
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center,
                            lineHeight = 20.sp,
                            letterSpacing = 0.5.sp
                        ),
                        color = Color(0xFFCBD5E1)
                    )
                }
            }
        }

        // Hero Text Description
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Indigon is a new AI-powered media festival and training experience presented by Vollywood®. Learn how AI tools can support commercials, movie trailers, short films, music videos, and creative business media.",
                    fontSize = 15.sp,
                    lineHeight = 22.sp,
                    color = Color(0xFF334155),
                    textAlign = TextAlign.Center
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Main Call to Action Button
        Button(
            onClick = { viewModel.navigateTo(AppViewModel.Screen.RegistrationPage) },
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp)
                .testTag("apply_registration_button"),
            colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
            contentPadding = PaddingValues(),
            shape = RoundedCornerShape(14.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(BrandColors.AccentGradientLight),
                contentAlignment = Alignment.Center
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.HowToReg,
                        contentDescription = "Reg Icon",
                        tint = Color.White
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = "Register for Free Training",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = Color.White
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Secondary Navigation Buttons
        Text(
            text = "Explore Experience",
            fontWeight = FontWeight.Bold,
            color = BrandColors.MidnightIndigo,
            fontSize = 16.sp,
            modifier = Modifier
                .align(Alignment.Start)
                .padding(start = 4.dp, bottom = 8.dp, top = 8.dp)
        )

        RowButtonBlock(
            title = "View Event Details",
            icon = Icons.Default.Schedule,
            tag = "btn_view_details",
            onClick = { viewModel.navigateTo(AppViewModel.Screen.EventDetails) }
        )

        Spacer(modifier = Modifier.height(8.dp))

        RowButtonBlock(
            title = "Meet the Presenters",
            icon = Icons.Default.People,
            tag = "btn_view_presenters",
            onClick = { viewModel.navigateTo(AppViewModel.Screen.Presenters) }
        )

        Spacer(modifier = Modifier.height(8.dp))

        RowButtonBlock(
            title = "Explore AI Categories",
            icon = Icons.Default.Category,
            tag = "btn_view_categories",
            onClick = { viewModel.navigateTo(AppViewModel.Screen.Categories) }
        )

        Spacer(modifier = Modifier.height(8.dp))

        RowButtonBlock(
            title = "Sponsor Indigon Festival",
            icon = Icons.Default.Business,
            tag = "btn_sponsor",
            onClick = { viewModel.navigateTo(AppViewModel.Screen.Sponsor) }
        )

        Spacer(modifier = Modifier.height(8.dp))

        RowButtonBlock(
            title = "VTC Training Pathway",
            icon = Icons.Default.School,
            tag = "btn_vtc_path",
            onClick = { viewModel.navigateTo(AppViewModel.Screen.VtcPath) }
        )

        Spacer(modifier = Modifier.height(30.dp))
    }
}

@Composable
fun RowButtonBlock(
    title: String,
    icon: ImageVector,
    tag: String,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .testTag(tag),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(Color(0xFFF1F5F9)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = icon,
                        contentDescription = null,
                        tint = BrandColors.MidnightIndigo,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(modifier = Modifier.width(12.dp))
                Text(
                    text = title,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 15.sp,
                    color = Color(0xFF1E293B)
                )
            }
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = null,
                tint = Color.LightGray
            )
        }
    }
}

@Composable
fun RegistrationDropdown(
    label: String,
    value: String,
    options: List<String>,
    onSelect: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
    ) {
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { expanded = !expanded },
            shape = RoundedCornerShape(10.dp),
            border = BorderStroke(1.dp, Color.LightGray),
            color = Color.White
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 14.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = label,
                        fontSize = 11.sp,
                        color = Color.Gray,
                        fontWeight = FontWeight.Medium
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = value,
                        fontSize = 15.sp,
                        color = BrandColors.MidnightIndigo,
                        fontWeight = FontWeight.Normal
                    )
                }
                Icon(
                    imageVector = if (expanded) Icons.Default.ArrowDropUp else Icons.Default.ArrowDropDown,
                    contentDescription = null,
                    tint = BrandColors.MidnightIndigo,
                    modifier = Modifier.size(24.dp)
                )
            }
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            modifier = Modifier
                .background(Color.White)
        ) {
            options.forEach { item ->
                DropdownMenuItem(
                    text = { 
                        Text(
                            text = item,
                            color = BrandColors.MidnightIndigo,
                            fontSize = 14.sp
                        ) 
                    },
                    onClick = {
                        onSelect(item)
                        expanded = false
                    }
                )
            }
        }
    }
}


// --------------------------------------------------
// 2. REGISTRATION PAGE
// --------------------------------------------------
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RegistrationPage(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()

    val name by viewModel.regName.collectAsStateWithLifecycle()
    val email by viewModel.regEmail.collectAsStateWithLifecycle()
    val phone by viewModel.regPhone.collectAsStateWithLifecycle()
    val cityState by viewModel.regCityState.collectAsStateWithLifecycle()
    val attendingAs by viewModel.regAttendingAs.collectAsStateWithLifecycle()
    val categoryInterest by viewModel.regCategoryInterest.collectAsStateWithLifecycle()
    val experienceLevel by viewModel.regExperienceLevel.collectAsStateWithLifecycle()
    val device by viewModel.regDevice.collectAsStateWithLifecycle()
    val receiveUpdates by viewModel.regReceiveUpdates.collectAsStateWithLifecycle()
    val consent by viewModel.regConsent.collectAsStateWithLifecycle()

    // Option fields
    val businessName by viewModel.regBusinessName.collectAsStateWithLifecycle()
    val websiteSocial by viewModel.regWebsiteSocial.collectAsStateWithLifecycle()
    val hopeToLearn by viewModel.regHopeToLearn.collectAsStateWithLifecycle()
    val considerChallenges by viewModel.regConsiderChallenges.collectAsStateWithLifecycle()

    val isSubmitting by viewModel.isSubmitting.collectAsStateWithLifecycle()
    val success by viewModel.registrationSuccess.collectAsStateWithLifecycle()
    val errorMessage by viewModel.errorMessage.collectAsStateWithLifecycle()

    val attendingList = listOf(
        "Filmmaker", "Content Creator", "Business Owner", "Student",
        "Music Artist", "Marketing / Media Professional", "Community Member", "Other"
    )

    val categoryList = listOf(
        "AI Commercials / Ads", "AI Movie Trailers", "AI Short Films",
        "AI Music Videos", "AI Tools for Business", "I’m interested in all of them"
    )

    val experienceList = listOf(
        "Beginner", "Some experience", "Intermediate", "Advanced", "I have never used AI tools before"
    )

    val deviceList = listOf(
        "Laptop", "Tablet", "Phone", "Not sure yet"
    )

    if (success) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp)
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFDCFCE7)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Success",
                    tint = Color(0xFF16A34A),
                    modifier = Modifier.size(40.dp)
                )
            }
            Spacer(modifier = Modifier.height(20.dp))
            Text(
                text = "Seat Requested!",
                fontWeight = FontWeight.Black,
                fontSize = 26.sp,
                color = BrandColors.MidnightIndigo,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(14.dp))
            Text(
                text = "Thank you for registering for the Indigon AI Media Training! Your seat request has been received. Please check your email for event details and reminders.",
                fontSize = 15.sp,
                lineHeight = 22.sp,
                color = Color(0xFF334155),
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 12.dp)
            )
            Spacer(modifier = Modifier.height(30.dp))
            Button(
                onClick = {
                    viewModel.resetRegForm()
                    viewModel.navigateTo(AppViewModel.Screen.Home)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                colors = ButtonDefaults.buttonColors(containerColor = BrandColors.ElectricPurple),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text("Return to Home", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }
            Spacer(modifier = Modifier.height(10.dp))
            OutlinedButton(
                onClick = {
                    viewModel.resetRegForm()
                    viewModel.navigateTo(AppViewModel.Screen.EventDetails)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.outlinedButtonColors(contentColor = BrandColors.ElectricPurple)
            ) {
                Text("View Event Details", fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }
        }
    } else {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(16.dp)
        ) {
            Text(
                text = "Free Training Registration",
                fontWeight = FontWeight.Black,
                fontSize = 24.sp,
                color = BrandColors.MidnightIndigo,
                modifier = Modifier.padding(bottom = 4.dp)
            )
            Text(
                text = "Indigon AI Media Training • Limited Seating (50 Max)",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(bottom = 16.dp)
            )

            if (errorMessage != null) {
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFFEE2E2)),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Error,
                            contentDescription = "Error",
                            tint = Color.Red
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = errorMessage ?: "",
                            color = Color(0xFF991B1B),
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }

            // REQUIRED SECTION
            Text(
                text = "Required Information",
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                color = BrandColors.ElectricPurple,
                modifier = Modifier.padding(vertical = 8.dp)
            )

            // Full Name input
            OutlinedTextField(
                value = name,
                onValueChange = { viewModel.regName.value = it },
                label = { Text("Full Name *") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .testTag("reg_name_input"),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            // Email address input
            OutlinedTextField(
                value = email,
                onValueChange = { viewModel.regEmail.value = it },
                label = { Text("Email Address *") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .testTag("reg_email_input"),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            // Phone Number
            OutlinedTextField(
                value = phone,
                onValueChange = { viewModel.regPhone.value = it },
                label = { Text("Phone Number *") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .testTag("reg_phone_input"),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            // City State
            OutlinedTextField(
                value = cityState,
                onValueChange = { viewModel.regCityState.value = it },
                label = { Text("City / State *") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .testTag("reg_citystate_input"),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            // Dropdown attending as
            RegistrationDropdown(
                label = "I am attending as",
                value = attendingAs,
                options = attendingList,
                onSelect = { viewModel.regAttendingAs.value = it }
            )

            // Which AI media category interests you most?
            RegistrationDropdown(
                label = "Which AI media category interests you most?",
                value = categoryInterest,
                options = categoryList,
                onSelect = { viewModel.regCategoryInterest.value = it }
            )

            // Current AI experience level
            RegistrationDropdown(
                label = "Current AI experience level",
                value = experienceLevel,
                options = experienceList,
                onSelect = { viewModel.regExperienceLevel.value = it }
            )

            // What device will you bring?
            RegistrationDropdown(
                label = "What device will you bring?",
                value = device,
                options = deviceList,
                onSelect = { viewModel.regDevice.value = it }
            )

            // Updates Option Row
            Text(
                text = "Would you like updates about future Vollywood® / Indigon events?",
                fontSize = 14.sp,
                color = Color.DarkGray,
                modifier = Modifier.padding(top = 10.dp, bottom = 4.dp)
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                RadioButton(
                    selected = receiveUpdates,
                    onClick = { viewModel.regReceiveUpdates.value = true }
                )
                Text(
                    text = "Yes",
                    modifier = Modifier
                        .clickable { viewModel.regReceiveUpdates.value = true }
                        .padding(end = 24.dp)
                )

                RadioButton(
                    selected = !receiveUpdates,
                    onClick = { viewModel.regReceiveUpdates.value = false }
                )
                Text(
                    text = "No",
                    modifier = Modifier.clickable { viewModel.regReceiveUpdates.value = false }
                )
            }

            HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

            // OPTIONAL SECTION
            Text(
                text = "Optional Information",
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                color = BrandColors.ElectricPurple,
                modifier = Modifier.padding(bottom = 8.dp)
            )

            OutlinedTextField(
                value = businessName,
                onValueChange = { viewModel.regBusinessName.value = it },
                label = { Text("Business / Organization Name") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            OutlinedTextField(
                value = websiteSocial,
                onValueChange = { viewModel.regWebsiteSocial.value = it },
                label = { Text("Website or Social Media Link") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp),
                singleLine = true,
                shape = RoundedCornerShape(10.dp)
            )

            OutlinedTextField(
                value = hopeToLearn,
                onValueChange = { viewModel.regHopeToLearn.value = it },
                label = { Text("What do you hope to learn?") },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(90.dp)
                    .padding(vertical = 4.dp),
                maxLines = 3,
                shape = RoundedCornerShape(10.dp)
            )

            Text(
                text = "Future challenges, team projects or showcases?",
                fontSize = 14.sp,
                color = Color.DarkGray,
                modifier = Modifier.padding(top = 10.dp, bottom = 4.dp)
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                listOf("Yes", "No", "Maybe").forEach { choice ->
                    RadioButton(
                        selected = considerChallenges == choice,
                        onClick = { viewModel.regConsiderChallenges.value = choice }
                    )
                    Text(
                        text = choice,
                        modifier = Modifier
                            .clickable { viewModel.regConsiderChallenges.value = choice }
                            .padding(end = 16.dp)
                    )
                }
            }

            HorizontalDivider(modifier = Modifier.padding(vertical = 16.dp))

            // CONSENT CHECKBOX
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                verticalAlignment = Alignment.Top
            ) {
                Checkbox(
                    checked = consent,
                    onCheckedChange = { viewModel.regConsent.value = it },
                    modifier = Modifier.testTag("reg_consent_checkbox")
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "I understand this is a free training with limited seating, and I agree to receive event details by email or text.",
                    fontSize = 13.sp,
                    lineHeight = 18.sp,
                    color = Color.DarkGray,
                    modifier = Modifier.clickable { viewModel.regConsent.value = !consent }
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Submissions Button
            Button(
                onClick = { viewModel.submitRegistration() },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp)
                    .testTag("reg_submit_button"),
                colors = ButtonDefaults.buttonColors(containerColor = BrandColors.ElectricPurple),
                shape = RoundedCornerShape(12.dp),
                enabled = !isSubmitting
            ) {
                if (isSubmitting) {
                    CircularProgressIndicator(color = Color.White, modifier = Modifier.size(24.dp))
                } else {
                    Text("Submit Registration", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                }
            }

            Spacer(modifier = Modifier.height(40.dp))
        }
    }
}


// --------------------------------------------------
// 3. EVENT DETAILS PAGE
// --------------------------------------------------
@Composable
fun EventDetailsPage(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Surface(
            color = BrandColors.MidnightIndigo,
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "EVENT INFORMATION",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF00E5FF),
                    letterSpacing = 1.5.sp
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Indigon AI Media Training",
                    style = MaterialTheme.typography.headlineMedium.copy(
                        fontWeight = FontWeight.Black,
                        color = Color.White,
                        textAlign = TextAlign.Center
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Main Metadata List
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                DetailItem(
                    icon = Icons.Default.CalendarToday,
                    label = "Date",
                    value = "June 27, 2026",
                    color = BrandColors.ElectricPurple
                )
                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                DetailItem(
                    icon = Icons.Default.Schedule,
                    label = "Time",
                    value = "10:00 AM - 4:00 PM EST",
                    color = BrandColors.ElectricPurple
                )
                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                DetailItem(
                    icon = Icons.Default.Place,
                    label = "Location",
                    value = "Vollywood Training Center, 1200 Creative Media Way, Richmond, VA",
                    color = BrandColors.ElectricPurple
                )
                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                DetailItem(
                    icon = Icons.Default.AttachMoney,
                    label = "Cost",
                    value = "Free to Attend",
                    color = Color(0xFF16A34A)
                )
                HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp))
                DetailItem(
                    icon = Icons.Default.AirlineSeatReclineNormal,
                    label = "Seats",
                    value = "Limited to the first 50 registered attendees",
                    color = BrandColors.CoralPink
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Description Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = null,
                        tint = BrandColors.ElectricPurple
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Training Focus",
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = BrandColors.MidnightIndigo
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "The Indigon AI Media Training is a free introductory session created to help local creatives, filmmakers, students, business owners, and media professionals understand how AI can support storytelling, marketing, and production.",
                    fontSize = 14.sp,
                    lineHeight = 22.sp,
                    color = Color(0xFF334155)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // What to Bring Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "What You Should Bring",
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                    color = BrandColors.MidnightIndigo
                )
                Spacer(modifier = Modifier.height(12.dp))

                listOf(
                    "Laptop, tablet, or smartphone (with charging brick)",
                    "Notebook, digital device or notes app for learning",
                    "Business cards, creative portfolio or digital contact links",
                    "Creative ideas, project concepts, or workflow questions"
                ).forEach { item ->
                    Row(
                        modifier = Modifier.padding(vertical = 4.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Text(text = "•", fontWeight = FontWeight.Black, color = BrandColors.ElectricPurple)
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = item,
                            fontSize = 14.sp,
                            lineHeight = 20.sp,
                            color = Color(0xFF475569)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            onClick = { viewModel.navigateTo(AppViewModel.Screen.RegistrationPage) },
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp),
            colors = ButtonDefaults.buttonColors(containerColor = BrandColors.ElectricPurple),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text("Register For Free Seat", fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(30.dp))
    }
}

@Composable
fun DetailItem(
    icon: ImageVector,
    label: String,
    value: String,
    color: Color
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.Top
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = color,
            modifier = Modifier
                .padding(top = 2.dp)
                .size(20.dp)
        )
        Spacer(modifier = Modifier.width(12.dp))
        Column {
            Text(
                text = label,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = Color.LightGray
            )
            Text(
                text = value,
                fontSize = 15.sp,
                fontWeight = FontWeight.Medium,
                color = Color(0xFF1E293B)
            )
        }
    }
}


// --------------------------------------------------
// 4. CATEGORIES PAGE
// --------------------------------------------------
@Composable
fun CategoriesPage(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()

    val categories = listOf(
        CategoryItem(
            title = "AI Commercials / Ads",
            desc = "Create powerful brand messages, product videos, sponsor promos, and social media ads using AI-assisted media tools.",
            benefit = "Learn: Automatic dynamic pricing presets, scene generation from single product photos, and automated voiceover workflows.",
            icon = Icons.Default.Campaign
        ),
        CategoryItem(
            title = "AI Movie Trailers",
            desc = "Develop cinematic teaser concepts, pitch visuals, story worlds, and promotional trailers using AI.",
            benefit = "Learn: Scene sequencing, character consistency engines, cinematic prompts, and sound effects layering.",
            icon = Icons.Default.Hd
        ),
        CategoryItem(
            title = "AI Short Films",
            desc = "Explore how AI can support short film development, visual storytelling, concept art, and production planning.",
            benefit = "Learn: AI storyboarding frameworks, visual aesthetic models, dialogue structuring, and post-production scaling.",
            icon = Icons.Default.MovieFilter
        ),
        CategoryItem(
            title = "AI Music Videos",
            desc = "Use AI visuals, animation, style prompts, and creative direction to build music video concepts.",
            benefit = "Learn: Beat-synchronized video triggers, style transfer filters, and hallucinatory creative animation paths.",
            icon = Icons.Default.MusicVideo
        )
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Text(
            text = "AI Media Categories",
            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
            color = BrandColors.MidnightIndigo
        )
        Text(
            text = "These core categories define the training exercises and the upcoming festival gauntlet.",
            fontSize = 14.sp,
            color = Color.Gray,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        categories.forEach { cat ->
            var expandedDetail by remember { mutableStateOf(false) }

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(42.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color(0xFFE0F2FE)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = cat.icon,
                                contentDescription = null,
                                tint = Color(0xFF0369A1),
                                modifier = Modifier.size(24.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            text = cat.title,
                            fontWeight = FontWeight.Black,
                            fontSize = 18.sp,
                            color = BrandColors.MidnightIndigo
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = cat.desc,
                        fontSize = 14.sp,
                        lineHeight = 20.sp,
                        color = Color(0xFF475569)
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    if (expandedDetail) {
                        Surface(
                            color = Color(0xFFF8FAFC),
                            shape = RoundedCornerShape(8.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 12.dp)
                        ) {
                            Row(modifier = Modifier.padding(12.dp)) {
                                Icon(
                                    imageVector = Icons.Default.TipsAndUpdates,
                                    contentDescription = null,
                                    tint = BrandColors.ElectricPurple,
                                    modifier = Modifier.size(20.dp)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = cat.benefit,
                                    fontSize = 13.sp,
                                    lineHeight = 18.sp,
                                    color = Color(0xFF334155),
                                    fontWeight = FontWeight.Medium
                                )
                            }
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Button(
                            onClick = { viewModel.navigateTo(AppViewModel.Screen.RegistrationPage) },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF1F5F9)),
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text("Join Training Group", color = BrandColors.MidnightIndigo, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }

                        OutlinedButton(
                            onClick = { expandedDetail = !expandedDetail },
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(
                                text = if (expandedDetail) "Close Info" else "Learn More",
                                fontWeight = FontWeight.Bold,
                                color = BrandColors.ElectricPurple,
                                fontSize = 12.sp
                            )
                        }
                    }
                }
            }
        }
        Spacer(modifier = Modifier.height(30.dp))
    }
}

data class CategoryItem(val title: String, val desc: String, val benefit: String, val icon: ImageVector)


// --------------------------------------------------
// 5. PRESENTERS PAGE
// --------------------------------------------------
@Composable
fun PresentersPage(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Text(
            text = "Indigon Presenters",
            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
            color = BrandColors.MidnightIndigo
        )
        Text(
            text = "Learn directly from active directors, creative technology founders, and digital filmmakers.",
            fontSize = 14.sp,
            color = Color.Gray,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Tony Holobyte Card
        PresenterCard(
            name = "Tony Holobyte",
            title = "Founder of Vollywood® / Indigon Creator",
            bio = "Tony Holobyte is the founder of Vollywood®, a Virginia-based media company focused on film, creative technology, training, and independent media development. Through Indigon, he is building a space for creators to learn, experiment, and showcase AI-powered media.",
            initials = "TH"
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Scott Hansen Card
        PresenterCard(
            name = "Scott Hansen",
            title = "AI Filmmaker / Creative AI Workflow Presenter",
            bio = "Scott Hansen is a local AI filmmaker helping with the Indigon Festival. He brings hands-on experience using AI filmmaking tools to develop visuals, concepts, and cinematic workflows for modern media production.",
            initials = "SH"
        )

        Spacer(modifier = Modifier.height(20.dp))

        // PLaceholders requested:
        Text(
            text = "Future Guest Presenters",
            fontWeight = FontWeight.Bold,
            color = BrandColors.MidnightIndigo,
            fontSize = 16.sp,
            modifier = Modifier.padding(vertical = 8.dp)
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                FuturePresenterRow(label = "Guest Presenter", highlight = "To Be Announced")
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                FuturePresenterRow(label = "Sponsor Presenter", highlight = "Brand Expert")
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                FuturePresenterRow(label = "Community Partner", highlight = "Local Creative Guild")
            }
        }

        Spacer(modifier = Modifier.height(30.dp))
    }
}

@Composable
fun PresenterCard(
    name: String,
    title: String,
    bio: String,
    initials: String
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(54.dp)
                        .clip(CircleShape)
                        .background(BrandColors.AccentGradientLight),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = initials,
                        color = Color.White,
                        fontWeight = FontWeight.Black,
                        fontSize = 18.sp
                    )
                }
                Spacer(modifier = Modifier.width(14.dp))
                Column {
                    Text(
                        text = name,
                        fontWeight = FontWeight.Black,
                        fontSize = 20.sp,
                        color = BrandColors.MidnightIndigo
                    )
                    Text(
                        text = title,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = BrandColors.ElectricPurple
                    )
                }
            }
            Spacer(modifier = Modifier.height(14.dp))
            Text(
                text = bio,
                fontSize = 14.sp,
                lineHeight = 22.sp,
                color = Color(0xFF334155)
            )
        }
    }
}

@Composable
fun FuturePresenterRow(label: String, highlight: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(10.dp)
                    .clip(CircleShape)
                    .background(BrandColors.ElectricPurple)
            )
            Spacer(modifier = Modifier.width(10.dp))
            Text(
                text = label,
                fontWeight = FontWeight.Bold,
                fontSize = 14.sp,
                color = Color(0xFF1E293B)
            )
        }
        Text(
            text = highlight,
            fontSize = 12.sp,
            color = Color.Gray,
            fontWeight = FontWeight.SemiBold
        )
    }
}


// --------------------------------------------------
// 6. SPONSOR PAGE
// --------------------------------------------------
@Composable
fun SponsorPage(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()

    val spName by viewModel.spName.collectAsStateWithLifecycle()
    val spCompany by viewModel.spCompany.collectAsStateWithLifecycle()
    val spEmail by viewModel.spEmail.collectAsStateWithLifecycle()
    val spPhone by viewModel.spPhone.collectAsStateWithLifecycle()
    val spInterests by viewModel.spInterests.collectAsStateWithLifecycle()

    val sponsorSubmitting by viewModel.sponsorSubmitting.collectAsStateWithLifecycle()
    val sponsorSuccess by viewModel.sponsorSuccess.collectAsStateWithLifecycle()
    val sponsorError by viewModel.sponsorError.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Surface(
            color = Color(0xFFF1F5F9),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Sponsor Indigon",
                    style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Black),
                    color = BrandColors.MidnightIndigo
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Indigon gives sponsors a chance to connect with filmmakers, students, creators, business owners, and technology-forward media professionals.",
                    fontSize = 14.sp,
                    lineHeight = 22.sp,
                    color = Color(0xFF475569)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Sponsor Benefits Detail Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Sponsorship Benefits",
                    fontWeight = FontWeight.Black,
                    fontSize = 16.sp,
                    color = BrandColors.MidnightIndigo
                )
                Spacer(modifier = Modifier.height(10.dp))

                val benefits = listOf(
                    "High prominence logo placement in the official digital App",
                    "Custom featured sponsor cards explaining your products",
                    "Dedicated live event mention and category awards presenters",
                    "Direct linking to your website and contact channels",
                    "Sponsorship opportunities for specific categories & awards",
                    "Post-event continuous recap and audience data exposure",
                    "Excellent community and innovative creative industry branding"
                )

                benefits.forEach { item ->
                    Row(
                        modifier = Modifier.padding(vertical = 4.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Icon(
                            imageVector = Icons.Default.Stars,
                            contentDescription = null,
                            tint = Color(0xFFFFB000),
                            modifier = Modifier
                                .padding(top = 2.dp)
                                .size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = item,
                            fontSize = 13.sp,
                            lineHeight = 18.sp,
                            color = Color(0xFF334155)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Sponsor Placeholders
        Text(
            text = "Active Packages / Placeholders",
            fontWeight = FontWeight.Bold,
            color = BrandColors.MidnightIndigo,
            fontSize = 15.sp,
            modifier = Modifier.padding(bottom = 8.dp)
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                PlaceholdersRow(label = "Presenting Sponsor", status = "Available Slot")
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                PlaceholdersRow(label = "Category Sponsor", status = "Active Reservation")
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                PlaceholdersRow(label = "Community Partner", status = "Available Slot")
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                PlaceholdersRow(label = "Technology Partner", status = "Available Slot")
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                PlaceholdersRow(label = "Media Partner", status = "Active Area")
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Request Sponsorship Information Interactive Form
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Request Sponsorship Information",
                    fontWeight = FontWeight.Black,
                    fontSize = 18.sp,
                    color = BrandColors.MidnightIndigo
                )
                Text(
                    text = "Submit a fast request summary and our partnership team will reach out immediately.",
                    fontSize = 13.sp,
                    color = Color.Gray,
                    modifier = Modifier.padding(bottom = 12.dp)
                )

                if (sponsorSuccess) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0xFFDCFCE7))
                            .padding(14.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "Success! Your inquiry has been sent. Check the Admin Dashboard to verify.",
                            color = Color(0xFF166534),
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center
                        )
                    }
                } else {
                    if (sponsorError != null) {
                        Text(
                            text = sponsorError ?: "",
                            color = Color.Red,
                            fontSize = 13.sp,
                            modifier = Modifier.padding(bottom = 8.dp)
                        )
                    }

                    OutlinedTextField(
                        value = spName,
                        onValueChange = { viewModel.spName.value = it },
                        label = { Text("Contact Name") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = spCompany,
                        onValueChange = { viewModel.spCompany.value = it },
                        label = { Text("Company / Org") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = spEmail,
                        onValueChange = { viewModel.spEmail.value = it },
                        label = { Text("Email Address") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = spPhone,
                        onValueChange = { viewModel.spPhone.value = it },
                        label = { Text("Phone Number") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = spInterests,
                        onValueChange = { viewModel.spInterests.value = it },
                        label = { Text("What sponsorship interests you most?") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(80.dp),
                        maxLines = 3
                    )
                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = { viewModel.submitSponsorInquiry() },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = BrandColors.ElectricPurple),
                        shape = RoundedCornerShape(10.dp),
                        enabled = !sponsorSubmitting
                    ) {
                        if (sponsorSubmitting) {
                            CircularProgressIndicator(color = Color.White, modifier = Modifier.size(20.dp))
                        } else {
                            Text("Send Sponsorship Request", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(40.dp))
    }
}

@Composable
fun PlaceholdersRow(label: String, status: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            fontWeight = FontWeight.Bold,
            fontSize = 14.sp,
            color = Color(0xFF1E293B)
        )
        Surface(
            color = if (status.contains("Available")) Color(0xFFFEF3C7) else Color(0xFFE0F2FE),
            shape = RoundedCornerShape(6.dp)
        ) {
            Text(
                text = status,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = if (status.contains("Available")) Color(0xFFD97706) else Color(0xFF0369A1),
                modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
            )
        }
    }
}


// --------------------------------------------------
// 7. VTC TRAINING PATH PAGE
// --------------------------------------------------
@Composable
fun VtcPathPage(viewModel: AppViewModel) {
    val scrollState = rememberScrollState()
    var newsletterJoined by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp)
    ) {
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(modifier = Modifier.padding(24.dp)) {
                Text(
                    text = "Continue Through Vollywood Training Center",
                    style = MaterialTheme.typography.titleLarge.copy(
                        fontWeight = FontWeight.Black,
                        color = BrandColors.MidnightIndigo
                    )
                )
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "The Indigon Festival connects directly to Vollywood Training Center, creating a pathway from beginner AI media training to advanced creative production, certification-style learning, showcases, and future festival opportunities.",
                    fontSize = 14.sp,
                    lineHeight = 22.sp,
                    color = Color(0xFF334155)
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Your VTC AI Learning Path",
            fontWeight = FontWeight.Bold,
            color = BrandColors.MidnightIndigo,
            fontSize = 16.sp,
            modifier = Modifier.padding(bottom = 10.dp)
        )

        val paths = listOf(
            PathStep("01", "Intro to AI Media Production", "Master text-to-video tools, framing variables, and soundscape automation generators."),
            PathStep("02", "Prompt Writing for Visual Storytelling", "Develop consistent worlds and custom character seeds across dynamic timeline generations."),
            PathStep("03", "AI Commercial Creation", "Formulate brand messaging structures, promo segments, and social media rapid ad frameworks."),
            PathStep("04", "AI Short Film Development", "Orchestrate concepts, narrative script-to-video timing, and post-production scaling guides."),
            PathStep("05", "AI Music Video Concepts", "Build stylized music animation elements synchronized perfectly with beat inputs."),
            PathStep("06", "Festival Submission Preparation", "Finalize rendering models, edit transitions, compile licensing, and package assets for Indigon.")
        )

        paths.forEach { step ->
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(Color(0xFFF3E8FF)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = step.num,
                            fontWeight = FontWeight.Black,
                            color = BrandColors.ElectricPurple,
                            fontSize = 14.sp
                        )
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = step.title,
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp,
                            color = BrandColors.MidnightIndigo
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = step.desc,
                            fontSize = 13.sp,
                            lineHeight = 18.sp,
                            color = Color(0xFF475569)
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        if (newsletterJoined) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0xFFDCFCE7))
                    .padding(20.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = null,
                        tint = Color(0xFF16A34A),
                        modifier = Modifier.size(30.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Awesome! You are on the VTC Training List. We will send course details shortly.",
                        color = Color(0xFF15803D),
                        fontWeight = FontWeight.Bold,
                        textAlign = TextAlign.Center,
                        fontSize = 14.sp
                    )
                }
            }
        } else {
            Button(
                onClick = { newsletterJoined = true },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .testTag("vtc_join_list_button"),
                colors = ButtonDefaults.buttonColors(containerColor = BrandColors.ElectricPurple),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "Join the VTC Training List",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(30.dp))
    }
}

data class PathStep(val num: String, val title: String, val desc: String)


// --------------------------------------------------
// 8. ADMIN DASHBOARD PAGE
// --------------------------------------------------
@Composable
fun AdminDashboardPage(viewModel: AppViewModel) {
    val registrations by viewModel.registrationsList.collectAsStateWithLifecycle()
    val inquiries by viewModel.sponsorInquiriesList.collectAsStateWithLifecycle()

    var activeTabIsReg by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Admin View Database",
            fontWeight = FontWeight.Black,
            fontSize = 24.sp,
            color = BrandColors.MidnightIndigo
        )
        Text(
            text = "Verify registered attendees, experience levels, and sponsor requests.",
            fontSize = 13.sp,
            color = Color.Gray,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        // Metrics Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(text = "Total Seats", fontSize = 11.sp, color = Color.Gray, fontWeight = FontWeight.Bold)
                    Text(text = "${registrations.size} / 50", fontSize = 20.sp, fontWeight = FontWeight.Black, color = BrandColors.ElectricPurple)
                }
            }
            Card(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(text = "Sponsor Requests", fontSize = 11.sp, color = Color.Gray, fontWeight = FontWeight.Bold)
                    Text(text = "${inquiries.size}", fontSize = 20.sp, fontWeight = FontWeight.Black, color = BrandColors.NeonCyan)
                }
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Tab Selector Row
        TabRow(
            selectedTabIndex = if (activeTabIsReg) 0 else 1,
            containerColor = Color.White,
            contentColor = BrandColors.ElectricPurple
        ) {
            Tab(
                selected = activeTabIsReg,
                onClick = { activeTabIsReg = true },
                text = { Text("Registrants (${registrations.size})", fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = !activeTabIsReg,
                onClick = { activeTabIsReg = false },
                text = { Text("Sponsor Requests (${inquiries.size})", fontWeight = FontWeight.Bold) }
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        if (activeTabIsReg) {
            if (registrations.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text("No registrants saved yet.", color = Color.Gray, fontWeight = FontWeight.Medium)
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(registrations) { reg ->
                        RegistrantCard(reg)
                    }
                }
            }
        } else {
            if (inquiries.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text("No sponsor requests yet.", color = Color.Gray, fontWeight = FontWeight.Medium)
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    items(inquiries) { inq ->
                        SponsorRequestCard(inq)
                    }
                }
            }
        }
    }
}

@Composable
fun RegistrantCard(reg: Registration) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = reg.fullName,
                    fontWeight = FontWeight.Black,
                    fontSize = 16.sp,
                    color = BrandColors.MidnightIndigo
                )
                Surface(
                    color = Color(0xFFF1F5F9),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = reg.attendingAs,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = BrandColors.ElectricPurple,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(6.dp))

            Text(text = "Email: ${reg.emailAddress}", fontSize = 13.sp, color = Color.DarkGray)
            Text(text = "Phone: ${reg.phoneNumber}", fontSize = 13.sp, color = Color.DarkGray)
            Text(text = "City/State: ${reg.cityState}", fontSize = 13.sp, color = Color.DarkGray)
            Text(text = "Category Interest: ${reg.categoryInterest}", fontSize = 13.sp, color = Color.DarkGray, fontWeight = FontWeight.Medium)
            Text(text = "Experience: ${reg.experienceLevel}", fontSize = 13.sp, color = Color.DarkGray)
            Text(text = "Device Selected: ${reg.deviceToBring}", fontSize = 13.sp, color = Color.DarkGray)

            if (reg.businessOrgName.isNotBlank()) {
                Text(text = "Business Name: ${reg.businessOrgName}", fontSize = 13.sp, color = Color.DarkGray)
            }
            if (reg.websiteSocialLink.isNotBlank()) {
                Text(text = "Website / Socials: ${reg.websiteSocialLink}", fontSize = 13.sp, color = Color.DarkGray)
            }
            if (reg.hopeToLearn.isNotBlank()) {
                Text(text = "wants to Learn: ${reg.hopeToLearn}", fontSize = 13.sp, color = Color(0xFF475569), style = MaterialTheme.typography.bodySmall)
            }
            Text(
                text = "Join future challenges / projects: ${reg.considerFutureChallenges}",
                fontSize = 13.sp,
                color = Color.DarkGray,
                fontWeight = FontWeight.SemiBold
            )
            Text(
                text = "Agreed to Updates: ${if(reg.receiveUpdates) "Yes" else "No"}",
                fontSize = 12.sp,
                color = if (reg.receiveUpdates) Color(0xFF16A34A) else Color.Gray,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
fun SponsorRequestCard(inq: SponsorInquiry) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(
                text = inq.fullName,
                fontWeight = FontWeight.Black,
                fontSize = 16.sp,
                color = BrandColors.MidnightIndigo
            )
            Text(
                text = "Company: ${inq.companyOrg}",
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                color = BrandColors.ElectricPurple
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(text = "Email: ${inq.email}", fontSize = 13.sp, color = Color.DarkGray)
            Text(text = "Phone: ${inq.phone}", fontSize = 13.sp, color = Color.DarkGray)

            if (inq.interests.isNotBlank()) {
                Spacer(modifier = Modifier.height(6.dp))
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC)),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = inq.interests,
                        fontSize = 12.sp,
                        color = Color(0xFF334155),
                        modifier = Modifier.padding(10.dp)
                    )
                }
            }
        }
    }
}
