<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { appName } = useRuntimeConfig().public;
</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <section
      class="relative w-full h-[550px] overflow-hidden rounded-lg mb-24 flex items-center justify-center text-center"
    >
      <NuxtImg  
        placeholder
        src="https://media.gettyimages.com/id/1388431588/video/below-shot-of-people-stacking-hands-during-group-therapy.jpg?s=640x640&k=20&c=zTtk7BfB88cj8HgpYOrxDrhvmpaowNOTw-xhEJhEfc0="
        alt="Diverse hands stacked together, symbolizing collaboration and community"
        class="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"
      />
      <div class="relative z-10 p-8">
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-200 leading-tight mb-6 animate-fade-in-up"
        >Beyond Returns: {{appName}}'s Commitment to Social Responsibility</h1>
        <p
          class="text-base sm:text-lg text-slate-300 max-w-4xl mx-auto mb-8 animate-fade-in-up delay-200"
        >At
          {{appName}}, we believe true prosperity extends beyond financial
          gains. Our commitment to social responsibility means actively
          contributing to the well-being of our communities, fostering an
          inclusive environment, and operating with the highest ethical
          standards in every action we take.</p>
        <div
          class="mt-8 inline-block bg-slate-800/70 p-4 rounded-lg shadow-xl border border-white/30 backdrop-blur-sm animate-fade-in-up delay-400"
        >
          <p class="text-base text-slate-200">Building wealth responsibly,
            building a better future together.</p>
        </div>
      </div>
    </section>

    <section
      class="mb-24 py-16 px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <div>
        <h2
          class="text-4xl font-bold text-tertiary-500 mb-8 leading-tight"
        >Investing in People: Our Holistic Approach to Impact</h2>
        <p class="text-base text-slate-300 leading-relaxed mb-6">Social
          responsibility is not merely a policy for us; it's an integral part of
          our identity and operations at
          {{appName}}. We recognize our role as a corporate citizen and are
          dedicated to leveraging our resources and influence to create positive
          societal impact. This means fostering financial inclusion, supporting
          community development, upholding strong ethical governance, and
          cultivating a diverse and empowering workplace.</p>
        <p class="text-base text-slate-300 leading-relaxed mb-6">Our commitment
          stems from the belief that a thriving society is fundamental to
          sustainable economic growth. By actively investing in the welfare of
          people and communities, we contribute to a more stable, equitable, and
          prosperous future for everyone. This holistic approach ensures that as
          our users build their passive income, they are also part of a
          larger movement towards positive social change.</p>
        <ul class="list-disc list-inside text-slate-300 text-base space-y-2">
          <li><span class="text-primary-500 font-semibold">Community
              Empowerment:</span>
            Investing in the well-being and development of local communities.</li>
          <li><span class="text-primary-500 font-semibold">Ethical Governance:</span>
            Upholding transparency and integrity in all business dealings.</li>
          <li><span class="text-primary-500 font-semibold">Inclusive Growth:</span>
            Promoting financial access and opportunity for all.</li>
          <li><span class="text-primary-500 font-semibold">Employee Well-being:</span>
            Fostering a supportive, diverse, and equitable workplace culture.</li>
        </ul>
      </div>
      <div
        class="relative w-full h-96 rounded-lg overflow-hidden shadow-xl border border-primary-500"
      >
        <NuxtImg
          placeholder
          src="https://blog.wei.com/hubfs/network.jpg"
          alt="Abstract visual of interconnected people in a network, symbolizing community and collaboration"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-tl from-slate-900/70 via-transparent to-transparent"
        />
      </div>
    </section>

    <section
      class="mb-24 py-16 px-8 bg-slate-800 rounded-lg shadow-inner border border-white/30"
    >
      <h2 class="text-4xl font-bold text-primary-500 mb-16 text-center">Our Core
        Pillars of Social Impact</h2>
      <p
        class="text-base text-slate-300 mb-12 text-center max-w-4xl mx-auto"
      >Our social responsibility initiatives are structured around key areas
        where we believe we can make the most meaningful and lasting difference.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          class="p-8 bg-slate-900 rounded-lg shadow-xl border border-tertiary-500 transition-transform duration-300 hover:scale-105"
        >
          <div class="text-5xl text-primary-500 mb-6 flex justify-center">
            <NuxtIcon name="lucide-banknote" />
          </div>
          <h3
            class="text-2xl font-semibold text-slate-200 mb-4 text-center"
          >Financial Inclusion & Literacy</h3>
          <p class="text-base text-slate-400 text-center">We are committed to
            democratizing access to smart investing and financial knowledge.
            Through accessible platform design, educational resources, webinars,
            and community outreach programs, we empower individuals from diverse
            backgrounds to understand and participate in the financial markets,
            driving their journey towards passive income and financial
            independence.</p>
        </div>
        <div
          class="p-8 bg-slate-900 rounded-lg shadow-xl border border-tertiary-500 transition-transform duration-300 hover:scale-105"
        >
          <div class="text-5xl text-primary-500 mb-6 flex justify-center">
            <NuxtIcon name="lucide-users" />
          </div>
          <h3
            class="text-2xl font-semibold text-slate-200 mb-4 text-center"
          >Community Engagement & Investment</h3>
          <p class="text-base text-slate-400 text-center">We believe in active
            participation in the communities where we operate. This includes
            supporting local initiatives, partnering with non-profits focused on
            education, entrepreneurship, and economic empowerment, and
            encouraging our employees to engage in volunteer activities that
            address critical social needs.</p>
        </div>
        <div
          class="p-8 bg-slate-900 rounded-lg shadow-xl border border-tertiary-500 transition-transform duration-300 hover:scale-105"
        >
          <div class="text-5xl text-primary-500 mb-6 flex justify-center">
            <NuxtIcon name="lucide-check-circle-2" />
          </div>
          <h3
            class="text-2xl font-semibold text-slate-200 mb-4 text-center"
          >Ethical Governance & Transparency</h3>
          <p class="text-base text-slate-400 text-center">Integrity,
            transparency, and accountability form the bedrock of our operations.
            We maintain rigorous ethical standards in all our dealings, ensure
            robust data privacy and security measures, and comply with all
            regulatory frameworks. Our commitment to good governance builds
            trust with our users and partners alike.</p>
        </div>
        <div
          class="p-8 bg-slate-900 rounded-lg shadow-xl border border-tertiary-500 transition-transform duration-300 hover:scale-105"
        >
          <div class="text-5xl text-primary-500 mb-6 flex justify-center">
            <NuxtIcon name="lucide-briefcase" />
          </div>
          <h3
            class="text-2xl font-semibold text-slate-200 mb-4 text-center"
          >Responsible Employment Practices</h3>
          <p class="text-base text-slate-400 text-center">Our team is our
            greatest asset. We are dedicated to creating a diverse, equitable,
            and inclusive workplace where every employee feels valued,
            respected, and empowered. We invest in professional development,
            prioritize work-life balance, and ensure fair labor practices to
            foster a thriving internal culture.</p>
        </div>
        <div
          class="p-8 bg-slate-900 rounded-lg shadow-xl border border-tertiary-500 transition-transform duration-300 hover:scale-105"
        >
          <div class="text-5xl text-primary-500 mb-6 flex justify-center">
            <NuxtIcon name="lucide-hand-heart" />
          </div>
          <h3 class="text-2xl font-semibold text-slate-200 mb-4 text-center">Pro
            Bono & Philanthropic Initiatives</h3>
          <p class="text-base text-slate-400 text-center">We actively seek
            opportunities to give back through pro bono services and
            philanthropic endeavors. This involves dedicating our expertise and
            resources to support causes that align with our values, particularly
            those focused on empowering underserved populations and fostering
            sustainable development in Africa.</p>
        </div>
        <div
          class="p-8 bg-slate-900 rounded-lg shadow-xl border border-tertiary-500 transition-transform duration-300 hover:scale-105"
        >
          <div class="text-5xl text-primary-500 mb-6 flex justify-center">
            <NuxtIcon name="lucide-award" />
          </div>
          <h3
            class="text-2xl font-semibold text-slate-200 mb-4 text-center"
          >Advocacy for Responsible Growth</h3>
          <p class="text-base text-slate-400 text-center">{{appName}}
            actively advocates for policies and practices that promote
            responsible and inclusive economic growth. We believe in
            contributing to dialogues and initiatives that shape a financial
            future where technology serves humanity and progress is equitable
            for all, particularly within the African context.</p>
        </div>
      </div>
    </section>

    <div>
      <MainCtaBanner />
    </div>
  </div>
</div>
</template>