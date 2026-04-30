<template>
  <div class="dashboard-container">
    <!-- Header Integration with Glass Effect -->
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="[
        isScrolled 
          ? 'bg-black/60 backdrop-blur-xl shadow-lg py-3 border-b border-yellow-500/20' 
          : 'bg-transparent py-6'
      ]"
    >
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
              alt="GoAbroad Admissions Logo" 
              class="h-12 w-auto md:h-14 brightness-110" 
            >
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/" 
              class="nav-link"
              :class="[
                { 'active': $route.path === '/' },
                'text-gray-300 hover:text-yellow-400'
              ]"
            >
              <span>Home</span>
            </router-link>

            <router-link 
              to="/scholarships" 
              class="nav-link"
              :class="[
                { 'active': $route.path === '/scholarships' },
                'text-gray-300 hover:text-yellow-400'
              ]"
            >
              <span>Scholarships</span>
            </router-link>

            <router-link 
              to="/about" 
              class="nav-link"
              :class="[
                { 'active': $route.path === '/about' },
                'text-gray-300 hover:text-yellow-400'
              ]"
            >
              <span>About</span>
            </router-link>

            <router-link 
              to="/contact" 
              class="nav-link"
              :class="[
                { 'active': $route.path === '/contact' },
                'text-gray-300 hover:text-yellow-400'
              ]"
            >
              <span>Contact</span>
            </router-link>

            <!-- Notifications Icon -->
            <div class="relative ml-2">
              <button 
                @click="toggleNotifications"
                class="relative p-2 rounded-full transition-colors text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400"
              >
                <Bell :size="20" />
                <span 
                  v-if="unreadCount > 0" 
                  class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-yellow-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                >
                  {{ unreadCount > 9 ? '9+' : unreadCount }}
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <div 
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden z-50 border border-yellow-500/20"
              >
                <div class="p-4 border-b border-yellow-500/20 flex justify-between items-center">
                  <div>
                    <h3 class="font-semibold text-white">Latest News</h3>
                    <p class="text-xs text-gray-400">Stay updated with the latest announcements</p>
                  </div>
                  <button 
                    v-if="unreadCount > 0"
                    @click="markAllAsRead"
                    class="text-xs text-yellow-400 hover:text-yellow-300 font-medium"
                  >
                    Mark all as read
                  </button>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div 
                    v-for="notification in notifications" 
                    :key="notification.id"
                    class="p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0"
                    :class="{ 'bg-yellow-500/5': !notification.read }"
                    @click="markAsRead(notification)"
                  >
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 mt-0.5">
                        <div v-if="notification.type === 'news'" class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div v-else-if="notification.type === 'deadline'" class="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div v-else class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-white">{{ notification.title }}</p>
                        <p class="text-xs text-gray-400 mt-1">{{ notification.message }}</p>
                        <span class="text-xs text-gray-500 mt-1 inline-block">{{ notification.time }}</span>
                      </div>
                      <div v-if="!notification.read" class="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div class="p-3 text-center border-t border-yellow-500/20">
                  <router-link 
                    to="/news" 
                    class="text-xs text-yellow-400 hover:text-yellow-300 font-medium"
                    @click="closeNotifications"
                  >
                    View All News →
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-xl transition-colors text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400"
          >
            <Menu :size="24" v-if="!mobileMenuOpen" />
            <X :size="24" v-else />
          </button>
        </div>

        <!-- Mobile Menu -->
        <div 
          v-show="mobileMenuOpen"
          class="md:hidden mt-4 rounded-2xl overflow-hidden bg-black/90 backdrop-blur-xl shadow-lg border border-yellow-500/20"
        >
          <div class="py-3 space-y-1">
            <router-link 
              to="/" 
              class="mobile-nav-link"
              :class="{ 'active': $route.path === '/' }"
              @click="closeMobileMenu"
            >
              <span>Home</span>
            </router-link>

            <router-link 
              to="/scholarships" 
              class="mobile-nav-link"
              :class="{ 'active': $route.path === '/scholarships' }"
              @click="closeMobileMenu"
            >
              <span>Scholarships</span>
            </router-link>

            <router-link 
              to="/about" 
              class="mobile-nav-link"
              :class="{ 'active': $route.path === '/about' }"
              @click="closeMobileMenu"
            >
              <span>About</span>
            </router-link>

            <router-link 
              to="/contact" 
              class="mobile-nav-link"
              :class="{ 'active': $route.path === '/contact' }"
              @click="closeMobileMenu"
            >
              <span>Contact</span>
            </router-link>

            <!-- Mobile Notifications -->
            <div class="border-t border-yellow-500/20 my-2 pt-2">
              <div class="flex items-center justify-between px-4 py-3">
                <div class="flex items-center gap-2">
                  <Bell :size="16" class="text-gray-400" />
                  <span class="text-sm font-medium text-gray-300">Latest News</span>
                  <span 
                    v-if="unreadCount > 0" 
                    class="bg-yellow-500 text-black text-[10px] font-bold rounded-full px-1.5 py-0.5"
                  >
                    {{ unreadCount }}
                  </span>
                </div>
                <router-link 
                  to="/news" 
                  class="text-xs text-yellow-400 hover:text-yellow-300"
                  @click="closeMobileMenu"
                >
                  View All
                </router-link>
              </div>
              <div class="space-y-2 px-2">
                <div 
                  v-for="notification in notifications.slice(0, 3)" 
                  :key="notification.id"
                  class="p-3 rounded-xl"
                  :class="!notification.read ? 'bg-yellow-500/10' : 'bg-white/5'"
                >
                  <p class="text-xs font-medium text-gray-200">{{ notification.title }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ notification.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Dashboard Content -->
    <div class="pt-28">
      <!-- Stats Cards -->
      <section class="py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <!-- Total Subscribers Card -->
            <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 p-6 border border-yellow-500/20 hover:border-yellow-500/50 group">
              <div class="flex items-center justify-between mb-4">
                <div class="bg-yellow-500/10 rounded-xl p-3 group-hover:bg-yellow-500/20 transition">
                  <Users class="w-6 h-6 text-yellow-500" />
                </div>
                <span class="text-3xl font-bold text-white">{{ stats.totalSubscribers }}</span>
              </div>
              <h3 class="text-gray-300 font-semibold text-sm">Total Subscribers</h3>
              <p class="text-xs text-gray-500 mt-1">Newsletter subscribers</p>
            </div>

            <!-- Total Contacts Card -->
            <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300 p-6 border border-purple-500/20 hover:border-purple-500/50 group">
              <div class="flex items-center justify-between mb-4">
                <div class="bg-purple-500/10 rounded-xl p-3 group-hover:bg-purple-500/20 transition">
                  <MessageSquare class="w-6 h-6 text-purple-400" />
                </div>
                <span class="text-3xl font-bold text-white">{{ stats.totalContacts }}</span>
              </div>
              <h3 class="text-gray-300 font-semibold text-sm">Total Contacts</h3>
              <p class="text-xs text-gray-500 mt-1">Contact form messages</p>
            </div>

            <!-- Scholarship Inquiries Card -->
            <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 p-6 border border-yellow-500/20 hover:border-yellow-500/50 group">
              <div class="flex items-center justify-between mb-4">
                <div class="bg-yellow-500/10 rounded-xl p-3 group-hover:bg-yellow-500/20 transition">
                  <GraduationCap class="w-6 h-6 text-yellow-500" />
                </div>
                <span class="text-3xl font-bold text-white">{{ stats.totalInquiries }}</span>
              </div>
              <h3 class="text-gray-300 font-semibold text-sm">Total Inquiries</h3>
              <p class="text-xs text-gray-500 mt-1">Scholarship requests</p>
            </div>

            <!-- Total Scholarships Card -->
            <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300 p-6 border border-purple-500/20 hover:border-purple-500/50 group">
              <div class="flex items-center justify-between mb-4">
                <div class="bg-purple-500/10 rounded-xl p-3 group-hover:bg-purple-500/20 transition">
                  <BookOpen class="w-6 h-6 text-purple-400" />
                </div>
                <span class="text-3xl font-bold text-white">{{ allScholarships.length }}</span>
              </div>
              <h3 class="text-gray-300 font-semibold text-sm">Total Scholarships</h3>
              <p class="text-xs text-gray-500 mt-1">Available scholarships</p>
            </div>

            <!-- Featured Scholarships Card -->
            <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 p-6 border border-yellow-500/20 hover:border-yellow-500/50 group">
              <div class="flex items-center justify-between mb-4">
                <div class="bg-yellow-500/10 rounded-xl p-3 group-hover:bg-yellow-500/20 transition">
                  <Star class="w-6 h-6 text-yellow-500" />
                </div>
                <span class="text-3xl font-bold text-white">{{ featuredCount }}</span>
              </div>
              <h3 class="text-gray-300 font-semibold text-sm">Featured</h3>
              <p class="text-xs text-gray-500 mt-1">Featured scholarships</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tabs Navigation - Solid Colors -->
      <section class="pb-6">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="border-b border-yellow-500/20">
            <nav class="flex gap-2 overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-6 py-3 text-sm font-medium transition-all duration-200 rounded-t-2xl whitespace-nowrap backdrop-blur-sm',
                  activeTab === tab.id 
                    ? 'bg-yellow-500 text-black shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-yellow-400 bg-black/20'
                ]"
              >
                <component :is="tab.icon" class="w-4 h-4 inline mr-2" />
                {{ tab.name }}
                <span class="ml-2 px-2 py-0.5 text-xs rounded-full" :class="activeTab === tab.id ? 'bg-black/20 text-white' : 'bg-gray-800/50 text-gray-400'">
                  {{ tab.count }}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="loading-spinner mx-auto mb-4"></div>
          <p class="text-gray-400 text-sm">Loading dashboard data...</p>
        </div>
      </div>

      <!-- Subscribers Tab -->
      <section v-else-if="activeTab === 'subscribers'" class="pb-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-yellow-500/20">
            <div class="px-6 py-5 border-b border-yellow-500/20 bg-black/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <Users class="w-5 h-5 text-yellow-500" />
                  <h2 class="text-lg font-semibold text-white">Newsletter Subscribers</h2>
                </div>
                <button @click="exportData('subscribers')" class="bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg">
                  <Download class="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-black/50">
                  <tr class="border-b border-yellow-500/20">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Email</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sub in subscribers" :key="sub.id" class="border-t border-white/5 hover:bg-white/5 transition">
                    <td class="px-6 py-4 text-sm text-gray-400">{{ sub.id }}</td>
                    <td class="px-6 py-4 text-sm font-medium text-white">{{ sub.email }}</td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ formatDate(sub.subscribed_at) }}</td>
                    <td class="px-6 py-4">
                      <button @click="deleteSubscriber(sub.id)" class="text-purple-400 hover:text-purple-300 transition">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr v-if="subscribers.length === 0">
                    <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                      <Users class="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p class="text-sm">No subscribers yet</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Contacts Tab -->
      <section v-else-if="activeTab === 'contacts'" class="pb-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-purple-500/20">
            <div class="px-6 py-5 border-b border-purple-500/20 bg-black/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <MessageSquare class="w-5 h-5 text-purple-400" />
                  <h2 class="text-lg font-semibold text-white">Contact Messages</h2>
                </div>
                <button @click="exportData('contacts')" class="bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg">
                  <Download class="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-black/50">
                  <tr class="border-b border-purple-500/20">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Email</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Subject</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="contact in contacts" :key="contact.id" class="border-t border-white/5 hover:bg-white/5 transition">
                    <td class="px-6 py-4 text-sm text-gray-400">{{ contact.id }}</td>
                    <td class="px-6 py-4 text-sm font-medium text-white">{{ contact.full_name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ contact.email }}</td>
                    <td class="px-6 py-4"><span class="inline-flex px-3 py-1 rounded-xl text-xs font-medium bg-yellow-500/10 text-yellow-400">{{ contact.subject }}</span></td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ formatDate(contact.created_at) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button @click="viewMessage(contact)" class="text-purple-400 hover:text-purple-300 transition">
                          <Eye class="w-4 h-4" />
                        </button>
                        <button @click="deleteContact(contact.id)" class="text-rose-400 hover:text-rose-300 transition">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="contacts.length === 0">
                    <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                      <MessageSquare class="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p class="text-sm">No contact messages yet</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Scholarship Inquiries Tab -->
      <section v-else-if="activeTab === 'inquiries'" class="pb-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-yellow-500/20">
            <div class="px-6 py-5 border-b border-yellow-500/20 bg-black/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <GraduationCap class="w-5 h-5 text-yellow-500" />
                  <h2 class="text-lg font-semibold text-white">Scholarship Inquiries</h2>
                </div>
                <button @click="exportData('inquiries')" class="bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg">
                  <Download class="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-black/50">
                  <tr class="border-b border-yellow-500/20">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Email</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Scholarship</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="inquiry in inquiries" :key="inquiry.id" class="border-t border-white/5 hover:bg-white/5 transition">
                    <td class="px-6 py-4 text-sm text-gray-400">{{ inquiry.id }}</td>
                    <td class="px-6 py-4 text-sm font-medium text-white">{{ inquiry.full_name }}</td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ inquiry.email }}</td>
                    <td class="px-6 py-4 text-sm max-w-xs truncate text-gray-400">{{ inquiry.scholarship_title }}</td>
                    <td class="px-6 py-4">
                      <select @change="updateInquiryStatus(inquiry.id, $event.target.value)" :value="inquiry.status" class="px-3 py-1 rounded-xl text-xs font-medium border border-yellow-500/30 bg-black/50 backdrop-blur-sm text-white">
                        <option value="pending" class="text-amber-400">Pending</option>
                        <option value="contacted" class="text-yellow-400">Contacted</option>
                        <option value="completed" class="text-purple-400">Completed</option>
                      </select>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ formatDate(inquiry.created_at) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button @click="viewInquiry(inquiry)" class="text-purple-400 hover:text-purple-300 transition">
                          <Eye class="w-4 h-4" />
                        </button>
                        <button @click="deleteInquiry(inquiry.id)" class="text-rose-400 hover:text-rose-300 transition">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="inquiries.length === 0">
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                      <GraduationCap class="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p class="text-sm">No scholarship inquiries yet</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Scholarships Management Tab -->
      <section v-else-if="activeTab === 'scholarships'" class="pb-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-6">
            <button 
              @click="openScholarshipModal()"
              class="bg-yellow-500 text-black px-5 py-2.5 rounded-xl hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg"
            >
              <Plus class="w-4 h-4" />
              Add New Scholarship
            </button>
          </div>
          
          <div class="bg-black/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-purple-500/20">
            <div class="px-6 py-5 border-b border-purple-500/20 bg-black/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <BookOpen class="w-5 h-5 text-purple-400" />
                  <h2 class="text-lg font-semibold text-white">All Scholarships</h2>
                </div>
                <button @click="fetchScholarships" class="bg-yellow-500 text-black px-4 py-2 rounded-xl text-sm hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg">
                  <RefreshCw class="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-black/50">
                  <tr class="border-b border-purple-500/20">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Title</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Country</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Degree</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Featured</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="scholarship in allScholarships" :key="scholarship.id" class="border-t border-white/5 hover:bg-white/5 transition">
                    <td class="px-6 py-4 text-sm text-gray-400">{{ scholarship.id }}</td>
                    <td class="px-6 py-4 text-sm font-medium text-white max-w-xs truncate">{{ scholarship.title }}</td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ scholarship.country }}</td>
                    <td class="px-6 py-4 text-sm text-gray-400">{{ scholarship.degree }}</td>
                    <td class="px-6 py-4">
                      <span :class="scholarship.status === 'active' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-gray-800/50 text-gray-400'" class="px-3 py-1 rounded-xl text-xs font-medium backdrop-blur-sm">
                        {{ scholarship.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <button @click="toggleFeatured(scholarship.id, scholarship.featured)" class="text-yellow-500 hover:text-yellow-400 transition">
                        <Star :class="scholarship.featured ? 'fill-yellow-500' : ''" class="w-4 h-4" />
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button @click="editScholarship(scholarship)" class="text-purple-400 hover:text-purple-300 transition">
                          <Edit class="w-4 h-4" />
                        </button>
                        <button @click="deleteScholarship(scholarship.id)" class="text-rose-400 hover:text-rose-300 transition">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="allScholarships.length === 0">
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                      <BookOpen class="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p class="text-sm">No scholarships yet. Click "Add New Scholarship" to create one.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Scholarship Modal - Solid Colors -->
      <div v-if="scholarshipModalVisible" class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" @click="closeScholarshipModal">
        <div class="bg-black/90 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-yellow-500/30" @click.stop>
          <div class="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-yellow-500/20 px-6 py-4 rounded-t-2xl">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold text-white">{{ editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship' }}</h2>
              <button @click="closeScholarshipModal" class="text-gray-400 hover:text-yellow-400 transition">
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="saveScholarship" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                  <input type="text" v-model="scholarshipForm.title" required class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Country *</label>
                  <input type="text" v-model="scholarshipForm.country" required class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Degree *</label>
                  <select v-model="scholarshipForm.degree" required class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                    <option value="">Select Degree</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                    <option value="Master's & PhD">Master's & PhD</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Deadline</label>
                  <input type="date" v-model="scholarshipForm.deadline" class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                  <input type="url" v-model="scholarshipForm.image_url" placeholder="https://..." class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Application Link</label>
                  <input type="url" v-model="scholarshipForm.link" placeholder="https://..." class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select v-model="scholarshipForm.status" class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="flex items-center pt-6">
                  <label class="flex items-center gap-2">
                    <input type="checkbox" v-model="scholarshipForm.featured" class="w-4 h-4 text-yellow-500 rounded border-yellow-500/30 bg-black/50 focus:ring-yellow-500">
                    <span class="text-sm text-gray-300">Feature this scholarship</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                <textarea v-model="scholarshipForm.description" rows="4" required class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Eligibility</label>
                <textarea v-model="scholarshipForm.eligibility" rows="3" class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Benefits</label>
                <textarea v-model="scholarshipForm.benefits" rows="3" class="w-full px-4 py-2 bg-black/50 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"></textarea>
              </div>
              
              <div class="flex gap-3 pt-4">
                <button type="button" @click="closeScholarshipModal" class="flex-1 px-4 py-2 border border-yellow-500/30 rounded-xl hover:bg-white/5 transition text-gray-300">Cancel</button>
                <button type="submit" :disabled="saving" class="flex-1 bg-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50 font-medium">
                  {{ saving ? 'Saving...' : (editingScholarship ? 'Update' : 'Create') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Message Modal -->
      <div v-if="messageModalVisible" class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" @click="closeMessageModal">
        <div class="bg-black/90 backdrop-blur-xl rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-yellow-500/30" @click.stop>
          <div class="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-yellow-500/20 px-6 py-4 rounded-t-2xl">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold text-white">Message Details</h2>
              <button @click="closeMessageModal" class="text-gray-400 hover:text-yellow-400 transition">
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="p-6 space-y-3">
            <p><strong class="text-gray-400">Name:</strong> <span class="text-white">{{ selectedMessage?.full_name }}</span></p>
            <p><strong class="text-gray-400">Email:</strong> <span class="text-white">{{ selectedMessage?.email }}</span></p>
            <p><strong class="text-gray-400">Phone:</strong> <span class="text-white">{{ selectedMessage?.phone || 'N/A' }}</span></p>
            <p><strong class="text-gray-400">Subject:</strong> <span class="text-white">{{ selectedMessage?.subject || selectedMessage?.scholarship_title }}</span></p>
            <p><strong class="text-gray-400">Message:</strong></p>
            <p class="bg-white/5 p-4 rounded-xl text-gray-300">{{ selectedMessage?.message }}</p>
            <p><strong class="text-gray-400">Date:</strong> <span class="text-gray-400">{{ formatDate(selectedMessage?.created_at, true) }}</span></p>
          </div>
          <div class="sticky bottom-0 bg-black/90 backdrop-blur-xl border-t border-yellow-500/20 px-6 py-4 flex gap-3 rounded-b-2xl">
            <button @click="closeMessageModal" class="flex-1 px-4 py-2 border border-yellow-500/30 rounded-xl hover:bg-white/5 transition text-gray-300">Close</button>
            <a :href="`mailto:${selectedMessage?.email}`" class="flex-1 bg-yellow-500 text-black px-4 py-2 rounded-xl text-center hover:bg-yellow-400 transition font-medium">Reply</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { 
  Users, MessageSquare, GraduationCap, BookOpen, Star, 
  Download, Trash2, Eye, X, Plus, Edit, RefreshCw, Bell, Menu
} from 'lucide-vue-next'

// Header Related State
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const showNotifications = ref(false)

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: 'New Scholarship Available',
    message: 'Fulbright Scholarship 2025 applications are now open!',
    time: '2 hours ago',
    read: false,
    type: 'news'
  },
  {
    id: 2,
    title: 'Application Deadline Approaching',
    message: 'Chevening Scholarship deadline is in 7 days',
    time: '1 day ago',
    read: false,
    type: 'deadline'
  },
  {
    id: 3,
    title: 'New Partnership Announcement',
    message: 'We have partnered with 10 new universities in Europe',
    time: '3 days ago',
    read: true,
    type: 'news'
  }
])

// Header methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) showNotifications.value = false
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) mobileMenuOpen.value = false
}

const closeNotifications = () => {
  showNotifications.value = false
}

const markAsRead = (notification) => {
  if (!notification.read) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

// Handle scroll event for header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Dashboard State
const activeTab = ref('subscribers')
const loading = ref(false)
const subscribers = ref([])
const contacts = ref([])
const inquiries = ref([])
const allScholarships = ref([])
const messageModalVisible = ref(false)
const selectedMessage = ref(null)
const scholarshipModalVisible = ref(false)
const editingScholarship = ref(null)
const saving = ref(false)

// Stats
const stats = ref({
  totalSubscribers: 0,
  totalContacts: 0,
  totalInquiries: 0,
  pendingInquiries: 0,
  completedInquiries: 0
})

// Scholarship form
const scholarshipForm = ref({
  title: '',
  country: '',
  degree: '',
  description: '',
  eligibility: '',
  benefits: '',
  deadline: '',
  link: '',
  image_url: '',
  status: 'active',
  featured: false
})

// Computed
const featuredCount = computed(() => allScholarships.value.filter(s => s.featured).length)

const tabs = computed(() => [
  { id: 'subscribers', name: 'Subscribers', icon: Users, count: subscribers.value.length },
  { id: 'contacts', name: 'Contacts', icon: MessageSquare, count: contacts.value.length },
  { id: 'inquiries', name: 'Inquiries', icon: GraduationCap, count: inquiries.value.length },
  { id: 'scholarships', name: 'Scholarships', icon: BookOpen, count: allScholarships.value.length }
])

const API_URL = 'http://localhost:3000/api'

// Fetch functions
const fetchSubscribers = async () => {
  try {
    const res = await axios.get(`${API_URL}/subscribers`)
    subscribers.value = res.data
    stats.value.totalSubscribers = res.data.length
  } catch (error) {
    console.error('Error fetching subscribers:', error)
  }
}

const fetchContacts = async () => {
  try {
    const res = await axios.get(`${API_URL}/contacts`)
    contacts.value = res.data
    stats.value.totalContacts = res.data.length
  } catch (error) {
    console.error('Error fetching contacts:', error)
  }
}

const fetchInquiries = async () => {
  try {
    const res = await axios.get(`${API_URL}/scholarship/inquiries`)
    inquiries.value = res.data
    stats.value.totalInquiries = res.data.length
    stats.value.pendingInquiries = res.data.filter(i => i.status === 'pending').length
    stats.value.completedInquiries = res.data.filter(i => i.status === 'completed').length
  } catch (error) {
    console.error('Error fetching inquiries:', error)
  }
}

const fetchScholarships = async () => {
  try {
    const res = await axios.get(`${API_URL}/scholarships`)
    allScholarships.value = res.data || []
  } catch (error) {
    console.error('Error fetching scholarships:', error)
    allScholarships.value = []
  }
}

// Delete functions
const deleteSubscriber = async (id) => {
  if (confirm('Delete this subscriber?')) {
    try {
      await axios.delete(`${API_URL}/subscriber/${id}`)
      await fetchSubscribers()
      alert('Subscriber deleted')
    } catch (error) {
      alert('Error deleting')
    }
  }
}

const deleteContact = async (id) => {
  if (confirm('Delete this message?')) {
    try {
      await axios.delete(`${API_URL}/contact/${id}`)
      await fetchContacts()
      alert('Message deleted')
    } catch (error) {
      alert('Error deleting')
    }
  }
}

const deleteInquiry = async (id) => {
  if (confirm('Delete this inquiry?')) {
    try {
      await axios.delete(`${API_URL}/scholarship/inquiry/${id}`)
      await fetchInquiries()
      alert('Inquiry deleted')
    } catch (error) {
      alert('Error deleting')
    }
  }
}

const deleteScholarship = async (id) => {
  if (confirm('Delete this scholarship?')) {
    try {
      await axios.delete(`${API_URL}/admin/scholarships/${id}`)
      await fetchScholarships()
      alert('Scholarship deleted')
    } catch (error) {
      alert('Error deleting scholarship')
    }
  }
}

// Update functions
const updateInquiryStatus = async (id, status) => {
  try {
    await axios.put(`${API_URL}/scholarship/inquiry/${id}/status`, { status })
    await fetchInquiries()
    alert(`Status updated to ${status}`)
  } catch (error) {
    alert('Error updating status')
  }
}

const toggleFeatured = async (id, currentFeatured) => {
  const scholarship = allScholarships.value.find(s => s.id === id)
  if (scholarship) {
    scholarship.featured = !currentFeatured
    try {
      await axios.put(`${API_URL}/admin/scholarships/${id}`, scholarship)
      await fetchScholarships()
    } catch (error) {
      alert('Error updating featured status')
    }
  }
}

// Scholarship modal functions
const openScholarshipModal = () => {
  editingScholarship.value = null
  scholarshipForm.value = {
    title: '', country: '', degree: '', description: '',
    eligibility: '', benefits: '', deadline: '', link: '', image_url: '',
    status: 'active', featured: false
  }
  scholarshipModalVisible.value = true
}

const editScholarship = (scholarship) => {
  editingScholarship.value = scholarship
  scholarshipForm.value = { ...scholarship }
  scholarshipModalVisible.value = true
}

const closeScholarshipModal = () => {
  scholarshipModalVisible.value = false
  editingScholarship.value = null
}

const saveScholarship = async () => {
  saving.value = true
  try {
    if (editingScholarship.value) {
      await axios.put(`${API_URL}/admin/scholarships/${editingScholarship.value.id}`, scholarshipForm.value)
      alert('Scholarship updated')
    } else {
      await axios.post(`${API_URL}/admin/scholarships`, scholarshipForm.value)
      alert('Scholarship created')
    }
    await fetchScholarships()
    closeScholarshipModal()
  } catch (error) {
    alert('Error saving scholarship')
  } finally {
    saving.value = false
  }
}

// View functions
const viewMessage = (msg) => {
  selectedMessage.value = msg
  messageModalVisible.value = true
}

const viewInquiry = (inq) => {
  selectedMessage.value = inq
  messageModalVisible.value = true
}

const closeMessageModal = () => {
  messageModalVisible.value = false
  selectedMessage.value = null
}

// Export data
const exportData = (type) => {
  let data = []
  let filename = ''
  let csv = ''
  
  if (type === 'subscribers') {
    data = subscribers.value
    filename = `subscribers_${Date.now()}.csv`
    csv = 'ID,Email,Date\n' + data.map(s => `${s.id},${s.email},${s.subscribed_at}`).join('\n')
  } else if (type === 'contacts') {
    data = contacts.value
    filename = `contacts_${Date.now()}.csv`
    csv = 'ID,Name,Email,Phone,Subject,Message,Date\n' + data.map(c => `${c.id},${c.full_name},${c.email},${c.phone || ''},${c.subject},"${(c.message || '').replace(/"/g, '""')}",${c.created_at}`).join('\n')
  } else {
    data = inquiries.value
    filename = `inquiries_${Date.now()}.csv`
    csv = 'ID,Name,Email,Scholarship,Message,Status,Date\n' + data.map(i => `${i.id},${i.full_name},${i.email},${i.scholarship_title},"${(i.message || '').replace(/"/g, '""')}",${i.status},${i.created_at}`).join('\n')
  }
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
  alert(`Exported ${data.length} records`)
}

// Format date
const formatDate = (date, includeTime = false) => {
  if (!date) return '-'
  const d = new Date(date)
  return includeTime ? d.toLocaleString() : d.toLocaleDateString()
}

// Load all data
const loadAllData = async () => {
  loading.value = true
  await Promise.all([
    fetchSubscribers(),
    fetchContacts(),
    fetchInquiries(),
    fetchScholarships()
  ])
  loading.value = false
}

// Click outside handler for dropdowns
const handleClickOutside = (event) => {
  const notificationsButton = document.querySelector('.relative.ml-2 button')
  const notificationsDropdown = document.querySelector('.relative.ml-2 > div')
  if (showNotifications.value && notificationsButton && notificationsDropdown) {
    if (!notificationsButton.contains(event.target) && !notificationsDropdown.contains(event.target)) {
      showNotifications.value = false
    }
  }
}

onMounted(() => {
  loadAllData()
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Import modern font */
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Modern gradient background for the entire dashboard - Black & Purple/Yellow theme */
.dashboard-container {
  background: #000000;
  min-height: 100vh;
  position: relative;
}

/* Glass morphism refined for dark theme */
header,
.bg-black\/40,
.bg-black\/90,
.bg-black\/50,
.bg-black\/30 {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Header specific - dark glass */
header {
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(234, 179, 8, 0.15);
}

header .nav-link {
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
  position: relative;
}

header .nav-link:hover {
  color: #fbbf24;
}

header .nav-link.active {
  color: #fbbf24;
}

header .nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: #fbbf24;
  border-radius: 2px;
}

/* Stats Cards */
.bg-black\/40 {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(234, 179, 8, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.bg-yellow-500\/10 {
  background: rgba(234, 179, 8, 0.1);
}
.bg-yellow-500\/10:hover {
  background: rgba(234, 179, 8, 0.2);
}

.bg-purple-500\/10 {
  background: rgba(168, 85, 247, 0.1);
}
.bg-purple-500\/10:hover {
  background: rgba(168, 85, 247, 0.2);
}

/* Text & Icon Colors */
.text-gray-700, .text-gray-600, .text-gray-500 {
  color: #e5e7eb;
}

.text-gray-500 {
  color: #9ca3af;
}

.text-gray-400 {
  color: #6b7280;
}

.text-yellow-500, .text-yellow-400 {
  color: #fbbf24;
}

.text-purple-400 {
  color: #a855f7;
}

/* Tables styling */
table {
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  background: rgba(0, 0, 0, 0.5);
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.7rem;
  border-bottom: 1px solid rgba(234, 179, 8, 0.15);
}

tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

td {
  color: #d1d5db;
  font-size: 0.875rem;
}

/* Buttons - Solid Colors */
button, .bg-yellow-500 {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-yellow-500 {
  background: #fbbf24;
}

.bg-yellow-500:hover {
  background: #f59e0b;
  transform: translateY(-1px);
  box-shadow: 0 10px 20px -5px rgba(251, 191, 36, 0.3);
}

/* Tab Navigation - Solid Colors */
button[class*="px-6 py-3"] {
  border-radius: 1rem 1rem 0 0;
  font-weight: 600;
  letter-spacing: -0.01em;
  backdrop-filter: blur(8px);
}

.bg-yellow-500 {
  background: #fbbf24;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

/* Form inputs in dark theme */
input, select, textarea {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(234, 179, 8, 0.2);
  color: #f1f5f9;
  transition: all 0.2s;
}
input:focus, select:focus, textarea:focus {
  border-color: #fbbf24;
  outline: none;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2);
  background: rgba(0, 0, 0, 0.8);
}
input::placeholder, textarea::placeholder {
  color: #475569;
}

/* Checkbox styling */
input[type="checkbox"] {
  accent-color: #fbbf24;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0.25rem;
}

/* Notification dropdown */
.bg-black\/90 {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(234, 179, 8, 0.2);
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.5);
}
.hover\:bg-white\/5:hover {
  background: rgba(255, 255, 255, 0.05);
}
.bg-yellow-500\/5 {
  background: rgba(234, 179, 8, 0.05);
}

/* Mobile menu */
.md\:hidden.mt-4 {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(234, 179, 8, 0.15);
}

.mobile-nav-link {
  color: #9ca3af;
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin: 0 0.5rem;
  transition: all 0.2s;
}
.mobile-nav-link.active {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}
.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e5e7eb;
}

/* Modal styling */
.fixed.inset-0.bg-black\/70 {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
}
.bg-black\/90 {
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(234, 179, 8, 0.25);
  box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.8);
}
.bg-black\/90 .text-gray-700 {
  color: #f1f5f9;
}
.bg-black\/90 .border-gray-100 {
  border-color: rgba(255, 255, 255, 0.08);
}
.bg-white\/5 {
  background: rgba(255, 255, 255, 0.05);
}

/* Status badges */
.bg-yellow-500\/10.text-yellow-400 {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}
.bg-gray-800\/50.text-gray-400 {
  background: rgba(31, 41, 55, 0.5);
  color: #9ca3af;
}
option.text-amber-400 {
  color: #fbbf24;
}
option.text-yellow-400 {
  color: #fcd34d;
}
option.text-purple-400 {
  color: #a855f7;
}

/* Loading spinner */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(251, 191, 36, 0.2);
  border-top: 3px solid #fbbf24;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fill-yellow-500 { 
  fill: #fbbf24; 
}

/* Scrollbar styling for webkit */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(251, 191, 36, 0.4);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 191, 36, 0.7);
}

/* Smooth hover transitions for cards */
.group:hover .bg-yellow-500\/10,
.group:hover .bg-purple-500\/10 {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

/* Container responsive widths */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }

/* Additional glow effects for buttons with icons */
button:active {
  transform: translateY(1px);
}

/* Table action icons hover effect */
.text-purple-400:hover, .text-rose-400:hover {
  filter: brightness(1.2);
  transform: scale(1.1);
  transition: all 0.1s ease;
}

/* Star fill color */
.fill-yellow-500 {
  fill: #fbbf24;
}
</style>