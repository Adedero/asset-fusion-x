<script setup lang="ts">
useHead({
  script: [
    {
      type: 'text/javascript',
      innerHTML() {
          return `var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function(){
          var s1 = document.createElement("script"),
              s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/686f79f8ca9b1d190e69dbe5/1ivpn8t56';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();`
      },
      tagPosition: "bodyOpen"
    }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NuxtApp>
  </div>
</template>
