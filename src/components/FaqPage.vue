<template>
       <!-- FAQ Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
          <p class="text-gray-500">Quick answers to common questions</p>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span class="font-semibold text-gray-800">{{ faq.question }}</span>
              <i :class="openFaqIndex === index ? 'fas fa-chevron-up text-purple-600' : 'fas fa-chevron-down text-gray-400'"></i>
            </button>
            <div 
              v-if="openFaqIndex === index"
              class="px-6 pb-4 text-gray-600 border-t border-gray-100"
            >
              <p class="pt-3">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<script setup>
  const faqs = ref([
  {
    question: 'How long does it take to get a response?',
    answer: 'We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly.'
  },
  {
    question: 'Do you offer free consultation?',
    answer: 'Yes, we offer a free 30-minute initial consultation to understand your needs and explain how we can help you achieve your study abroad goals.'
  },
  {
    question: 'What countries do you help with?',
    answer: 'We assist students with applications to universities in the USA, UK, Canada, Australia, China, Hungary, Saudi Arabia, Germany, France, and many other destinations.'
  },
  {
    question: 'Can you help with scholarship applications?',
    answer: 'Absolutely! Scholarship application assistance is one of our core services. We help identify suitable scholarships and guide you through the entire application process.'
  },
  {
    question: 'Is there a fee for your services?',
    answer: 'We offer both free resources and premium consultation packages. Our initial consultation is free, and we provide transparent pricing for all our services.'
  }
])

</script>