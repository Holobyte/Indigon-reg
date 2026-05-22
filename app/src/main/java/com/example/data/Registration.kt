package com.example.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "registrations")
data class Registration(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val fullName: String,
    val emailAddress: String,
    val phoneNumber: String,
    val cityState: String,
    val attendingAs: String,
    val categoryInterest: String,
    val experienceLevel: String,
    val deviceToBring: String,
    val receiveUpdates: Boolean,
    val businessOrgName: String = "",
    val websiteSocialLink: String = "",
    val hopeToLearn: String = "",
    val considerFutureChallenges: String = "",
    val timestamp: Long = System.currentTimeMillis()
)
