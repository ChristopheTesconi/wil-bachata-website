"use client";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={`container ${styles.home}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          RDF Bachata Fusion <span>by Coach Wil</span>
        </h1>
        <h2>Bachata Lab St. Gallen – Weekly Group Classes</h2>
      </section>

      {/* Location */}
      <section className={styles.section}>
        <h2>📍 Location</h2>
        <address className={styles.address}>
          MoveBox Studio <br />
          Unterstrasse 22, 9000 St. Gallen
        </address>
        <ul>
          <li>✅ Easy access from Davidstrasse</li>
          <li>✅ Parking available</li>
          <li>✅ Clean, spacious, and full of good energy</li>
        </ul>
      </section>

      {/* Weekly Classes */}
      <section className={styles.section}>
        <h2>🗓 Weekly Classes</h2>

        <div className={styles.classItem}>
          <h3>Monday – Intermediate (20:30–22:30)</h3>
          <p>
            We focus on one combination for the whole month. This helps you truly learn the
            technique, control your body, and dance it with confidence and flow.
          </p>
        </div>

        <div className={styles.classItem}>
          <h3>Thursday – Beginner + Practice (20:30–22:30)</h3>
          <p>
            <strong>20:30–21:30:</strong> Learn partnerwork basics, rhythm, body movement, and
            connection.
            <br />
            <strong>21:30–22:30:</strong> Practice in a relaxed space — grow at your own pace.
          </p>
        </div>

        <div className={styles.classItem}>
          <h3>Friday – Open Level (20:30–22:30)</h3>
          <p>
            Fun drills, partnerwork, musical flow — everyone is welcome!
          </p>

          <div className={styles.friday}>
            <p>
              💡 <strong>Every last Friday of the month:</strong>
              <br />
              <em>20:30–21:30:</em> Styling Class – express yourself and build confidence
              <br />
              <em>21:30–22:30:</em> Social Practice – just dance, have fun, no pressure
            </p>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section className={styles.section}>
        <h2>💰 Prices</h2>
        <ul>
          <li>
            <strong>Early Bird:</strong> 35 CHF (via EventFrog)
          </li>
          <li>
            <strong>At the Door:</strong> 40 CHF (cash or TWINT)
          </li>
          <li>
            <strong>First Time?</strong> → Only 20 CHF
          </li>
        </ul>
        <p>
          🔥 Want to come more than 4x per month?
          <br />
          Membership gives you <strong>more for less</strong>.
          <br />
          Bachata Lab Pro Memberships start from <strong>150–240 CHF/month</strong>.
          <br />→ Includes multiple classes, app access, and party passes.
        </p>
        <p>
          <em>(Ask me for details — I’ll guide you to the best option)</em>
        </p>
      </section>

      {/* Outro */}
      <section className={styles.outro}>
        <h2>Welcome to Bachata Lab St. Gallen</h2>
        <p>
          We practice, have fun, and support each other.
          <br />
          Come try a class and feel the difference.
        </p>
        <p>
          <strong>See you on the dance floor! 💃</strong>
          <br />
          – Coach Wil
        </p>
      </section>
    </main>
  );
}
