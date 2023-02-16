import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__subtitle">{siteConfig.title}</h1>
        <p className="hero__subtitle">for</p>
        <h1 className="hero__title">{siteConfig.tagline}</h1>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="docs/Overview">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className={styles.overviewContainer}>
        <div className={clsx(styles.overviewItem, styles.overviewItemImage)}>
      <img
            type="image/png"
            src="img/local-language-support-logo.png"
          />
          </div>
          <div className={clsx(styles.overviewItem, styles.overviewItemText)}>
        <h2 className={styles.overviewTitle}>
        One Nation - Let’s talk commerce! Speak your language.
        </h2>
        <p className={styles.overviewText}>
        If we need to solve the adoption problem we need to communicate in a language closer to our hearts and what better than our native languages to do so. And that’s the idea behind Conversational Commerce.
        </p>
      </div>
        </section>
      </main>
    </Layout>
  );
}
