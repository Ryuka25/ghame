<template>
  <header class="sticky top-0 z-50 -mb-px bg-background/75 backdrop-blur">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"
    >
      <NuxtLink to="/">
        <AppName />
      </NuxtLink>
      <AppNavbar />
      <AppActions />
    </div>
  </header>
</template>
