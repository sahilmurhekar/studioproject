import React from "react";
import Navbar from "../components/Navbar";
import LightRays from "../components/LightRays";

const RefundPolicy = () => {
  return (
    <>
    <LightRays/>
      <Navbar />
      <main className="px-[5%] md:px-[10%] lg:max-w-screen-xl lg:mx-auto py-16">
        <h1 className="text-3xl md:text-4xl font-black mb-6">Refund & Cancellation Policy</h1>

        <section className="space-y-6 leading-relaxed">
          <p>
            This policy explains how you can cancel an order or request a refund for purchases made on
            <a href="https://royalmusicalstudios.vercel.app/" className="underline"> https://royalmusicalstudios.vercel.app/</a>.
          </p>

          <h2 className="text-xl font-bold">1) Order Cancellations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellation requests are accepted within <strong>7 days</strong> of placing the order.</li>
            <li>
              Cancellations may not be possible once the seller/merchant has shipped the product or it is out for delivery.
              In such cases, you may refuse delivery at the doorstep.
            </li>
          </ul>

          <h2 className="text-xl font-bold">2) Exclusions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Perishable items (e.g., flowers, eatables) are not eligible for cancellation. Refunds/replacements may be
              considered if product quality is proven unsatisfactory.
            </li>
          </ul>

          <h2 className="text-xl font-bold">3) Damaged / Defective / Not as Described</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Report damaged or defective items to our support team within <strong>7 days</strong> of delivery. Claims are subject to
              seller/merchant verification.
            </li>
            <li>
              If the item received materially differs from what was shown on the Platform, contact support within
              <strong> 7 days</strong> of receipt for review.
            </li>
          </ul>

          <h2 className="text-xl font-bold">4) Manufacturer Warranty</h2>
          <p>
            For products covered by a manufacturer warranty, please contact the manufacturer as per the warranty terms.
          </p>

          <h2 className="text-xl font-bold">5) Refund Timelines</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Once a refund is approved by Royal Musical Studios, it will be processed within <strong>3 business days</strong> to the
              original payment method (or as otherwise communicated).
            </li>
          </ul>

          <h2 className="text-xl font-bold">6) How to Reach Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:royalmusicalstudios@gmail.com" className="underline">
              royalmusicalstudios@gmail.com
            </a>
          </p>
          <p>Phone: +91 9403078323 (Mon–Fri, 9:00–18:00 IST)</p>
        </section>
      </main>
    </>
  );
};

export default RefundPolicy;
