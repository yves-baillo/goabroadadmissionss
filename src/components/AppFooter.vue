<template>
  <footer class="bg-black text-white relative">
    <!-- Main Footer - Balanced Height -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info with Logo -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
          class="space-y-3"
        >
          <img 
            src="https://i.postimg.cc/Pr3dWcht/img5-removebg-preview.png" 
            alt="GoAbroad Admissions Logo" 
            class="w-45 h-20 object-contain brightness-110"
          />
          <p class="text-xs leading-relaxed text-gray-400 max-w-xs">
            Your trusted partner in transforming international education dreams into reality. 
            We bridge the gap between students and global education opportunities.
          </p>
          
          <!-- Social Media Section -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }"
            class="pt-2"
          >
            <div class="flex justify-left gap-2 flex-wrap">
              <a
                v-for="(social, index) in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                v-motion
                :initial="{ scale: 0, rotate: -180 }"
                :visible="{ 
                  scale: 1, 
                  rotate: 0, 
                  transition: { 
                    delay: 300 + (index * 50), 
                    duration: 400,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  } 
                }"
                :while-hover="{ 
                  scale: 1.15, 
                  y: -3,
                  transition: { duration: 200 }
                }"
                :while-tap="{ scale: 0.95 }"
                class="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200"
                :class="social.bgColor"
              >
                <i :class="social.icon + ' text-sm'"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 150, duration: 500 } }"
        >
          <h3 class="text-base font-semibold mb-3 text-[#F9A825]">
            <i class="fas fa-link mr-2 text-sm"></i>
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <router-link 
                :to="link.to" 
                class="flex items-center gap-2 text-sm text-gray-400 hover:text-[#F9A825] transition-colors group"
              >
                <i class="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }"
        >
          <h3 class="text-base font-semibold mb-3 text-[#F9A825]">
            <i class="fas fa-book-open mr-2 text-sm"></i>
            Resources
          </h3>
          <ul class="space-y-2">
            <li v-for="resource in resources" :key="resource.name">
              <a 
                :href="resource.link" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm text-gray-400 hover:text-[#F9A825] transition-colors group"
              >
                <i class="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                {{ resource.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter with Modern Subscribe Button -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 250, duration: 500 } }"
        >
          <h3 class="text-base font-semibold mb-3 text-[#F9A825]">
            <i class="fas fa-envelope mr-2 text-sm"></i>
            Stay Updated
          </h3>
          <p class="text-sm text-gray-400 mb-4">
            Get latest scholarships & opportunities delivered to your inbox.
          </p>
          
          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <!-- Modern Email Input -->
            <div class="relative group">
              <input 
                v-model="email"
                type="email" 
                placeholder="Enter your email address"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-[#F9A825] transition-all duration-300 text-white placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm group-hover:border-gray-700"
              />
             
            </div>

            <!-- Modern Subscribe Button -->
            <button 
              type="submit"
              v-motion
              :while-hover="{ scale: 1.02, y: -1 }"
              :while-tap="{ scale: 0.98 }"
              :disabled="isSubmitting"
              class="subscribe-button relative w-full group overflow-hidden rounded-lg bg-gradient-to-r from-[#F9A825] to-[#F57F17] px-5 py-2.5 font-semibold text-black shadow-md transition-all duration-300 hover:shadow-[#F9A825]/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <!-- Animated Background -->
              <span class="absolute inset-0 bg-gradient-to-r from-[#FBC02D] to-[#F57F17] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              <!-- Ripple Effect -->
              <span class="absolute inset-0 w-full h-full">
                <span class="absolute inset-0 bg-white/30 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></span>
              </span>
              
              <!-- Button Content -->
              <span class="relative flex items-center justify-center gap-2">
                <!-- Loading Spinner -->
                <svg v-if="isSubmitting" class="w-4 h-4 animate-spin text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                
                <!-- Send Icon -->
                <svg v-else class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                
                <span class="font-semibold">{{ isSubmitting ? 'Subscribing...' : 'Subscribe Now' }}</span>
                
                <!-- Glow Effect -->
                <span class="absolute -right-8 -top-8 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></span>
              </span>
            </button>
          </form>
          
          <!-- Benefits Badges -->
          <div class="mt-4 space-y-1.5">
            <div class="flex items-center gap-2">
              <i class="fas fa-check-circle text-[#F9A825] text-xs"></i>
              <span class="text-xs text-gray-500">Weekly scholarship alerts</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-check-circle text-[#F9A825] text-xs"></i>
              <span class="text-xs text-gray-500">Application tips & guides</span>
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="mt-3 text-xs text-red-400 flex items-center gap-1 bg-red-500/10 p-2 rounded-lg">
            <i class="fas fa-exclamation-circle text-xs"></i>
            <span>{{ errorMessage }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1, transition: { delay: 300, duration: 500 } }"
      class="border-t border-gray-900 relative z-10"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p class="text-gray-600">
            &copy; {{ currentYear }} GoAbroad Admissions. All rights reserved.
          </p>
          <div class="flex gap-4">
            <a href="" class="text-gray-600 hover:text-[#F9A825] transition-colors">Privacy Policy</a>
            <a href="" class="text-gray-600 hover:text-[#F9A825] transition-colors">Terms of Service</a>
                  <router-link
            to="/dashboard"
          >
             <span>Admin Panel</span>
            <i class="fas fa-arrow-right text-[10px]"></i>
          </router-link>
    </div>

          </div>
        </div>
      </div>
    
     <!-- Success Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast"
        v-motion
        :initial="{ opacity: 0, x: 50, scale: 0.8 }"
        :visible="{ opacity: 1, x: 0, scale: 1 }"
        class="fixed bottom-4 right-4 px-5 py-2.5 rounded-lg shadow-xl flex items-center gap-2 z-50 bg-gradient-to-r from-[#F9A825] to-[#F57F17] text-black text-sm"
      >
        <i class="fas fa-check-circle"></i>
        <span>{{ toastMessage }}</span>
        <button @click="showToast = false" class="ml-2 hover:opacity-70">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>
    </Transition>
    
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const currentYear = new Date().getFullYear()
const email = ref('')
const isSubmitting = ref(false)
const showToast = ref(false)
const toastMessage = ref('Successfully subscribed! Check your inbox.')
const errorMessage = ref('')

const quickLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Scholarships', to: '/scholarships' },
  { name: 'News & Updates', to: '/news' },
  { name: 'Contact Us', to: '/contact' }
]

const resources = [
  { name: 'Study Abroad Guide' },
  { name: 'Scholarship Tips'  },
  { name: 'Visa Assistance' },
  { name: 'University Rankings' },
  { name: 'FAQs', link: '/faq' }
]

const socialLinks = [
  { 
    name: 'YouTube', 
    url: 'https://youtube.com/@xmaopportunitiesportal?si=d1hFYNlUMgBmqc-J', 
    icon: 'fab fa-youtube', 
    bgColor: 'bg-red-600 hover:bg-red-700'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/goabroad-admissions-361873399/ ', 
    icon: 'fab fa-linkedin-in', 
    bgColor: 'bg-blue-700 hover:bg-blue-800'
  },
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/share/1JYd3mLj5X/?mibextid=wwXIfr', 
    icon: 'fab fa-facebook-f', 
    bgColor: 'bg-blue-600 hover:bg-blue-700'
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/goabroad_admissions?igsh=MXBtejh5c2Z1c3Uwdw%3D%3D&utm_source=qr ', 
    icon: 'fab fa-instagram', 
    bgColor: 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600'
  },
  { 
    name: 'Twitter', 
    url: 'https://x.com/GoAbroad_Go ', 
    icon: 'fab fa-twitter', 
    bgColor: 'bg-gray-800 hover:bg-gray-700'
  },
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com/@xmaopportunitiesportal?_r=1&_t=ZP-928v4nvs5z5 ', 
    icon: 'fab fa-tiktok', 
    bgColor: 'bg-gray-800 hover:bg-gray-700'
  }
]

const handleSubscribe = async () => {
  errorMessage.value = ''
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address'
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await axios.post('backendgo-production-18ba.up.railway.app', {
      email: email.value
    })
    
    if (response.data.success) {
      toastMessage.value = response.data.message || 'Successfully subscribed! Check your inbox.'
      showToast.value = true
      email.value = ''
      
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    } else {
      errorMessage.value = response.data.message || 'Subscription failed. Please try again.'
    }
  } catch (error) {
    console.error('Subscription error:', error)
    errorMessage.value = 'Connection error. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Pure Black Background */
footer {
  background-color: #000000;
  position: relative;
}

/* Subscribe Button Styles */
.subscribe-button {
  box-shadow: 0 2px 10px rgba(249, 168, 37, 0.25);
  position: relative;
  overflow: hidden;
}

.subscribe-button:hover {
  box-shadow: 0 6px 20px rgba(249, 168, 37, 0.35);
  transform: translateY(-1px);
}

.subscribe-button:active {
  transform: translateY(0px);
}

/* Input focus styles */
input:focus {
  box-shadow: 0 0 0 2px rgba(249, 168, 37, 0.1);
}

/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.8);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

button {
  cursor: pointer;
}

a, button {
  transition: all 0.2s ease;
}

/* Spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

</style>