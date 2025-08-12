<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { appName, emailAddress } = useRuntimeConfig().public;
</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section class="relative w-full py-16 rounded-lg mb-16 text-center">
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-500 leading-tight mb-4"
        >
          Terms of Use
        </h1>
        <p class="text-base sm:text-lg text-slate-300 max-w-4xl mx-auto">
          Last Updated: July 7, 2025
        </p>
      </section>

      <section class="mb-24 py-12 px-8 leading-relaxed">
        <p class="mb-8">
          Welcome to
          {{ appName }}
          ("we," "our," or "us"). These Terms of Use ("Terms") govern your
          access to and use of our website, mobile applications, and any related
          services (collectively, the "Services"). By accessing or using the
          Services, you agree to be bound by these Terms and our Privacy Policy.
          If you do not agree to all these Terms, do not use our Services.
        </p>

        <p class="mb-8">
          These Terms constitute a legally binding agreement between you and
          {{ appName }}. Please read them carefully before using the Services.
          We may update these Terms from time to time, and your continued use of
          the Services after such changes constitutes your acceptance of the new
          Terms. We will notify you of any material changes by posting the
          updated Terms on our website or through other appropriate
          communication channels.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          1. Acceptance of Terms
        </h2>
        <p class="mb-4">
          By creating an account, accessing, or using the Services, you affirm
          that you are of legal age to form a binding contract in your
          jurisdiction (typically 18 years or older) and that you have read,
          understood, and agree to be bound by these Terms. If you are using the
          Services on behalf of an entity, you represent and warrant that you
          have the authority to bind that entity to these Terms.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          2. Description of Services
        </h2>
        <p class="mb-4">
          {{ appName }} provides an online platform that enables users to engage
          in various financial activities, including but not limited to,
          managing investment portfolios, accessing educational resources on
          passive income strategies, and utilizing tools for financial planning.
          Our Services are provided for informational and general investment
          management purposes only and do not constitute financial, legal, tax,
          or other professional advice. We do not guarantee any specific
          investment outcomes or returns.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          3. User Eligibility
        </h2>
        <p class="mb-4">To be eligible to use our Services, you must:</p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>
            Be at least 18 years old or the age of majority in your
            jurisdiction, whichever is greater.
          </li>
          <li>
            Be a resident of a country or region where
            {{ appName }}
            legally operates.
          </li>
          <li>Have the legal capacity to enter into a binding contract.</li>
          <li>
            Comply with all applicable laws and regulations in your
            jurisdiction.
          </li>
        </ul>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          4. Account Registration and Security
        </h2>
        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          4.1 Account Creation
        </h3>
        <p class="mb-4">
          To access certain features of the Services, you may be required to
          register for an account. You agree to provide accurate, current, and
          complete information during the registration process and to update
          such information to keep it accurate, current, and complete.
        </p>

        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          4.2 Account Security
        </h3>
        <p class="mb-4">
          You are responsible for safeguarding your account password and for any
          activities or actions under your account, whether or not you have
          authorized such activities or actions. You must notify us immediately
          of any unauthorized use of your account or any other breach of
          security. We will not be liable for any loss or damage arising from
          your failure to comply with these security obligations.
        </p>

        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          4.3 Identity Verification
        </h3>
        <p class="mb-4">
          You agree to cooperate with all requests made by us or our third-party
          service providers on our behalf to identify you or authenticate your
          identity or credentials. This may include, but is not limited to,
          asking you for further information or documentation, and/or requiring
          you to take steps to confirm ownership of your phone number or payment
          instruments.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          5. User Responsibilities and Prohibited Conduct
        </h2>
        <p class="mb-4">
          You agree to use the Services only for lawful purposes and in a manner
          that does not infringe the rights of, or restrict or inhibit the use
          and enjoyment of the Services by, any third party. Prohibited conduct
          includes, but is not limited to:
        </p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>
            Engaging in any fraudulent, unlawful, or deceptive activities.
          </li>
          <li>
            Impersonating any person or entity, or falsely stating or otherwise
            misrepresenting your affiliation with a person or entity.
          </li>
          <li>Distributing viruses, malware, or any other malicious code.</li>
          <li>
            Attempting to gain unauthorized access to any part of the Services,
            other accounts, computer systems, or networks connected to the
            Services.
          </li>
          <li>
            Interfering with or disrupting the integrity or performance of the
            Services or the data contained therein.
          </li>
          <li>
            Collecting or harvesting any personally identifiable information
            from the Services, except as permitted by these Terms.
          </li>
          <li>
            Using the Services for any commercial purpose not expressly
            permitted by {{ appName }}.
          </li>
          <li>
            Violating any applicable laws, regulations, or third-party rights.
          </li>
        </ul>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          6. Intellectual Property Rights
        </h2>
        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          6.1 Ownership
        </h3>
        <p class="mb-4">
          All content, features, and functionality available through the
          Services, including but not limited to text, graphics, logos, icons,
          images, audio clips, digital downloads, data compilations, and
          software, are the exclusive property of {{ appName }}, its licensors,
          or other content providers, and are protected by international
          copyright, trademark, patent, trade secret, and other intellectual
          property or proprietary rights laws.
        </p>

        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          6.2 License to Use
        </h3>
        <p class="mb-4">
          Subject to your compliance with these Terms,
          {{ appName }}
          grants you a limited, non-exclusive, non-transferable,
          non-sublicensable license to access and use the Services for your
          personal, non-commercial purposes.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          7. Disclaimers
        </h2>
        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          7.1 No Financial Advice
        </h3>
        <p class="mb-4">
          The information provided through the Services is for general
          informational purposes only and is not intended as, and shall not be
          understood or construed as, financial, investment, legal, tax, or
          professional advice. We are not a financial advisor, and your use of
          the Services does not create a client relationship. You should consult
          with a qualified professional before making any financial decisions.
        </p>

        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          7.2 No Guarantees
        </h3>
        <p class="mb-4">
          Investments involve risk, and you could lose money. Past performance
          is not indicative of future results. We make no guarantees regarding
          the performance of any investment, the accuracy of any information
          provided, or the suitability of any investment for your specific
          circumstances. You acknowledge that you are solely responsible for
          evaluating the merits and risks associated with the use of any
          information or content provided through the Services.
        </p>

        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          7.3 "As Is" Basis
        </h3>
        <p class="mb-4">
          THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS,
          WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE
          FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW,
          {{ appName }}
          DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT
          LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY. WE DO NOT WARRANT
          THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE
          OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          8. Limitation of Liability
        </h2>
        <p class="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
          {{ appName }}, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR
          LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION
          DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE
          LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, OR INABILITY
          TO USE, THE SERVICES, EVEN IF
          {{ appName }}
          HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL
          {{ appName }}'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, AND
          CAUSES OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR
          OTHERWISE, EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OR
          USING THE SERVICES DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING
          THE DATE OF THE CLAIM OR ONE HUNDRED US DOLLARS ($100), WHICHEVER IS
          GREATER.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          9. Indemnification
        </h2>
        <p class="mb-4">
          You agree to indemnify, defend, and hold harmless {{ appName }}, its
          affiliates, officers, directors, employees, agents, and licensors from
          and against any and all claims, liabilities, damages, losses, costs,
          expenses, or fees (including reasonable attorneys' fees) arising from
          or relating to:
        </p>
        <ul class="list-disc list-inside ml-4 mb-4">
          <li>Your violation of these Terms.</li>
          <li>
            Your use of the Services, including any data or content transmitted
            or received by you.
          </li>
          <li>
            Your violation of any rights of a third party, including
            intellectual property rights or privacy rights.
          </li>
          <li>Your violation of any applicable law, rule, or regulation.</li>
        </ul>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          10. Termination
        </h2>
        <p class="mb-4">
          We may terminate or suspend your access to the Services immediately,
          without prior notice or liability, for any reason whatsoever,
          including without limitation if you breach these Terms. Upon
          termination, your right to use the Services will immediately cease. If
          you wish to terminate your account, you may simply discontinue using
          the Services or contact us to request account closure.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          11. Governing Law and Dispute Resolution
        </h2>
        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          11.1 Governing Law
        </h3>
        <p class="mb-4">
          These Terms shall be governed by and construed in accordance with the
          laws of the Federal Republic of Nigeria, without regard to its
          conflict of law principles.
        </p>

        <h3 class="text-2xl font-semibold text-slate-200 mt-8 mb-4">
          11.2 Dispute Resolution
        </h3>
        <p class="mb-4">
          Any dispute, controversy, or claim arising out of or relating to these
          Terms or the breach, termination, or invalidity thereof shall be
          settled by confidential binding arbitration in Abuja, Nigeria, in
          accordance with the applicable arbitration rules then in force. The
          decision of the arbitrator(s) shall be final and binding upon both
          parties.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          12. Changes to Terms
        </h2>
        <p class="mb-4">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will provide at
          least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole
          discretion. By continuing to access or use our Services after those
          revisions become effective, you agree to be bound by the revised
          terms. If you do not agree to the new terms, please stop using the
          Services.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          13. Severability
        </h2>
        <p class="mb-4">
          If any provision of these Terms is held to be invalid or unenforceable
          by a court of competent jurisdiction, the remaining provisions of
          these Terms will remain in full force and effect. The invalid or
          unenforceable provision will be replaced by a valid and enforceable
          provision that most closely reflects the intent of the original
          provision.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          14. Entire Agreement
        </h2>
        <p class="mb-4">
          These Terms, together with our Privacy Policy and any other legal
          notices published by us on the Services, constitute the entire
          agreement between you and
          {{ appName }}
          concerning the Services and supersede all prior agreements, proposals,
          and communications, whether written or oral, between you and
          {{ appName }}
          regarding the subject matter hereof.
        </p>

        <h2
          class="text-3xl font-bold text-tertiary-500 mt-10 mb-6 border-b border-primary-600 pb-3"
        >
          15. Contact Information
        </h2>
        <p class="mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p class="mb-2">
          Email:
          <a
            :href="`mailto:${emailAddress}`"
            target="_blank"
            rel="noopener"
            class="text-primary-400 hover:text-primary-300"
          >
            {{ emailAddress }}
          </a>
        </p>
        <!-- <p>Address: {{ app.address }}</p> -->
      </section>
    </div>
  </div>
</template>
