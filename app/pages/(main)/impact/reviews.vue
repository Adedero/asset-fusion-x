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
        class="relative w-full h-[650px] overflow-hidden rounded-lg mb-24 flex items-center justify-center text-center"
      >
        <NuxtImg
          placeholder
          src="https://media.istockphoto.com/id/1480574526/photo/happy-multigenerational-people-having-fun-sitting-on-grass-in-a-public-park.jpg?s=612x612&w=0&k=20&c=iIzSiY2FK9mWTCmV8Ip8zpvXma7f1Qbd-UuKXNJodPg="
          alt="Diverse group of happy people, symbolizing a community built on trust"
          class="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"
        />
        <div class="relative z-10 p-8">
          <h1
            class="text-primary-200 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up"
          >
            Hear It From Our Community: Real Stories of Financial Empowerment
            with {{ appName }}
          </h1>
          <p
            class="text-base sm:text-lg text-slate-300 max-w-4xl mx-auto mb-8 animate-fade-in-up delay-200"
          >
            The true measure of our success lies in the trust and satisfaction
            of our users. Dive into authentic testimonials and reviews that
            highlight how
            {{ appName }}
            is helping individuals like you build confidence, achieve their
            financial goals, and create sustainable passive income.
          </p>
          <div
            class="mt-8 inline-block bg-slate-800/70 p-4 rounded-lg shadow-xl border border-white/30 backdrop-blur-sm animate-fade-in-up delay-400"
          >
            <p class="text-base text-slate-200">
              Their experiences speak volumes. Discover why our community trusts
              us with their passive income journey.
            </p>
          </div>
        </div>
      </section>

      <section
        class="mb-24 py-16 px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div>
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8 leading-tight">
            More Than Just Words: The Impact of Genuine User Reviews
          </h2>
          <p class="text-base text-slate-300 leading-relaxed mb-6">
            At {{ appName }}, we don't just build a platform; we build a
            relationship based on trust and transparency. We understand that
            choosing a financial partner for your passive income goals is a
            significant decision. That's why we deeply value the feedback from
            our growing community. These reviews are more than just
            testimonials; they are real-life accounts of the tangible impact our
            platform has on people's financial lives.
          </p>
          <p class="text-base text-slate-300 leading-relaxed mb-6">
            Every success story, every word of appreciation, and even every
            constructive criticism helps us refine our services and ensure we're
            truly meeting the needs of modern investors. We believe that by
            openly sharing these experiences, we foster a stronger, more
            informed community where potential users can see themselves
            reflected in the achievements of others. Our commitment to
            continuous improvement is fueled by your voice.
          </p>
          <ul class="list-disc list-inside text-slate-300 text-base space-y-2">
            <li>
              <span class="text-primary-500 font-semibold">Builds Trust:</span>
              Real user experiences offer unbiased insights into our service.
            </li>
            <li>
              <span class="text-primary-500 font-semibold"
                >Inspires Confidence:</span
              >
              See how others have successfully navigated their financial
              journeys.
            </li>
            <li>
              <span class="text-primary-500 font-semibold"
                >Guides Improvement:</span
              >
              Your feedback directly informs our feature development and service
              enhancements.
            </li>
            <li>
              <span class="text-primary-500 font-semibold"
                >Fosters Community:</span
              >
              Connect with the shared experiences of fellow investors.
            </li>
          </ul>
        </div>
        <div
          class="relative w-full h-96 rounded-lg overflow-hidden shadow-xl border border-primary-500"
        >
          <NuxtImg
            placeholder
            src="https://blog.wei.com/hubfs/network.jpg"
            alt="Abstract digital network representing interconnected users and feedback"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-tl from-slate-900 via-slate-900/70 to-transparent opacity-80"
          />
        </div>
      </section>

      <section
        class="mb-24 py-16 px-8 bg-slate-800 rounded-lg shadow-inner border border-white/30"
      >
        <h2 class="text-4xl font-bold text-primary-500 mb-16 text-center">
          Spotlight: Experiences That Define Our Impact
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            class="bg-slate-900 p-8 rounded-lg shadow-xl border border-tertiary-500 relative overflow-hidden"
          >
            <span
              class="absolute top-4 left-4 text-8xl text-primary-700 opacity-20 font-bold"
              >&#8220;</span
            >
            <p
              class="text-2xl italic text-slate-200 mb-6 relative z-10 leading-relaxed"
            >
              "{{ appName }} transformed my approach to investing. I started
              with minimal knowledge, and their educational resources paired
              with the seamless platform made building passive income genuinely
              achievable. The clarity and support are unparalleled."
            </p>
            <div
              class="flex items-center mt-8 pt-4 border-t border-slate-700 relative z-10"
            >
              <NuxtImg
                placeholder
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Avatar of a satisfied user"
                class="w-16 h-16 rounded-full mr-4 border-2 border-primary-500"
              />
              <div>
                <p class="font-bold text-primary-500 text-lg">[Michael S.]</p>
                <p class="text-slate-400 text-sm">
                  Small Business Owner, Arkansas, USA
                </p>
              </div>
            </div>
          </div>
          <div
            class="bg-slate-900 p-8 rounded-lg shadow-xl border border-tertiary-500 relative overflow-hidden"
          >
            <span
              class="absolute top-4 left-4 text-8xl text-primary-700 opacity-20 font-bold"
              >&#8220;</span
            >
            <p
              class="text-2xl italic text-slate-200 mb-6 relative z-10 leading-relaxed"
            >
              "I've tried several platforms, but
              {{ appName }}
              stands out for its intuitive design and transparent insights. My
              passive income portfolio has grown consistently, and I finally
              feel confident about my financial future. Highly recommend!"
            </p>
            <div
              class="flex items-center mt-8 pt-4 border-t border-slate-700 relative z-10"
            >
              <NuxtImg
                placeholder
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Avatar of a satisfied user"
                class="w-16 h-16 rounded-full mr-4 border-2 border-primary-500"
              />
              <div>
                <p class="font-bold text-primary-500 text-lg">
                  [Dr. Julian Cho]
                </p>
                <p class="text-slate-400 text-sm">
                  Medical Professional, California, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-24 py-16 px-8">
        <h2 class="text-4xl font-bold text-tertiary-500 mb-16 text-center">
          What Our Users Love: Reviews by Key Impact Areas
        </h2>
        <p class="text-base text-slate-300 mb-12 text-center max-w-4xl mx-auto">
          Our users consistently highlight specific aspects of
          {{ appName }}
          that have made a significant difference in their investment journey.
          Explore common themes in their positive feedback below.
        </p>

        <div class="flex flex-col gap-16">
          <div
            class="bg-gradient-to-b from-primary-500/10 p-8 rounded-lg shadow-lg border border-white/10"
          >
            <h3
              class="text-3xl font-semibold text-slate-200 mb-8 border-b border-slate-700 pb-4 flex gap-2 items-center"
            >
              <NuxtIcon
                class="text-primary-500"
                name="lucide-mouse-pointer-click"
              />
              Seamless User Experience
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "I used to find investing intimidating, but {{ appName }}'s
                  interface is incredibly user-friendly. It's clean, easy to
                  navigate, and I can find everything I need without feeling
                  overwhelmed. A real game-changer for someone new to the
                  market!"
                </p>
                <p class="font-bold text-primary-500">[Alan N.]</p>
                <p class="text-slate-400 text-sm">
                  Marketing Specialist, Canada
                </p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "The platform walkthroughs and overall design make it so
                  simple to get started. I appreciate how intuitive everything
                  is – from setting up my account to tracking my investments
                  daily. It's genuinely a joy to use."
                </p>
                <p class="font-bold text-primary-500">[Etienne O.]</p>
                <p class="text-slate-400 text-sm">Software Developer, France</p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "No complex jargon, just clear, concise information. As a busy
                  professional, I needed something efficient, and
                  {{ appName }}
                  delivered. I spend less time managing and more time enjoying
                  my passive income."
                </p>
                <p class="font-bold text-primary-500">[Sarah A.]</p>
                <p class="text-slate-400 text-sm">Accountant, Spain</p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "The mobile app is fantastic! I can check my portfolio and
                  make adjustments on the go, which is crucial for my lifestyle.
                  The push notifications keep me informed without being
                  intrusive."
                </p>
                <p class="font-bold text-primary-500">[Kendrick B.]</p>
                <p class="text-slate-400 text-sm">Freelancer, USA</p>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-b from-primary-500/10 p-8 rounded-lg shadow-lg border border-white/10"
          >
            <h3
              class="text-3xl font-semibold text-slate-200 mb-8 border-b border-slate-700 pb-4 flex gap-2 items-center"
            >
              <NuxtIcon class="text-primary-500" name="lucide-wallet" />
              Tangible Returns & Passive Income
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "My goal was to build a steady passive income stream, and
                  {{ appName }}
                  has truly helped me achieve that. The automated investments
                  and dividend reinvestment features are fantastic for
                  consistent growth."
                </p>
                <p class="font-bold text-primary-500">[Adebayo F.]</p>
                <p class="text-slate-400 text-sm">
                  Retired Educator, Ibadan, Nigeria
                </p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "I'm seeing real growth in my portfolio, something I struggled
                  to achieve on my own. The smart diversification means I sleep
                  better at night knowing my money is working hard for me,
                  intelligently."
                </p>
                <p class="font-bold text-primary-500">[Grace C.]</p>
                <p class="text-slate-400 text-sm">
                  Small Business Owner, Kumasi, Ghana
                </p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "The consistent payouts from my passive income investments
                  through
                  {{ appName }}
                  have been a huge relief. It's exactly what I needed to
                  supplement my income and accelerate my financial independence
                  plans."
                </p>
                <p class="font-bold text-primary-500">[Uche D.]</p>
                <p class="text-slate-400 text-sm">
                  IT Consultant, Enugu, Nigeria
                </p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "I started with a modest sum, and watching my portfolio grow
                  through their smart strategies has been incredibly motivating.
                  This platform truly delivers on its promise of making passive
                  income accessible."
                </p>
                <p class="font-bold text-primary-500">[Jessica L.]</p>
                <p class="text-slate-400 text-sm">
                  Student, Johannesburg, South Africa
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-b from-primary-500/10 p-8 rounded-lg shadow-lg border border-white/10"
          >
            <h3
              class="text-3xl font-semibold text-slate-200 mb-8 border-b border-primary-600 pb-4 flex gap-2 items-center"
            >
              <NuxtIcon class="text-primary-500" name="lucide-graduation-cap" />
              Empowering Education & Responsive Support
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "The investor education section is fantastic. It truly
                  demystified complex concepts, allowing me to make more
                  informed decisions about my passive income strategy. It's not
                  just a platform; it's a learning hub."
                </p>
                <p class="font-bold text-primary-500">[Francis A.]</p>
                <p class="text-slate-400 text-sm">Civil Servant, USA</p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "Whenever I had a question, customer support was quick,
                  professional, and genuinely helpful. It's reassuring to know
                  there are real people behind the technology who care about
                  your success."
                </p>
                <p class="font-bold text-primary-500">[Nathalie K.]</p>
                <p class="text-slate-400 text-sm">Entrepreneur, Canada</p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "I appreciate the detailed market insights and risk
                  disclosures.
                  {{ appName }}
                  doesn't shy away from being transparent, and that transparency
                  builds immense trust. I feel I'm in very capable hands."
                </p>
                <p class="font-bold text-primary-500">[Yusuf A.]</p>
                <p class="text-slate-400 text-sm">Analyst, UAE</p>
              </div>
              <div
                class="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-700"
              >
                <p class="text-base italic text-slate-300 mb-4">
                  "The webinars are a gem! Learning directly from experts and
                  asking questions in real-time has greatly accelerated my
                  understanding of investment strategies. It's truly a
                  comprehensive offering."
                </p>
                <p class="font-bold text-primary-500">[Chang W.]</p>
                <p class="text-slate-400 text-sm">
                  Financial Planner, Singapore
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="mb-24 py-16 px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div
          class="relative w-full h-96 rounded-lg overflow-hidden shadow-xl border border-primary-500"
        >
          <NuxtImg
            placeholder
            src="https://img.freepik.com/free-photo/side-view-people-discussing-work_23-2149739375.jpg?semt=ais_hybrid&w=740"
            alt="Two people having a discussion, symbolizing active listening and collaboration"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/70 to-transparent opacity-80"
          />
        </div>
        <div>
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8 leading-tight">
            Your Voice Shapes Our Future: Our Commitment to Feedback
          </h2>
          <p class="text-base text-slate-300 leading-relaxed mb-6">
            We are committed to continuous improvement, and your feedback is at
            the heart of that process. We actively gather reviews and insights
            through various channels – from direct submissions on our platform
            to surveys and direct engagement with our support team. Every piece
            of feedback, whether it's a glowing commendation or a suggestion for
            improvement, is carefully reviewed by our dedicated teams.
          </p>
          <p class="text-base text-slate-300 leading-relaxed mb-6">
            We utilize your input to inform product development, enhance user
            experience, and ensure our services remain at the forefront of the
            passive income investment landscape. Our goal is not just to meet
            your expectations but to consistently exceed them, fostering a
            platform that evolves with your needs and the changing market. Your
            experience drives our innovation.
          </p>
          <ul class="list-disc list-inside text-slate-300 text-base space-y-2">
            <li>
              <span class="text-primary-500 font-semibold"
                >Active Listening:</span
              >
              We use diverse channels to hear what our users have to say.
            </li>
            <li>
              <span class="text-primary-500 font-semibold"
                >Data-Driven Improvement:</span
              >
              Feedback directly informs our roadmap and development priorities.
            </li>
            <li>
              <span class="text-primary-500 font-semibold"
                >Continuous Innovation:</span
              >
              We constantly strive to enhance your investing journey based on
              your insights.
            </li>
          </ul>
        </div>
      </section>

      <div>
        <MainCtaBanner
          title="Ready to Write Your Own Success Story?"
          description="Join the growing community of satisfied investors who are building their financial future with AssetFusionX. Experience the ease, intelligence, and dedicated support that so many of our users rave about. Your journey towards impactful passive income starts here."
          button-label="Start Your Investment Journey"
        />
      </div>
    </div>
  </div>
</template>
