import { sanityFetch } from "@workspace/sanity/live";
import {
  queryFooterData,
  queryGlobalSeoSettings,
} from "@workspace/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@workspace/sanity/types";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

type SocialLinksProps = {
  data: NonNullable<QueryGlobalSeoSettingsResult>["socialLinks"];
};

type FooterProps = {
  data: NonNullable<QueryFooterDataResult>;
  settingsData: NonNullable<QueryGlobalSeoSettingsResult>;
};

export async function FooterServer() {
  const [response, settingsResponse] = await Promise.all([
    sanityFetch({
      query: queryFooterData,
    }),
    sanityFetch({
      query: queryGlobalSeoSettings,
    }),
  ]);

  if (!(response?.data && settingsResponse?.data)) {
    return <FooterSkeleton />;
  }
  return <Footer data={response.data} settingsData={settingsResponse.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) {
    return null;
  }

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    {
      url: facebook,
      Icon: FacebookIcon,
      label: "Follow us on Facebook",
    },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    {
      url: linkedin,
      Icon: LinkedinIcon,
      label: "Follow us on LinkedIn",
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-[2.4rem] text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          className="font-medium hover:text-primary"
          key={`social-link-${url}-${index.toString()}`}
        >
          <Link
            aria-label={label}
            href={url ?? "#"}
            prefetch={false}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="fill-muted-foreground hover:fill-primary/80 dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-[6.4rem] pb-[3.2rem]">
      <section className="container mx-auto px-[1.6rem] md:px-[2.4rem]">
        <div className="h-[500px] lg:h-auto">
          <div className="flex flex-col items-center justify-between gap-[4rem] text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-[38.4rem] shrink flex-col items-center justify-between gap-[2.4rem] lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-[1.6rem] lg:justify-start">
                  <div className="h-[4rem] w-[8rem] animate-pulse rounded bg-muted" />
                </span>
                <div className="mt-[2.4rem] h-[6.4rem] w-full animate-pulse rounded bg-muted" />
              </div>
              <div className="flex items-center space-x-[2.4rem]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    className="h-[2.4rem] w-[2.4rem] animate-pulse rounded bg-muted"
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[2.4rem] lg:gap-[8rem]">
              {[1, 2, 3].map((col) => (
                <div key={col}>
                  <div className="mb-[2.4rem] h-[2.4rem] w-[9.6rem] animate-pulse rounded bg-muted" />
                  <div className="space-y-[1.6rem]">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        className="h-[1.6rem] w-full animate-pulse rounded bg-muted"
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[8rem] flex flex-col justify-between gap-[1.6rem] border-t pt-[3.2rem] text-center lg:flex-row lg:items-center lg:text-left">
            <div className="h-[1.6rem] w-[19.2rem] animate-pulse rounded bg-muted" />
            <div className="flex justify-center gap-[1.6rem] lg:justify-start">
              <div className="h-[1.6rem] w-[12.8rem] animate-pulse rounded bg-muted" />
              <div className="h-[1.6rem] w-[9.6rem] animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

function Footer({ data }: FooterProps) {
  const { footerHeader, columns } = data;

  return (
    <footer className="mt-[8rem] pb-[3.2rem] bg-[#E3E3E3] pt-[3rem] px-[3.4rem] max-sm:px-[1.6rem]">
      <div className="footer-header flex justify-between flex-wrap items-start max-sm:gap-[2rem]">
        <div className="flex justify-start items-start gap-[4rem] max-sm:flex-wrap max-sm:gap-[2rem]">
          {footerHeader.columns.map((col) => {
            return (
              <div key={col._key} className="w-[25.7rem]">
                {col.footerContent?.map((content) => {
                  if (content._type === "footerColumnLink") {
                    return (
                      <Link
                        href={content.href ?? "#"}
                        key={content._key}
                        target={content.openInNewTab ? "_blank" : ""}
                      >
                        <p className="text-[#9C9C9D] max-w-[21.2rem]">
                          {content.name}
                        </p>
                      </Link>
                    );
                  }

                  if (content._type === "footerTitle") {
                    return (
                      <p
                        key={content._key}
                        className="text-[#9C9C9D] font-semibold"
                      >
                        {content.title}
                      </p>
                    );
                  }

                  // divider or unknown types: nothing to render
                  return null;
                })}
              </div>
            );
          })}
        </div>
        <div className="max-sm:w-full">
          <p className="text-[#9C9C9D] max-w-[21.2rem]">
            {footerHeader.footerNewsletter.title}
          </p>

          <div className="flex items-center justify-center space-x-[0.2rem] mt-[1.2rem]">
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              className="bg-white w-[40rem] max-sm:w-full text-[#9C9C9D] px-[1.2rem] py-[0.8rem] focus:outline-none focus:ring focus:ring-primary/30"
            />
            <button
              type="button"
              className="bg-white text-[#9C9C9D] w-[15.1rem] flex items-start justify-start border border-gray-200 px-[1.6rem] py-[0.8rem] hover:bg-gray-50"
            >
              <p>Subscribe</p>
            </button>
          </div>

          <div className="mt-[1.2rem] flex items-center">
            <input
              id="footer-checkbox"
              name="footer-option"
              type="checkbox"
              className="mr-[0.8rem] w-[1.2rem] h-[1.2rem] appearance-none rounded-full border-[1.5px] border-[#9c9c9d] bg-[#E3E3E3] checked:bg-primary checked:border-primary focus:outline-none"
            />
            <label htmlFor="footer-checkbox" className="text-[#9C9C9D]">
              <p>I agree to our Privacy Policy</p>
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-start lg:justify-between flex-wrap gap-[2rem] max-sm:gap-0">
        {columns?.map((col) => {
          return (
            <div key={col._key}>
              {col.footerContent?.map((content) => {
                if (content._type === "footerColumnDivider") {
                  return (
                    <div
                      key={content._key}
                      className="w-[25.7rem] mb-[1.4rem] mt-[2rem] h-px bg-[#9C9C9D]"
                    ></div>
                  );
                }

                if (content._type === "footerTitle") {
                  return (
                    <div key={content._key}>
                      <p className="leading-[3.1rem]">{content.title}</p>
                    </div>
                  );
                }

                if (content._type === "footerColumnLink") {
                  return (
                    <Link
                      target={content.openInNewTab ? "_blank" : ""}
                      key={content._key}
                      href={content.href ?? "#"}
                    >
                      <p className="leading-[3.1rem] text-[#9C9C9D]">
                        {content.name}
                      </p>
                    </Link>
                  );
                }

                return null;
              })}
            </div>
          );
        })}
      </div>
    </footer>
  );
}
