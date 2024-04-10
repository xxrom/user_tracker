"use client";

import Head from "next/head";
import Script from "next/script";

declare global {
  interface Window {
    tracker: {
      track(event: string, ...tags: string[]): void;
    };
  }
}

export default function Home({ params }: { params: { slug: string } }) {
  console.log(params);

  return (
    <div>
      <Head>
        <title>My website</title>
      </Head>

      <Script
        strategy="beforeInteractive"
        src="http://localhost:8888/tracker"
      />
      <Script id="tracker">
        window.tracker.track('pageview'); window.tracker.track('test', 'one',
        'two', 'three');
      </Script>

      <div>{`Hello ${params.slug}`}</div>

      <button onClick={() => window.tracker?.track("click-button")}>
        Click me
      </button>
      <ul>
        <li>
          <a
            href="/1.html"
            onClick={() => window.tracker?.track("click-link", "1")}
          >
            1.html
          </a>
        </li>
        <li>
          <a
            href="/2.html"
            onClick={() => window.tracker?.track("click-link", "2")}
          >
            2.html
          </a>
        </li>
        <li>
          <a
            href="/3.html"
            onClick={() => window.tracker?.track("click-link", "3", "three")}
          >
            3.html
          </a>
        </li>
      </ul>
    </div>
  );
}
