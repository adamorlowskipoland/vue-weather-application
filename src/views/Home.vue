<template>
  <div class="home p-10">
    <header class="container mx-auto">
      <h1 class="xl:text-3xl mb-10 text-center">Weather Application</h1>
      <search-card v-model="query" :loading="loading"></search-card>
      <!--<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex items-end">-->
        <!--<base-input-->
          <!--v-model="query"-->
          <!--label="Search for a city"-->
          <!--placeholder="Enter zipcode for Switzerland"-->
          <!--:disabled="loading"-->
          <!--class="block text-grey-darker font-bold"-->
          <!--:debounceTime="700"-->
        <!--/>-->
        <!--<base-button class="ml-4">Add station</base-button>-->
      <!--</form>-->
    </header>
    <main class="container mx-auto my-10">
      widgets
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchCard from '@/components/SearchCard.vue';

export default {
  name: 'home',
  components: {
    SearchCard,
  },
  data() {
    return {
      query: '',
      loading: false,
    };
  },
};
</script>
