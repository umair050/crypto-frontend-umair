"use client";

import Head from 'next/head';
import styled from 'styled-components'; 
import BasicSection from '@/components/BasicSection';
import Testimonials from '@/views/HomePage/Testimonials';
import Hero from '@/views/HomePage/Hero'; 
import Partners from '@/views/HomePage/Partners'; 
import { EnvVars } from '../../env';
import Cta from '@/views/HomePage/Cta';
import FeaturesGallery from '@/views/HomePage/FeaturesGallery';
import Features from '@/views/HomePage/Features';
import CustomLink from '@/components/CustomLink';

export default function Homepage() {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection
            imageUrl="/demo-illustration-1.svg"
            title="Lorem ipsum dolor sit amet consectetur."
            overTitle="sit amet gogo"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem error incidunt a doloremque voluptatem porro inventore
              voluptate quo deleniti animi laboriosam.{' '}
              <CustomLink href="/help-center">Possimus ullam velit rem itaque consectetur, in distinctio?</CustomLink> Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Soluta repellendus quia quos obcaecati nihil. Laudantium non accusantium, voluptate eum nesciunt
              at suscipit quis est soluta?Test
            </p>
          </BasicSection>
          <BasicSection
            imageUrl="/demo-illustration-2.svg"
            title="Lorem ipsum dolor sit."
            overTitle="lorem ipsum"
            reversed
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              quidem error incidunt a doloremque voluptatem porro inventore{" "}
              <strong>voluptate quo deleniti animi laboriosam</strong>. Possimus
              ullam velit rem itaque consectetur, in distinctio?
            </p>
            <ul>
              <li>Professional point 1</li>
              <li>Professional remark 2</li>
              <li>Professional feature 3</li>
            </ul>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          {/* <ScrollableBlogPosts posts={posts} /> */}
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

// export async function getStaticProps() {
//   return {
//     props: {
//       posts: await getAllPosts(),
//     },
//   };
// }
