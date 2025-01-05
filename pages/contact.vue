<script lang="ts" setup>
import { Send } from "lucide-vue-next";
</script>

<template>
  <section
    class="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-4 sm:px-6 lg:px-8"
  >
    <div class="lg:text-center">
      <h1 class="text-5xl font-bold lg:text-7xl">Contact us</h1>
      <p class="my-8">
        Got any suggestion or need help? Send us a friendly message for free 🎉
      </p>
    </div>
    <div class="mt-16 flex justify-around gap-4">
      <ContactForm />
      <div class="hidden lg:flex">
        <div>
          <div>
            <h2 class="text-lg font-bold">Chat with us</h2>
            <p class="mt-4">Speak to me via a live chat.</p>
          </div>
          <div class="mt-4 grid gap-2">
            <NuxtLink
              class="flex items-center gap-2 font-bold underline"
              to="mailto:contact.lovanirina@gmail.com"
            >
              <Send class="h-4 w-4" />
              Shoot us an email
            </NuxtLink>
            <a
              class="flex items-center gap-2 font-bold underline"
              href="https://x.com/lovanirina_r"
            >
              <Icon class="h-4 w-4" name="simple-icons:x" />
              Message us on X
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
