<template>
  <div class="bg-black text-white py-12 px-4 sm:px-6 lg:px-12">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-[1fr]"
    >
      <button
        v-for="city in cities"
        :key="city"
        @click="toggleCity(city)"
        class="w-full bg-zinc-900 hover:bg-zinc-800 rounded-2xl border border-zinc-700 transition-all duration-300 p-6 flex flex-col items-center text-center shadow-md hover:shadow-[0_0_10px_#ef4444] focus:outline-none cursor-pointer overflow-hidden"
      >
        <div
          class="uppercase font-bold tracking-wider mb-3 text-lg text-white flex items-center gap-2 justify-center"
        >
          <span>{{ city }}</span>
          <i
            class="pi transition-transform duration-300"
            :class="activeCity === city ? 'pi-chevron-up rotate-180' : 'pi-chevron-down'"
          ></i>
        </div>

        <transition name="slide">
          <div
            v-if="activeCity === city"
            class="w-full bg-zinc-800/50 rounded-xl px-4 py-3 mt-2 space-y-3"
          >
            <div
              v-for="(branch, i) in branches[city] || []"
              :key="i"
              class="border-b border-zinc-700 pb-2 last:border-none"
            >
              <p class="text-red-400 font-semibold">{{ branch.address }}</p>
              <p
                v-for="tel in branch.phones"
                :key="tel"
                class="text-zinc-400 text-sm"
              >
                {{ tel }}
              </p>
            </div>
          </div>
        </transition>
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

const cities = [
  "Алматы",
  "Астана",
  "Караганда",
  "Актау",
  "Атырау",
  "Актобе",
  "Кокшетау",
  "Туркестан",
  "Кызылорда",
  "Конаев",
  "Кордай",
  "Талгар",
  "Темиртау",
];

const activeCity = ref("");

const branches = {
  Алматы: [
    { address: "Тажибаева 155", phones: ["+7 705 626 6969", "+7 747 722 0786"] },
    { address: "Жандосова 87", phones: ["+7 705 626 6969"] },
  ],
  Астана: [{ address: "пр. Туран 45", phones: ["+7 705 222 1234"] }],
  Караганда: [{ address: "ул. Абая 13", phones: ["+7 777 333 1212"] }],
};

const toggleCity = (city) => {
  activeCity.value = activeCity.value === city ? "" : city;
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.35s ease, opacity 0.35s ease;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
