<script setup lang="ts">
useHead({
  script: [
    {
      type: "text/javascript",
      innerHTML() {
        return `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/68e5a4630b10cd194e33e7ff/1j70gk9fm';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })()`;
      },
      tagPosition: "bodyOpen"
    }
  ]
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtApp>
      <NuxtConfirmDialog />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NuxtApp>
  </div>
</template>
