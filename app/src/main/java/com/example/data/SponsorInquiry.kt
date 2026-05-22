package com.example.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "sponsor_inquiries")
data class SponsorInquiry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val fullName: String,
    val companyOrg: String,
    val email: String,
    val phone: String,
    val interests: String = "",
    val timestamp: Long = System.currentTimeMillis()
)
