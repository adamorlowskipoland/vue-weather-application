<template>
  <div class="home container mx-auto p-10">
    <header class="">
      <h1 class="xl:text-3xl mb-10 text-center">Weather Application</h1>
      <search-card />
    </header>
    <main class="container mx-auto my-10">
      <widgets-panel />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchCard from '@/components/SearchCard.vue';
import WidgetsPanel from '@/components/WidgetsPanel.vue';

export default {
  name: 'home',
  components: {
    SearchCard,
    WidgetsPanel,
  },
};
</script>
