<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area (Slot) -->
    <main class="flex-1 basis-0">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
