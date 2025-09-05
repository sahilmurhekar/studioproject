import React from "react";
import Navbar from "../components/Navbar";
import LightRays from "../components/LightRays";

const PrivacyPolicy = () => {
  return (
    <>
    <LightRays/>
      <Navbar />
      <main className="px-[5%] md:px-[10%] lg:max-w-screen-xl lg:mx-auto py-16">
        <h1 className="text-3xl md:text-4xl font-black mb-6">Privacy Policy</h1>
        <p className="text-sm opacity-80 mb-8">
          Effective in India. By using our Platform, you consent to the practices described below.
        </p>

        <section className="space-y-6 leading-relaxed">
          <h2 className="text-xl font-bold">1) Introduction</h2>
          <p>
            Royal Musical Studios (“we”, “our”, “us”) operates{" "}
            <a href="https://royalmusicalstudios.vercel.app/" className="underline">
              https://royalmusicalstudios.vercel.app/
            </a>{" "}
            (the “Platform”). You may browse certain sections without registering. We primarily store and process personal
            data in India and do not offer products/services outside India through this Platform.
          </p>

          <h2 className="text-xl font-bold">2) Data We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Profile & Contact:</strong> name, date of birth, address, phone, email, and any identity/address proof you share.
            </li>
            <li>
              <strong>Sensitive Data (with consent):</strong> payment details (bank/UPI/card), and optional biometrics
              (e.g., facial features) where a feature explicitly offers it.
            </li>
            <li>
              <strong>Usage & Transactions:</strong> activity on the Platform, preferences, and order/service history (including data received from third-party partners you engage with via the Platform).
            </li>
          </ul>

          <h2 className="text-xl font-bold">3) How We Use Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, operate, and improve the Platform and Services.</li>
            <li>Process orders, payments, and customer support requests.</li>
            <li>Prevent fraud and ensure trust and safety.</li>
            <li>Conduct research, analytics, and marketing (with opt-out where applicable).</li>
            <li>Comply with legal obligations and enforce our Terms.</li>
          </ul>

          <h2 className="text-xl font-bold">4) Sharing of Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Within our group and with affiliates to deliver Services. They may market to you unless you opt out.
            </li>
            <li>
              With third parties such as sellers, logistics providers, payment/loyalty partners, and service providers,
              to fulfil your requests.
            </li>
            <li>
              With law enforcement or government agencies when required by law or to protect rights, property, or safety.
            </li>
          </ul>

          <h2 className="text-xl font-bold">5) Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect your data. However, internet transmission
            is not fully secure. Please safeguard your account credentials.
          </p>

          <h2 className="text-xl font-bold">6) Data Retention & Deletion</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We retain personal data only as long as needed for the purposes described or as required by law. We may retain
              limited data to prevent fraud or for legitimate interests, and anonymized data for analytics.
            </li>
            <li>
              You can delete your account via your profile/settings or by contacting us. If there are pending grievances,
              claims, shipments, or services, deletion may be delayed or refused until resolved.
            </li>
          </ul>

          <h2 className="text-xl font-bold">7) Your Rights</h2>
          <p>
            You may access, correct, and update your personal data through the Platform’s account features, subject to applicable laws.
          </p>

          <h2 className="text-xl font-bold">8) Consent & Communication</h2>
          <p>
            By providing your data, you consent to its processing as described. You authorize us and our affiliates/partners to
            contact you via SMS, messaging apps, calls, and email for the purposes listed. You may withdraw consent by emailing the
            Grievance Officer (see below). Withdrawal is prospective and may limit certain Services.
          </p>

          <h2 className="text-xl font-bold">9) Changes to This Policy</h2>
          <p>
            We may update this Policy from time to time. Significant changes will be notified as required by law. Please review this page periodically.
          </p>

          <h2 className="text-xl font-bold">10) Grievance Officer</h2>
          <div className="space-y-1">
            <p><strong>Office:</strong> Royal Musical Studios</p>
            <p><strong>Designation:</strong> Owner</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:royalmusicalstudios@gmail.com" className="underline">
                royalmusicalstudios@gmail.com
              </a>
            </p>
            <p><strong>Phone:</strong> +91 9403078323</p>
            <p><strong>Timings:</strong> Monday–Friday, 9:00–18:00 IST</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
