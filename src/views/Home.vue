<template>
  <div class="home container mx-auto p-1 sm:p-4 lg:p-10">
    <header>
      <h1 class="xl:text-3xl mb-10 text-center">Weather Application
        <small class="text-sm font-light text-grey-dark tracking-wide inline-block">
          widgets {{$store.state.stations.length}}/10
        </small>
      </h1>
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
