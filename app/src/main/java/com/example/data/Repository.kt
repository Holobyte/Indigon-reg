package com.example.data

import kotlinx.coroutines.flow.Flow

class AppRepository(
    private val registrationDao: RegistrationDao,
    private val sponsorInquiryDao: SponsorInquiryDao
) {
    val registrations: Flow<List<Registration>> = registrationDao.getAllRegistrations()
    val inquiries: Flow<List<SponsorInquiry>> = sponsorInquiryDao.getAllInquiries()

    suspend fun insertRegistration(registration: Registration): Long {
        return registrationDao.insertRegistration(registration)
    }

    suspend fun insertSponsorInquiry(inquiry: SponsorInquiry): Long {
        return sponsorInquiryDao.insertInquiry(inquiry)
    }
}
